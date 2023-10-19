import json
import shutil
import pandas as pd

'''
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
            feature["properties"]["land"] = state_average.loc[state, "Land-Prices"]
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
    #
    #     for feature in file_data["features"]:
    #         if feature["properties"]["NAME"] not in state_average.index:
    #             print("--------------------- Non-Updated State Data: ---------------------")
    #             print(feature["properties"])
    #             print("--------------------- Non-Updated State Data ---------------------")
    #             print()
    #
    #
    return
'''


def updateAlgaeBloomDataState(stateJsonFile, stateAlgaeBloomCSV):


    return



def updateDACDataState(stateJsonFile, stateDACCsv):


    return





'''
def updateReforestationDataCounty(countyJsonFile, countyReforestationCsv):
    # file path variables
    new_file = "backend/geoJsonOutputs/countyData/countyReforestation.json"
    data_file = "backend/filter-reforest.csv"

    # copy the boundary file into a new json file
    shutil.copyfile(countyJsonFile, new_file)

    # open the json copyfile and store the json in a python object
    with open(new_file, 'r', encoding='ISO-8859-1') as file:
        file_data = json.load(file)

    # store our data in a pandas DataFrame
    df = pd.read_csv(data_file)

    # specify state FIPS codes for the states we have data for
    codes = {
        "Georgia": 13,
        "Illinois": 17,
        "Indiana": 18,
        "Michigan": 26,
        "Minnesota": 27,
        "Nebraska": 31,
        "North Carolina": 37,
        "Ohio": 39,
        "Oklahoma": 40,
        "South Carolina": 45,
        "Wisconsin": 55
    }
    
    
    # Add our data into the json object
    for feature in file_data["features"]:
        county_name = feature["properties"].get("NAME")  # county name
        state_code = feature["properties"].get("STATE")  # state FIPS code
        
        # see if this county is in our data
        match = df.loc[(df['County'] == county_name) & (df['State'].map(codes) == int(state_code))]
        
        if not match.empty:
            # found a match
            feature["properties"]["population"] = int(match.iloc[0]["Population"])
            feature["properties"]["temperature"] = match.iloc[0]["Temperature"]
            feature["properties"]["precipitation"] = match.iloc[0]["Precipitation"]
            feature["properties"]["palmer"] = match.iloc[0]["Palmer-Z"]
            feature["properties"]["land"] = match.iloc[0]["Land-Prices"]
            feature["properties"]["cost"] = match.iloc[0]["percentile_rank"]
            feature["properties"]["class"] = int(match.iloc[0]["final-class"])
            feature["properties"]["isState"] = "no"
        else:
            # no match
            feature["properties"]["class"] = 1  # lowest class because no data
            feature["properties"]["isState"] = "no"

    # Dump the updated json object into a new file
    with open(new_file, "w") as file:
        json.dump(file_data, file)

    # Quick test
    # 
    #
    # with open(new_file, "r") as file:
    #     file_data = json.load(file)
    #     updated = 0
    #     non = 0
    #     for feature in file_data["features"]:
    #         if "cost" in feature['properties']:
    #             print("------------------ Updated County Data: ------------------")
    #             print(feature["properties"])
    #             print("------------------ Updated County Data  ------------------")
    #             print()
    #             updated += 1
    #         else:
    #             non += 1
    # print(f"{updated} counties were updated out of {len(df)} counties in the data file")
    # print(f"{non} counties were not updated. There are 3,244 counties in the USA")
    # print(f"{updated} + {non} = {updated+non}")
    #
    #

    return
'''



def updateAlgaeBloomDataCounty(countyJsonFile, countyAlgaeBloomCsv):


    return



def updateDACDataCounty(countyJsonFile, countyDACCsv):


    return

def main():
    # updateReforestationDataState("backend/states.json", "dataOutputCSVs/stateData/stateReforestationCsv.csv")
    # updateAlgaeBloomDataState("backend/states.json", "dataOutputCSVs/stateData/stateAlgaeBloomCsv.csv")
    # updateDACDataState("backend/states.json", "dataOutputCSVs/stateData/stateDACCsv.csv")
    # updateReforestationDataCounty("backend/counties.json", "dataOutputCSVs/countyData/countyReforestationCsv.csv")
    # updateAlgaeBloomDataCounty("backend/counties.json", "dataOutputCSVs/countyData/countyAlgaeBloomCsv.csv")
    # updateDACDataCounty("backend/counties.json", "dataOutputCSVs/countyData/countyDACCsv.csv")
    pass

if __name__ == "__main__":
    main()