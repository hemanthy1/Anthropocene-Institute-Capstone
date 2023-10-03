
#TEST if stuff was appended to forestation db and table.
import pandas as pd
import sqlalchemy
from DatabaseConnector import connect_with_connector

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:forestationdb"
DB_USER="teamanthro"
DB_PASS="Anthinst498"
DB_NAME="mi-values"

engine = connect_with_connector(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)

def first_five():
    with engine.connect() as connection:
        query = "SELECT * FROM mi LIMIT 5"
        results_df = pd.read_sql(query, connection)
        print(results_df)

def count_rows():
    with engine.connect() as connection:
        query = sqlalchemy.text("SELECT COUNT(*) FROM mi")
        result = connection.execute(query).scalar()
        print(result)

if __name__ == "__main__":
    first_five()
    count_rows()