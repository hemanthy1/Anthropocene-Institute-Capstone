import sqlalchemy
from DatabaseConnector import connect_with_connector
import pandas as pd

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:forestationdb"
DB_USER="teamanthro"
DB_PASS="Anthinst498"
DB_NAME="mi-values"

def create_table(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME):
    engine = connect_with_connector(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)
    meta = sqlalchemy.MetaData()

    #initial table
    MI = sqlalchemy.Table('mi', meta,
        sqlalchemy.Column('state', sqlalchemy.String),
        sqlalchemy.Column('county', sqlalchemy.String),
        sqlalchemy.Column('population', sqlalchemy.Float),
        sqlalchemy.Column('temperature', sqlalchemy.Float),
        sqlalchemy.Column('precipitation', sqlalchemy.Float),
        sqlalchemy.Column('land_prices', sqlalchemy.Float)
    )

    #only creates table if it doesn't exist. see create vs create_all
    meta.create_all(engine)
    return engine

#appends rows from csv to the table, csv is an input in case want to run multiple files.
def csv_to_table(engine,csv):
    df = pd.read_csv(csv)
    with engine.connect() as connection:
        # to test it multiple times, it deletes all data, REMOVE when optimizing
        connection.execute(sqlalchemy.text("DELETE FROM mi;"))
        df.to_sql('mi', connection, if_exists='append', index=False)

if __name__ == "__main__":
    engine = create_table(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)
    csv_to_table(engine, 'michigan_vals.csv')