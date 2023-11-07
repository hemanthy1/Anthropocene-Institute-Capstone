import os
import csv

# useful =
# 15 latittue
# 16 longitude
# 17 ocean depth
# 20 depth of the sample
# 21 temperature on the internation temperature scale of 1990 from sensors on a ctd rosette.
# 29 CTDOXY dissolved oxygen from sensors on CTD rosette
# 30 apparent oxygen utilization
# 42 Temperature of pH measurement
# 45 ph calculated 

tmpFile = "kelpfarmsdata.csv"
with open("CODAP_NA_v2021.csv", "r") as file, open(tmpFile, "w", newline='') as outFile:
    reader = csv.reader(file, delimiter=",")
    next(reader)
    next(reader)
    writer = csv.writer(outFile, delimiter=",")
    new_header = ['latitude', 'longitude', 'ocean depth (m)', 'depth of sample (m)', 'temperature of ocean (C)', 'dissolved oxygen (µmol kg-1)', 'apparent oxygen utilization (µmol kg-1)', 'temperature of pH measurement (C)', 'pH']
    writer.writerow(new_header)
    
    for row in reader:
        vals = (row[15], row[16], row[17], row[20], row[21], row[29], row[30], row[42], row[45])
        writer.writerow(vals)