import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

#gets url
url = "https://www.paycom.com/resources/blog/minimum-wage-rate-by-state/"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

#finds table
table = soup.find("table", class_="table align-middle")

# <a> tag gives all the state names in the table
states = [a.text for a in table.find_all("a")]
# takes the table rows, excluding the first as it is the header and gives the 3rd td as it is the 3rd column
wages_2022 = [row.find_all('td')[2].text for row in table.find_all('tr')[1:]]
#zips both together
data = list(zip(states, wages_2022))

df = pd.DataFrame(data, columns=["State", "Minimum-Wage"])

#removes the dollar sign from the values and converst to float
def extract_average(s):
    values = re.findall(r'\$([\d.]+)', s)
    float_values = [float(value) for value in values]

    return round(sum(float_values) / len(float_values), 2)

#does this for the wage column in the df
df['Minimum-Wage'] = df['Minimum-Wage'].apply(extract_average)

#df to csv
df.to_csv('min-wages.csv')

