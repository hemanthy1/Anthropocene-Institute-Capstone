import requests
from bs4 import BeautifulSoup
import csv

URL = "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a"

#gets the url
response = requests.get(URL)
soup = BeautifulSoup(response.content, 'html.parser')

#the data is in form of a table so it gets them
states = soup.find_all('td', class_='l')

#iterats through all rows until it reaches the total. 
results = []
for state in states:
    data = {}
    state_name = state.text.strip()

    if state_name == "US Total":
        break

    data['state'] = state_name
    
    #the value is 4 td's away as in it is the 4th column. 
    value_td = state.find_next('td')
    if value_td: value_td = value_td.find_next('td')
    if value_td: value_td = value_td.find_next('td')
    if value_td: value_td = value_td.find_next('td')

    if value_td:
        data['value'] = value_td.text.strip()
        results.append(data)
        
#writes it to csv 
with open('electricity.csv', 'w', newline='') as csvfile:
    fieldnames = ['state', 'value']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for item in results:
        writer.writerow(item)
