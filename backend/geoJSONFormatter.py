import json
import shutil
import pandas as pd

def updateReforestationDataState(stateJsonFile, stateReforestationCsv):

    # file path variables
    new_file = "backend/geoJsonOutputs/stateData/stateReforestation.json"
    data_file = "backend/filter-reforest.csv"

    # copy the boundary file into a new json file
    shutil.copyfile(stateJsonFile, new_file)


    # Open the json copyfile and store the json in a python object
    with open(new_file, 'r') as file:
        file_data = json.load(file)

    # Store our data in a pandas DataFrame
    df = pd.read_csv(data_file)

    # Average the data from each county, group by state
    state_average = df.groupby('State').mean()

    # Add our data into the json object
    for feature in file_data["features"]:
        state = feature["properties"]["NAME"]

        # Ensure we are at a state we have data for
        if state in state_average.index:
            feature["properties"]["population"] = state_average.loc[state, "Population"]
            feature["properties"]["temperature"] = state_average.loc[state, "Temperature"]
            feature["properties"]["precipitation"] = state_average.loc[state, "Precipitation"]
            feature["properties"]["palmer"] = state_average.loc[state, "Palmer-Z"]
            feature["properties"]["cost"] = state_average.loc[state, "percentile_rank"]
            feature["properties"]["class"] = state_average.loc[state, "final-class"]
            feature["properties"]["isState"] = "yes"
        else:
            feature["properties"]["class"] = 1  # No data available at this state
            feature["properties"]["isState"] = "yes"

    # Dump the updated json object into a new file
    with open(new_file, "w") as file:
        json.dump(file_data, file)


    # Quick test
    #
    #
    # with open(new_file, "r") as file:
    #     file_data = json.load(file)
    #     for feature in file_data["features"]:
    #         if feature["properties"]["NAME"] in state_average.index:
    #             print("--------------------- Updated State Data: ---------------------")
    #             print(feature["properties"])
    #             print("--------------------- Updated State Data ---------------------")
    #             print()

    #     for feature in file_data["features"]:
    #         if feature["properties"]["NAME"] not in state_average.index:
    #             print("--------------------- Non-Updated State Data: ---------------------")
    #             print(feature["properties"])
    #             print("--------------------- Non-Updated State Data ---------------------")
    #             print()
    #
    #
    return



def updateAlgaeBloomDataState(stateJsonFile, stateAlgaeBloomCSV):


    return



def updateDACDataState(stateJsonFile, stateDACCsv):


    return






def updateReforestationDataCounty(countyJsonFile, countyReforestationCsv):


    return



def updateAlgaeBloomDataCounty(countyJsonFile, countyAlgaeBloomCsv):


    return



def updateDACDataCounty(countyJsonFile, countyDACCsv):


    return



updateReforestationDataState("backend/states.json", "dataOutputCSVs/stateData/stateReforestationCsv.csv")
# updateAlgaeBloomDataState("states.json", "dataOutputCSVs/stateData/stateAlgaeBloomCsv.csv")
# updateDACDataState("states.json", "dataOutputCSVs/stateData/stateDACCsv.csv")
# updateReforestationDataCounty("counties.json", "dataOutputCSVs/countyData/countyReforestationCsv.csv")
# updateAlgaeBloomDataCounty("counties.json", "dataOutputCSVs/countyData/countyAlgaeBloomCsv.csv")
# updateDACDataCounty("counties.json", "dataOutputCSVs/countyData/countyDACCsv.csv")