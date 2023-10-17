import json
import shutil

def updateReforestationDataState(stateJsonFile, stateReforestationCsv):

    shutil.copyfile(stateJsonFile, "backend/geoJsonOutputs/stateData/stateReforestation.json")

    new_file = "backend/geoJsonOutputs/stateData/stateReforestation.json"

    # Write to new json file, NOT WORK
    with open(new_file, 'r+') as file:
        file_data = json.load(file)

        for feature in file_data["features"]:
            print(feature["properties"])
            feature["properties"] = {"testing": "testing"}

    file.close()

    print("\n\n\n")
    # This just is to print to see if changes were made
    with open(new_file, 'r') as file:
        file_data = json.load(file)

        for feature in file_data["features"]:
            print(feature["properties"])
    
    file.close()
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