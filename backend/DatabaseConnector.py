import os
from google.cloud.sql.connector import Connector, IPTypes
import pg8000

import sqlalchemy


# TODO     
# Note: Saving credentials in environment variables is convenient, but not
# secure - consider a more secure solution such as
# Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
# keep secrets safe.
INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:test-database" 
DB_USER="testUser"
DB_PASS="@]pzXU3(U@tB}Ss["
DB_NAME="test-1"


def connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,DB_NAME) -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of Postgres.

    Uses the Cloud SQL Python Connector package.
    """
    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    # initialize Cloud SQL Python Connector object
    connector = Connector()

    def getconn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            INSTANCE_CONNECTION_NAME,
            "pg8000",
            user=DB_USER,
            password=DB_PASS,
            db=DB_NAME,
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


##TEST
if __name__ == '__main__':  
    engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,DB_NAME)
    meta=sqlalchemy.MetaData()
    Reforestation = sqlalchemy.Table('reforestation_table', meta,
    sqlalchemy.Column('land_price', sqlalchemy.Float),
    sqlalchemy.Column('latitude', sqlalchemy.Float),
    sqlalchemy.Column('longitude', sqlalchemy.Float),
    )
    # TO CREATE TABLE
    # Reforestation.create(engine)   
    
    with engine.connect() as connection:
        
        # TO INSERT INTO TABLE
        # connection.execute(Reforestation.insert(), {"land_price": 111111.0, "latitude": 599.0, "longitude": 695.0})
        # connection.execute(Reforestation.insert(), {"land_price": 101010.0, "latitude": 69.0, "longitude": 34.0})
        # connection.execute(Reforestation.insert(), {"land_price": 101010.0, "latitude": 1208.0, "longitude": 234.0})
        # connection.commit()
        
        result = connection.execute(sqlalchemy.text("select reforestation_table.longitude from reforestation_table"))
        for row in result:
            print("Longitude:", row.longitude) 
        