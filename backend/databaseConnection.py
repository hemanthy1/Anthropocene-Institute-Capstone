import os

from google.cloud.sql.connector import Connector, IPTypes
import pg8000

import sqlalchemy


def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of Postgres.

    Uses the Cloud SQL Python Connector package.
    """
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.

    instance_connection_name =  "carbon-mapp:us-east5:test-database"  # e.g. 'project:region:instance'
    db_user = "testUser"  # e.g. 'my-db-user'
    db_pass = "@]pzXU3(U@tB}Ss["  # e.g. 'my-db-password'
    db_name = "test-1"  # e.g. 'my-database'

    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    # initialize Cloud SQL Python Connector object
    connector = Connector()

    def getconn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            instance_connection_name,
            "pg8000",
            user=db_user,
            password=db_pass,
            db=db_name,
            ip_type=ip_type,
        )
        return conn

    # The Cloud SQL Python Connector can be used with SQLAlchemy
    # using the 'creator' argument to 'create_engine'
    pool = sqlalchemy.create_engine(
        "postgresql+pg8000://",
        creator=getconn,
    )
    return pool

if __name__ == '__main__':  
    engine=connect_with_connector()
    meta=sqlalchemy.MetaData()
    Reforestation = sqlalchemy.Table('reforestation_table', meta,
    sqlalchemy.Column('land_price', sqlalchemy.Float),
    sqlalchemy.Column('latitude', sqlalchemy.Float),
    sqlalchemy.Column('longitude', sqlalchemy.Float),
    )
    # Reforestation.create(engine)   
    
    with engine.connect() as connection:
        # connection.execute(Reforestation.insert(), {"land_price": 111111.0, "latitude": 599.0, "longitude": 695.0})
        # connection.execute(Reforestation.insert(), {"land_price": 101010.0, "latitude": 69.0, "longitude": 34.0})
        # connection.execute(Reforestation.insert(), {"land_price": 101010.0, "latitude": 1208.0, "longitude": 234.0})
        # connection.commit()
        result = connection.execute(sqlalchemy.text("select reforestation_table.longitude from reforestation_table"))
        for row in result:
            print("Longitude:", row.longitude)

        # result = connection.execute(sqlalchemy.select([Reforestation.Land_Price]))
        # land_prices_list = [row['land_price'] for row in result]
        # print(land_prices_list)     
        