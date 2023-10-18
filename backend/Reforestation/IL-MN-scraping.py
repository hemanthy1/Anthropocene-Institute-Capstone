import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

ref = pd.read_csv('reforestationDB.csv')
def scrape(state):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)

    for index, row in ref[ref['Abbreviation'] == state].iterrows():
        state = row['Abbreviation']
        county = row['County']
        url = f"https://www.acrevalue.com/map/{state}/{county}/"
        driver.get(url)
        time.sleep(5)

        try:
            element = driver.find_element(By.CSS_SELECTOR, 'na.ng-isolate-scope')
            element_text = element.text

            # Split the string and retrieve the value part
            value = element_text.split("/")[0].strip()

            # Convert the string value to a number (removing the dollar sign)
            cost = int(value.replace(',', '').replace('$', ''))

        except Exception as e:
            cost = None

        print(url, cost)
        ref.at[index, 'Land-Prices'] = cost

    driver.quit()

if __name__ == '__main__':
    scrape('MN')
    ref.to_csv('reforestationDB.csv', index=False)
