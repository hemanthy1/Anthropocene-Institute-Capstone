import json
import shutil

def updateReforestationDataState(stateJsonFile, stateReforestationCsv):

    new_file = "backend/geoJsonOutputs/stateData/stateReforestation.json"

    shutil.copyfile(stateJsonFile, new_file)


    # Write to new json file, NOT WORK
    with open(new_file, 'r+') as file:
        file_data = json.load(file)

        for feature in file_data["features"]:
            print(feature["properties"])
            feature["properties"]["TESTING"] = "testestest"

    with open(new_file, 'w') as file:
        json.dump(file_data, file)

    print("\n\n\n")

    with open(new_file, "r") as file:
        file_data = json.load(file)

        for feature in file_data["features"]:
            print(feature["properties"])

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