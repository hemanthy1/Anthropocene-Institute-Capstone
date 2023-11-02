import requests
from bs4 import BeautifulSoup
import csv

URL = "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a"  # Replace with your URL

response = requests.get(URL)
soup = BeautifulSoup(response.content, 'html.parser')

states = soup.find_all('td', class_='l')

results = []
for state in states:
    data = {}
    state_name = state.text.strip()

    if state_name == "US Total":
        break

    data['state'] = state_name

    value_td = state.find_next('td')
    if value_td: value_td = value_td.find_next('td')
    if value_td: value_td = value_td.find_next('td')
    if value_td: value_td = value_td.find_next('td')

    if value_td:
        data['value'] = value_td.text.strip()
        results.append(data)

with open('electricity.csv', 'w', newline='') as csvfile:
    fieldnames = ['state', 'value']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for item in results:
        writer.writerow(item)

print("Data saved to scraped_data.csv")