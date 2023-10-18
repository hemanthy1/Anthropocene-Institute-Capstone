import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import csv

ref= pd.read_csv('Reforestation/reforestationDB.csv')
ref['Land-Prices'] = None

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless") #No GUI (Chrome doesnt pop up)
driver = webdriver.Chrome(options=chrome_options) # Initialize the Chrome webdriver


for index, row in ref.iterrows():
    state = row['Abbreviation']
    county = row['County']
    url = f"https://www.acrevalue.com/map/{state}/{county}/"
    driver.get(url)
    print(url)
    time.sleep(5) # time for page to load

    content = driver.page_source #gets page source
    soup = BeautifulSoup(content, features="html.parser") #soup parses html code

    try:
        element = driver.find_element(By.CSS_SELECTOR, 'body > ui-view > div.map-page.ng-scope.sidebar-shown > div > sidebar > div.sidebar-scroll.redesigned > div.section.ng-scope > section.sidebar-about > div.body-dark-normal.ng-binding.ng-scope > span:nth-child(4)')
        element_text = element.text

        words = element_text.split()
        raw_price = words[10]
        numeric_part = ''.join(filter(str.isdigit, raw_price))

        cost = int(numeric_part)

    except Exception as e:
        cost = None

    ref.at[index, 'Land-Prices'] = cost

driver.quit()


ref.to_csv('reforestationDB.csv', index=False)
