
#TEST if stuff was appended to forestation db and table.
import pandas as pd
import sqlalchemy
from DatabaseConnector import connect_with_connector

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:carbon-mapp"
DB_USER="teamanthro"
DB_PASS="Anthinst498"
DB_NAME="forestationdb"

engine = connect_with_connector(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)

def first_five():
    with engine.connect() as connection:
        query = "SELECT * FROM reforest_select LIMIT 5"
        results_df = pd.read_sql(query, connection)
        print(results_df)

def count_rows():
    with engine.connect() as connection:
        query = sqlalchemy.text("SELECT COUNT(*) FROM reforest_select")
        result = connection.execute(query).scalar()
        print(result)

if __name__ == "__main__":
    first_five()
    count_rows()