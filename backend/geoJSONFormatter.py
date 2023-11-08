import json
import shutil
import pandas as pd

def updateReforestationDataState(stateJsonFile):
    # file path variables
    new_file = "backend/geoJsonOutputs/stateData/stateReforestation.json"
    data_file = "backend/Reforestation/reforestation_class.csv"

    # copy the boundary file into a new json file
    shutil.copyfile(stateJsonFile, new_file)


    # Open the json copyfile and store the json in a python object
    with open(new_file, 'r') as file:
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

    # Dump the updated json object into a new file
    with open(new_file, "w") as file:
        json.dump(file_data, file)
    
    return


def updateKelpFarmData():
    # file path variables
    new_file = "backend/geoJsonOutputs/stateData/stateKelpFarm.geojson"
    data_file = "backend/Kelp/kelp_class.csv"

    # Store our data in a pandas DataFrame
    df = pd.read_csv(data_file)

    # build the features data as a python list
    features = []
    for index, row in df.iterrows():
        feature = {
            "type": "Feature",
            "properties": {
                "lat": row["latitude"],
                "long": row["longitude"],
                "depth": row["Depth"],
                "temperature": row["Temperature"],
                "ph": row["pH"],
                "loc": row["percentile_rank"],
                "class": row["Final_Class"],
                "isState": "yes"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [row["longitude"], row["latitude"]]
            }
        }
        features.append(feature)

    # format the final json object
    data = {"type": "FeatureCollection", "features": features}

    # write our json object to the file
    with open(new_file, "w") as file:
        json.dump(data, file)        

    return


def updateDACDataState(stateJsonFile):
    # file path variables
    new_file = "backend/geoJsonOutputs/stateData/stateDAC.json"
    data_file = "backend/DAC/dac_class.csv"

    # copy the boundary file into a new json file
    shutil.copyfile(stateJsonFile, new_file)


    # Open the json copyfile and store the json in a python object
    with open(new_file, 'r') as file:
        file_data = json.load(file)

    # Store our data in a pandas DataFrame
    df = pd.read_csv(data_file)

    # Average the data from each county, group by state
    state_average = df.groupby('State')[['Population', 'Temperature','Precipitation','Elevation','Electricity-Prices','percentile_rank','Final_Class']].mean()

    # Add our data into the json object
    for feature in file_data["features"]:
        state = feature["properties"]["NAME"]

        # Ensure we are at a state we have data for
        if state in state_average.index:
            feature["properties"]["population"] = state_average.loc[state, "Population"]
            feature["properties"]["temperature"] = state_average.loc[state, "Temperature"]
            feature["properties"]["precipitation"] = state_average.loc[state, "Precipitation"]
            feature["properties"]["elevation"] = state_average.loc[state, "Elevation"]
            feature["properties"]["electric"] = state_average.loc[state, "Electricity-Prices"]
            feature["properties"]["cost"] = state_average.loc[state, "percentile_rank"]
            feature["properties"]["class"] = state_average.loc[state, "Final_Class"]
            feature["properties"]["isState"] = "yes"
        else:
            feature["properties"]["class"] = 0  # No data available at this state
            feature["properties"]["isState"] = "yes"

    # Dump the updated json object into a new file
    with open(new_file, "w") as file:
        json.dump(file_data, file)
    
    return


def updateReforestationDataCounty(countyJsonFile):
    # file path variables
    new_file = "backend/geoJsonOutputs/countyData/countyReforestation.json"
    data_file = "backend/Reforestation/reforestation_class.csv"

    # copy the boundary file into a new json file
    shutil.copyfile(countyJsonFile, new_file)

    # open the json copyfile and store the json in a python object
    with open(new_file, 'r', encoding='ISO-8859-1') as file:
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
            feature["properties"]["land"] = float(match.iloc[0]["Land-Prices"])
            feature["properties"]["cost"] = float(match.iloc[0]["percentile_rank"])
            feature["properties"]["class"] = int(match.iloc[0]["Final_Class"])
            feature["properties"]["isState"] = "no"
        else:
            # no match
            feature["properties"]["class"] = 0  # lowest class because no data
            feature["properties"]["isState"] = "no"

    # Dump the updated json object into a new file
    with open(new_file, "w") as file:
        json.dump(file_data, file)
    
    return


def updateDACDataCounty(countyJsonFile):
    # file path variables
    new_file = "backend/geoJsonOutputs/countyData/countyDAC.json"
    data_file = "backend/DAC/dac_class.csv"

    # copy the boundary file into a new json file
    shutil.copyfile(countyJsonFile, new_file)

    # open the json copyfile and store the json in a python object
    with open(new_file, 'r', encoding='ISO-8859-1') as file:
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
            feature["properties"]["elevation"] = float(match.iloc[0]["Elevation"])
            feature["properties"]["electric"] = float(match.iloc[0]["Electricity-Prices"])
            feature["properties"]["cost"] = float(match.iloc[0]["percentile_rank"])
            feature["properties"]["class"] = int(match.iloc[0]["Final_Class"])
            feature["properties"]["isState"] = "no"
        else:
            # no match
            feature["properties"]["class"] = 0  # lowest class because no data
            feature["properties"]["isState"] = "no"

    # Dump the updated json object into a new file
    with open(new_file, "w") as file:
        json.dump(file_data, file)
    
    return


def main():
    # updateReforestationDataState("backend/states.json")
    # updateReforestationDataCounty("backend/counties.json")

    # updateDACDataCounty("backend/counties.json")
    # updateDACDataState("backend/states.json")

    updateKelpFarmData()

    print("Done")


if __name__ == "__main__":
    main()