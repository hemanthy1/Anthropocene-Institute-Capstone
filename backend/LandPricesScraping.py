import os
import time
import sqlalchemy
import pg8000
from selenium import webdriver
from selenium.webdriver.common.by import By
from google.cloud.sql.connector import Connector, IPTypes
from google.cloud import secretmanager
import json

# TODO
# Note: Saving credentials in environment variables is convenient, but not
# secure - consider a more secure solution such as
# Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
# keep secrets safe.
INSTANCE_CONNECTION_NAME = "carbon-mapp:us-east5:test-database"

secret_name = "projects/402696929714/secrets/database-credentials"
client = secretmanager.SecretManagerServiceClient()
response = client.access_secret_version(secret_name)
secret_payload = response.payload.data.decode('UTF-8')
credentials = json.loads(secret_payload)

DB_USER = credentials.get("DB_USER")
DB_PASS = credentials.get("DB_PASS")
DB_NAME = "test-1"


def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of Postgres.
    Uses the Cloud SQL Python Connector package.
    """
    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC
    connector = Connector()

    def getconn() -> pg8000.dbapi.Connection:
        conn = connector.connect(
            INSTANCE_CONNECTION_NAME,
            "pg8000",
            user=DB_USER,
            password=DB_PASS,
            db=DB_NAME,
            ip_type=ip_type,
        )
        return conn

    pool = sqlalchemy.create_engine(
        "postgresql+pg8000://",
        creator=getconn,
    )
    return pool


def scrape_land_price(state: str, county: str):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    url = f"https://www.acrevalue.com/map/{state}/{county}/"
    driver.get(url)
    time.sleep(5)
    try:
        element = driver.find_element(By.CSS_SELECTOR, 'body > ui-view > div.map-page.ng-scope.sidebar-shown > div > sidebar > div.sidebar-scroll.redesigned > div.section.ng-scope > section.sidebar-about > div.body-dark-normal.ng-binding.ng-scope > span:nth-child(4)')
        element_text = element.text
        words = element_text.split()
        raw_price = words[10]
        numeric_part = ''.join(filter(str.isdigit, raw_price))
        cost = int(numeric_part)
    except Exception as e:
        cost = 'NA'
    driver.quit()
    return cost


if __name__ == '__main__':
    state = 'MI'
    country = 'USA'

    michigan_counties = [
        'Alcona', 'Alger', 'Allegan', 'Alpena', 'Antrim', 'Arenac', 'Baraga', 'Barry',
        'Bay', 'Benzie', 'Berrien', 'Branch', 'Calhoun', 'Cass', 'Charlevoix', 'Cheboygan',
        'Chippewa', 'Clare', 'Clinton', 'Crawford', 'Delta', 'Dickinson', 'Eaton', 'Emmet',
        'Genesee', 'Gladwin', 'Gogebic', 'Grand Traverse', 'Gratiot', 'Hillsdale', 'Houghton',
        'Huron', 'Ingham', 'Ionia', 'Iosco', 'Iron', 'Isabella', 'Jackson', 'Kalamazoo',
        'Kalkaska', 'Kent', 'Keweenaw', 'Lake', 'Lapeer', 'Leelanau', 'Lenawee', 'Livingston',
        'Luce', 'Mackinac', 'Macomb', 'Manistee', 'Marquette', 'Mason', 'Mecosta', 'Menominee',
        'Midland', 'Missaukee', 'Monroe', 'Montcalm', 'Montmorency', 'Muskegon', 'Newaygo',
        'Oakland', 'Oceana', 'Ogemaw', 'Ontonagon', 'Osceola', 'Oscoda', 'Otsego', 'Ottawa',
        'Presque Isle', 'Roscommon', 'Saginaw', 'St. Clair', 'St. Joseph', 'Sanilac', 'Schoolcraft',
        'Shiawassee', 'Tuscola', 'Van Buren', 'Washtenaw', 'Wayne', 'Wexford'
    ]

    engine = connect_with_connector()
    meta = sqlalchemy.MetaData()
    Reforestation = sqlalchemy.Table('reforestation_table', meta,
                                     sqlalchemy.Column('county', sqlalchemy.String),
                                     sqlalchemy.Column('state', sqlalchemy.String),
                                     sqlalchemy.Column('country', sqlalchemy.String),
                                     sqlalchemy.Column('land_price', sqlalchemy.Float),
                                     sqlalchemy.Column('latitude', sqlalchemy.Float),
                                     sqlalchemy.Column('longitude', sqlalchemy.Float),
                                     )

    with engine.connect() as connection:
        for county in michigan_counties:
            cost = scrape_land_price(state, county)
            new_row_values = {"county": county,
                              "state": state,
                              "country": country,
                              "land_price": cost,
                              "latitude": 0.0,
                              "longitude": 0.0}  # TODO replace longitute/latitude
            connection.execute(Reforestation.insert(), new_row_values)

