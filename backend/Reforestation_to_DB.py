#NEED TO RUN DO NOT RUN MULTIPLE TIMES!!!!!!!!!!!!!!!!!!!!

import sqlalchemy
from DatabaseConnector import connect_with_connector
import csv

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:carbon-mapp"
DB_USER="teamanthro"
DB_PASS="Anthinst498"
DB_NAME="forestationdb"

if __name__ == '__main__':
    engine = connect_with_connector(INSTANCE_CONNECTION_NAME, DB_USER, DB_PASS, DB_NAME)
    meta = sqlalchemy.MetaData()

    forestation = sqlalchemy.Table('forestation', meta,
                       sqlalchemy.Column('State', sqlalchemy.String),
                       sqlalchemy.Column('Abbreviation', sqlalchemy.String),
                       sqlalchemy.Column('County', sqlalchemy.String),
                       sqlalchemy.Column('Population', sqlalchemy.Float),
                       sqlalchemy.Column('Temperature', sqlalchemy.Float),
                       sqlalchemy.Column('Precipitation', sqlalchemy.Float),
                       sqlalchemy.Column('Palmer-Z', sqlalchemy.Float),
                       sqlalchemy.Column('Land-Prices', sqlalchemy.Float)
                       )

    # Create the table
    #forestation.create_all(engine)

    inspector = sqlalchemy.inspect(engine)
    if "forestation" in inspector.get_table_names():
        with open('reforestationDB.csv', 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            with engine.connect() as connection:
                #connection.execute(forestation.delete()) #to delete so there are no duplicates
                for row in csv_reader:
                    connection.execute(forestation.insert(), {
                        "State": row['State'],
                        "Abbreviation": row['Abbreviation'],
                        "County": row['County'],
                        "Population": (row['Population']) if row['Population'] else None,
                        "Temperature": float(row['Temperature']) if row['Temperature'] else None,
                        "Precipitation": float(row['Precipitation']) if row['Precipitation'] else None,
                        "Palmer-Z": float(row['Palmer-Z']) if row['Palmer-Z'] else None,
                        "Land-Prices": float(row['Land-Prices']) if row['Land-Prices'] else None
                    })
                connection.commit()

    else:
        print("test_table does not exist")

