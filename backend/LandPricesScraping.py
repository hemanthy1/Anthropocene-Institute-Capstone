import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import csv

michigan_counties = [
        'Alcona', 'Alger', 'Allegan', 'Alpena', 'Antrim', 'Arenac', 'Baraga', 'Barry',
        'Bay', 'Benzie', 'Berrien', 'Branch', 'Calhoun', 'Cass', 'Charlevoix', 'Cheboygan',
        'Chippewa', 'Clare', 'Clinton', 'Crawford', 'Delta', 'Dickinson', 'Eaton', 'Emmet',
        'Genesee', 'Gladwin', 'Gogebic', 'Grand-Traverse', 'Gratiot', 'Hillsdale', 'Houghton',
        'Huron', 'Ingham', 'Ionia', 'Iosco', 'Iron', 'Isabella', 'Jackson', 'Kalamazoo',
        'Kalkaska', 'Kent', 'Keweenaw', 'Lake', 'Lapeer', 'Leelanau', 'Lenawee', 'Livingston',
        'Luce', 'Mackinac', 'Macomb', 'Manistee', 'Marquette', 'Mason', 'Mecosta', 'Menominee',
        'Midland', 'Missaukee', 'Monroe', 'Montcalm', 'Montmorency', 'Muskegon', 'Newaygo',
        'Oakland', 'Oceana', 'Ogemaw', 'Ontonagon', 'Osceola', 'Oscoda', 'Otsego', 'Ottawa',
        'Presque-Isle', 'Roscommon', 'Saginaw', 'St-Clair', 'St-Joseph', 'Sanilac', 'Schoolcraft',
        'Shiawassee', 'Tuscola', 'Van-Buren', 'Washtenaw', 'Wayne', 'Wexford'
    ]

column_names = ['Cost (dollars per acre)']
df = pd.DataFrame(columns=column_names)
csv_file_path = "land_prices_michigan.csv"
df.to_csv(csv_file_path, index=False)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless") #No GUI (Chrome doesnt pop up)
driver = webdriver.Chrome(options=chrome_options) # Initialize the Chrome webdriver


for county in michigan_counties:
    price = []
    url = f"https://www.acrevalue.com/map/MI/{county}/"
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

    with open('land_prices_michigan.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([cost])

driver.quit()

