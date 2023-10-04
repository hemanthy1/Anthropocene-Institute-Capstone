#Testing carbon-mapp forestationdb database
import sqlalchemy
from DatabaseConnector import connect_with_connector
import pandas as pd

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:carbon-mapp"
DB_USER="teamanthro"
DB_PASS="Anthinst498"
DB_NAME="forestationdb"

if __name__ == '__main__':
    engine = connect_with_connector(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)
    meta = sqlalchemy.MetaData()
    test_table = sqlalchemy.Table('test_table', meta,
                              sqlalchemy.Column('id', sqlalchemy.Integer),
                              sqlalchemy.Column('name', sqlalchemy.String),
                              sqlalchemy.Column('value', sqlalchemy.String),
                              )
    #TO CREATE TABLE
    #test_table.create(engine)

    with engine.connect() as connection:

        # TO INSERT INTO TABLE
        connection.execute(test_table.insert(), {"id": 1, "name": "Ishita", "value": "Test1"})
        # connection.execute(Reforestation.insert(), {"land_price": 101010.0, "latitude": 69.0, "longitude": 34.0})
        # connection.execute(Reforestation.insert(), {"land_price": 101010.0, "latitude": 1208.0, "longitude": 234.0})
        connection.commit()

        result = connection.execute(sqlalchemy.text("select test_table.name from test_table"))
        for row in result:
            print("Name:", row.name)