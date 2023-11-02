from flask import Flask, render_template, jsonify
from DatabaseConnector import connect_with_connector
import sqlalchemy
import os
from google.oauth2.credentials import Credentials
import json
import shutil
import pandas as pd

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:carbon-mapp" 
DB_USER="Uploader1"
DB_PASS="Ubf:X$LI+{kRRiHz"
DB_NAME="ForestationData"

def GeoJSONStateList():
    stateJsonFile = "backend/states.json"
    listofJSONS=[]

    # file path variables
    data_file = "backend/Reforestation/reforestation.csv"


    # Open the json copyfile and store the json in a python object
    with open(stateJsonFile, 'r') as file:
        file_data = json.load(file)

    # Store our data in a pandas DataFrame
    df = pd.read_csv(data_file)

    # Average the data from each county, group by state
    state_average = df.groupby('State')[['Population', 'Temperature','Precipitation','Palmer-Z','Land-Prices','percentile_rank','Final_Class']].mean()
    # Add our data into the json object
    for feature in file_data["features"]:
        state = feature["properties"]["NAME"]

        # Ensure we are at a state we have data for
        if state in state_average.index:
            feature["properties"]["population"] = state_average.loc[state, "Population"]
            feature["properties"]["temperature"] = state_average.loc[state, "Temperature"]
            feature["properties"]["precipitation"] = state_average.loc[state, "Precipitation"]
            feature["properties"]["palmer"] = state_average.loc[state, "Palmer-Z"]
            feature["properties"]["land"] = state_average.loc[state, "Land-Prices"]
            feature["properties"]["cost"] = state_average.loc[state, "percentile_rank"]
            feature["properties"]["class"] = state_average.loc[state, "Final_Class"]
            feature["properties"]["isState"] = "yes"
        else:
            feature["properties"]["class"] = 0  # No data available at this state
            feature["properties"]["isState"] = "yes"
        listofJSONS.append(feature)




    return listofJSONS


def GeoJSONCountyList():
    stateJsonFile = "backend/counties.json"
    listofJSONS=[]

    # file path variables
    data_file = "backend/Reforestation/reforestation.csv"


    # Open the json copyfile and store the json in a python object
    with open(stateJsonFile, 'r') as file:
        file_data = json.load(file)
 

    # store our data in a pandas DataFrame
    df = pd.read_csv(data_file)

    # specify state FIPS codes for the states we have data for
    codes = {
        'Alabama': 1,
        'Alaska': 2,
        'Arizona': 4,
        'Arkansas': 5,
        'California': 6,
        'Colorado': 8,
        'Connecticut': 9,
        'Delaware': 10,
        'District of Columbia': 11,
        'Florida': 12,
        'Georgia': 13,
        'Hawaii': 15,
        'Idaho': 16,
        'Illinois': 17,
        'Indiana': 18,
        'Iowa': 19,
        'Kansas': 20,
        'Kentucky': 21,
        'Louisiana': 22,
        'Maine': 23,
        'Maryland': 24,
        'Massachusetts': 25,
        'Michigan': 26,
        'Minnesota': 27,
        'Mississippi': 28,
        'Missouri': 29,
        'Montana': 30,
        'Nebraska': 31,
        'Nevada': 32,
        'New Hampshire': 33,
        'New Jersey': 34,
        'New Mexico': 35,
        'New York': 36,
        'North Carolina': 37,
        'North Dakota': 38,
        'Ohio': 39,
        'Oklahoma': 40,
        'Oregon': 41,
        'Pennsylvania': 42,
        'Rhode Island': 44,
        'South Carolina': 45,
        'South Dakota': 46,
        'Tennessee': 47,
        'Texas': 48,
        'Utah': 49,
        'Vermont': 50,
        'Virginia': 51,
        'Washington': 53,
        'West Virginia': 54,
        'Wisconsin': 55,
        'Wyoming': 56,
        'Puerto Rico': 72,
    }
    listofJSONS=[]
    # Add our data into the json object
    for feature in file_data["features"]:
        county_name = feature["properties"]["NAME"]  # county name
        state_code = feature["properties"]["STATE"]  # state FIPS code
        
        # see if this county is in our data
        match = df.loc[(df['County'] == county_name) & (df['State'].map(codes) == int(state_code))]
        
        if not match.empty:
            # found a match
            feature["properties"]["population"] = int(match.iloc[0]["Population"])
            feature["properties"]["temperature"] = float(match.iloc[0]["Temperature"])
            feature["properties"]["precipitation"] = float(match.iloc[0]["Precipitation"])
            feature["properties"]["palmer"] = float(match.iloc[0]["Palmer-Z"])
            feature["properties"]["land"] = int(match.iloc[0]["Land-Prices"])
            feature["properties"]["cost"] = float(match.iloc[0]["percentile_rank"])
            feature["properties"]["class"] = int(match.iloc[0]["Final_Class"])
            feature["properties"]["isState"] = "no"
        else:
            # no match
            feature["properties"]["class"] = 0  # lowest class because no data
            feature["properties"]["isState"] = "no"
        listofJSONS.append(feature)
    # Dump the updated json object into a new file
    return listofJSONS





def UpdateStatesDB():
    engine = connect_with_connector(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)
    meta = sqlalchemy.MetaData()

    # Create a table for the JSON data
    GeoData = sqlalchemy.Table('states_table', meta,
        sqlalchemy.Column('type', sqlalchemy.String),
        sqlalchemy.Column('properties', sqlalchemy.JSON),
        sqlalchemy.Column('geometry', sqlalchemy.JSON)
    )

    # TO CREATE TABLE
    GeoData.create(engine, checkfirst=True)  # checkfirst ensures the table is only created if it doesn't exist

    JSONList=GeoJSONStateList()


    with engine.connect() as connection:
        # TO INSERT INTO TABLE
        # for i in range(len(JSONList)):
        #     data_to_insert = JSONList[i]
        #     connection.execute(GeoData.insert(), data_to_insert)
        #     connection.commit()
        
        # To see data in table
        # result = connection.execute(sqlalchemy.text("SELECT * FROM states_table"))
        # for row in result:
        #     print(len(row[1]))  
        print()


def UpdateCountiesDB():
    engine = connect_with_connector(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)
    meta = sqlalchemy.MetaData()

    # Create a table for the JSON data
    GeoData = sqlalchemy.Table('counties_table', meta,
        sqlalchemy.Column('type', sqlalchemy.String),
        sqlalchemy.Column('properties', sqlalchemy.JSON),
        sqlalchemy.Column('geometry', sqlalchemy.JSON)
    )

    # TO CREATE TABLE
    GeoData.create(engine, checkfirst=True)  # checkfirst ensures the table is only created if it doesn't exist

    JSONList=GeoJSONStateList()


    with engine.connect() as connection:
        # TO INSERT INTO TABLE
        # for i in range(len(JSONList)):
        #     data_to_insert = JSONList[i]
        #     connection.execute(GeoData.insert(), data_to_insert)
        #     connection.commit()
        
        # To see data in table
        result = connection.execute(sqlalchemy.text("SELECT * FROM counties_table"))
        count=0
        for row in result:
            print(row)
        print(count)



if __name__ == "__main__":
    UpdateStatesDB()
    UpdateCountiesDB()
