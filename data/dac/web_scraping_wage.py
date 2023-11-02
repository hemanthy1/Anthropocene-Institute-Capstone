import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

url = "https://www.paycom.com/resources/blog/minimum-wage-rate-by-state/"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

table = soup.find("table", class_="table align-middle")
states = [a.text for a in table.find_all("a")]
wages_2022 = [row.find_all('td')[2].text for row in table.find_all('tr')[1:]]
data = list(zip(states, wages_2022))

df = pd.DataFrame(data, columns=["State", "Minimum-Wage"])


def extract_average(s):
    values = re.findall(r'\$([\d.]+)', s)
    float_values = [float(value) for value in values]

    return round(sum(float_values) / len(float_values), 2)

df['Minimum-Wage'] = df['Minimum-Wage'].apply(extract_average)

df.to_csv('min-wages.csv')

