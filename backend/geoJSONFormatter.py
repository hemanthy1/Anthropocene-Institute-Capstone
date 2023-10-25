import json
import shutil
import pandas as pd

def updateReforestationDataState(stateJsonFile, stateReforestationCsv):

    # file path variables
    new_file = "backend/geoJsonOutputs/stateData/stateReforestation.json"
    data_file = "backend/Reforestation/reforestation.csv"

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


    # Quick test
    # with open(new_file, "r") as file:
    #     file_data = json.load(file)
    #     updated, non = 0, 0
    #     print("Updated: --------------------------")
    #     for feature in file_data["features"]:
    #         if feature["properties"]["NAME"] in state_average.index:
    #             print("--------------------- Updated State Data: ---------------------")
    #             print(feature["properties"])
    #             print("--------------------- Updated State Data ---------------------")
    #             print()
    #             updated += 1
    #     for feature in file_data["features"]:
    #         if feature["properties"]["NAME"] not in state_average.index:
    #             print("--------------------- Non-Updated State Data: ---------------------")
    #             print(feature["properties"])
    #             print("--------------------- Non-Updated State Data ---------------------")
    #             print()
    #             non += 1
    #     print(f"{updated} states were updated. {non} states weren't. {updated} + {non} = {updated + non}")
    #     print("Alaska, D.C., and Puerto Rico...")
    
    return


def updateAlgaeBloomDataState(stateJsonFile, stateAlgaeBloomCSV):


    return


def updateDACDataState(stateJsonFile, stateDACCsv):


    return


def updateReforestationDataCounty(countyJsonFile, countyReforestationCsv):
    # file path variables
    new_file = "backend/geoJsonOutputs/countyData/countyReforestation.json"
    data_file = "backend/Reforestation/reforestation.csv"

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
            feature["properties"]["land"] = int(match.iloc[0]["Land-Prices"])
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

    # Quick test
    # with open(new_file, "r") as file:
    #     file_data = json.load(file)
    #     updated = 0
    #     non = 0
    #     state_set = set()
    #     non_list = list()
    #     for feature in file_data["features"]:
    #         if "cost" in feature['properties']:
    #             updated += 1
    #             state_set.add(feature["properties"]["STATE"])
    #         else:
    #             if feature["properties"]["STATE"] != "72":
    #                 non_list.append((feature["properties"]["STATE"], feature["properties"]["NAME"]))
    #                 non += 1

    # print(f"{updated} counties were updated out of {len(df)} counties in the data file")
    # print(f"{non} counties were not updated. There are 3,144 counties in the USA (50 states + D.C.)")
    # print(f"{updated} + 30 (Alaska) + 1 (Shannon, SD) + 1 (D.C.) = {updated + 30 + 1 + 1} out of 3144 US counties.")
    # print()
    # print("States we have county data for: ", *sorted(state_set))
    # print("** Note: The above list should be from 01-56, but missing: \n02 (Alaska, we don't have data), \
    #       \n03 (Arizona's old code), \n07 (The old Canal Zone), \n11 (D.C.), \
    #       \n14 (No state has ever received this code), \n43 (Originally reserved for Puerto Rico), \
    #       \nand 52 (Again, no state has ever received 52).")
    

    
    # print()
    # print("Counties we don't have data for: ")
    # print(*non_list)

    # print()
    # duplicates = df[df.duplicated(subset=["County", "State"], keep=False)]
    # print("Duplicates in our data file:", len(duplicates))
    # print(f"{len(df)} rows of data. {len(df)} - 3144 - {len(duplicates)} = {len(df) - len(duplicates)}")
    # print(f"Not sure where the extra {len(df) - len(duplicates) - 3144} rows are coming from.")
    
    return


def updateAlgaeBloomDataCounty(countyJsonFile, countyAlgaeBloomCsv):


    return


def updateDACDataCounty(countyJsonFile, countyDACCsv):


    return


def main():
    updateReforestationDataState("backend/states.json", "dataOutputCSVs/stateData/stateReforestationCsv.csv")
    # updateAlgaeBloomDataState("backend/states.json", "dataOutputCSVs/stateData/stateAlgaeBloomCsv.csv")
    # updateDACDataState("backend/states.json", "dataOutputCSVs/stateData/stateDACCsv.csv")
    updateReforestationDataCounty("backend/counties.json", "dataOutputCSVs/countyData/countyReforestationCsv.csv")
    # updateAlgaeBloomDataCounty("backend/counties.json", "dataOutputCSVs/countyData/countyAlgaeBloomCsv.csv")
    # updateDACDataCounty("backend/counties.json", "dataOutputCSVs/countyData/countyDACCsv.csv")
    pass


if __name__ == "__main__":
    main()