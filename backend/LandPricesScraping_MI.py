import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

refAcre = pd.read_csv('backend/Reforestation/reforestationDB.csv')
refAcre['Land-Prices'] = None

refCamo = pd.read_csv('backend/Reforestation/reforestation.csv')
refCamo['Land-Prices'] = None

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless") #No GUI (Chrome doesnt pop up)
driver = webdriver.Chrome(options=chrome_options) # Initialize the Chrome webdriver


for index, row in refAcre.iterrows():
    state = row['Abbreviation']
    county = row['County']
    if state in ["MI", "MN", "OH", "IL", "IN", "OK", "NE", "WI", "GA", "SC", "NC"]:
        url = f"https://www.acrevalue.com/map/{state}/{county}/"
        driver.get(url)
        print(url)
        time.sleep(1) # time for page to load

        content = driver.page_source #gets page source
        soup = BeautifulSoup(content, features="html.parser") #soup parses html code

        try:
            element = driver.find_element(By.CSS_SELECTOR, 'body > ui-view > div.map-page.ng-scope.sidebar-shown > div > sidebar > div.sidebar-scroll.redesigned > div.section.ng-scope > section.sidebar-header > div.header-list > div.row.bold.ng-scope > div.body-light > na')
            element_text = element.text[1:-4].replace(",", "")

            cost = int(element_text)

        except Exception as e:
            cost = None

        print(cost)
        refCamo.at[index, 'Land-Prices'] = cost

# Add data for Iowa, North Dakota, South Dakota from CamoAg
for index, row in refCamo.iterrows():
    state = row['State']
    county = row['County'].replace(" ", "-")
    
    # Process land prices
    if state == "Iowa" or state == "North Dakota" or state == "South Dakota":
        url = f"https://app.camo.ag/land-value/{state}/{county}-county"
        print(url)
        driver.get(url)
        time.sleep(1)
        content = driver.page_source  # get page source
        soup = BeautifulSoup(content, features="html.parser")  # parse html code

        try: 
            element = driver.find_element(By.CSS_SELECTOR, '#root > div.sc-gsnTZi.EhrGE > div:nth-child(3) > div.sc-gsnTZi.cuAAQr > div.sc-jSMfEi.ubQVv > div > div.sc-gsnTZi.hvbiOF > div.sc-bczRLJ.eqrgLF > div:nth-child(3) > div > span')
            element_text = element.text[1:].replace(",", "")
            cost = int(element_text)
        except:
            cost = None

        print(cost)
        refCamo.at[index, 'Land-Prices'] = cost

driver.quit()
refCamo.to_csv('reforestation.csv', index=False)
