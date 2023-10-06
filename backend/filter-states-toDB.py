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

    reforest_select = sqlalchemy.Table('reforest_select', meta,
                       sqlalchemy.Column('State', sqlalchemy.String),
                       sqlalchemy.Column('Abbreviation', sqlalchemy.String),
                       sqlalchemy.Column('County', sqlalchemy.String),
                       sqlalchemy.Column('Population', sqlalchemy.Float),
                       sqlalchemy.Column('Temperature', sqlalchemy.Float),
                       sqlalchemy.Column('Precipitation', sqlalchemy.Float),
                       sqlalchemy.Column('Palmer-Z', sqlalchemy.Float),
                       sqlalchemy.Column('Land-Prices', sqlalchemy.Float),
                       sqlalchemy.Column('Pop-Class', sqlalchemy.Integer),
                       sqlalchemy.Column('Temp-Class', sqlalchemy.Integer),
                       sqlalchemy.Column('Preci-Class', sqlalchemy.Integer),
                       sqlalchemy.Column('Palmerz-Class', sqlalchemy.Integer),
                       sqlalchemy.Column('Land-Class', sqlalchemy.Integer)
                       )

    # Create the table
    #reforest_select.create(engine)

    inspector = sqlalchemy.inspect(engine)
    if "reforest_select" in inspector.get_table_names():
        with open('filter-reforest.csv', 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            with engine.connect() as connection:
                connection.execute(reforest_select.delete()) #to delete so there are no duplicates
                for row in csv_reader:
                    connection.execute(reforest_select.insert(), {
                        "State": row['State'],
                        "Abbreviation": row['Abbreviation'],
                        "County": row['County'],
                        "Population": float(row['Population']),
                        "Temperature": float(row['Temperature']),
                        "Precipitation": float(row['Precipitation']),
                        "Palmer-Z": float(row['Palmer-Z']),
                        "Land-Prices": float(row['Palmer-Z']),
                        "Pop-Class": (row['pop-class']),
                        "Temp-Class": (row['temp-class']),
                        "Preci-Classs": (row['preci-class']),
                        "Palmerz-Class": (row['palm-class']),
                        "Land-Class": (row['land-class']),
                    })
                connection.commit()

    else:
        print(" does not exist")