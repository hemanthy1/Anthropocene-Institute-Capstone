from flask import Flask, render_template, jsonify
from DatabaseConnector import connect_with_connector
import sqlalchemy
import os
from google.oauth2.credentials import Credentials
from collections import OrderedDict
import json

app = Flask(__name__)

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:carbon-mapp" 
DB_USER="Uploader1"
DB_PASS="Ubf:X$LI+{kRRiHz"
DB_NAME="ForestationData"



@app.route('/forestationstategeojson.geojson', methods=['GET'])
def get_forestationstatejson():
    try:
        engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,DB_NAME)
        json_data = OrderedDict([
            ("type", "FeatureCollection"),
            ("features", [])
        ])

        with engine.connect() as connection:
            result = connection.execute(sqlalchemy.text("SELECT * FROM states_table"))
            
            for row in result:
                feature = OrderedDict([
                    ("type", row.type),
                    ("properties", row.properties),
                    ("geometry", row.geometry)
                ])
                json_data["features"].append(feature)
        
        json_format=json.dumps(json_data)
        return json_format

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/forestationcountygeojson.geojson', methods=['GET'])
def get_forestationcountyjson():
    try:
        engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,DB_NAME)
        json_data = OrderedDict([
            ("type", "FeatureCollection"),
            ("features", [])
        ])
        with engine.connect() as connection:
            result = connection.execute(sqlalchemy.text("SELECT * FROM counties_table"))
            
            for row in result:
                feature = OrderedDict([
                    ("type", row.type),
                    ("properties", row.properties),
                    ("geometry", row.geometry)
                ])
                json_data["features"].append(feature)
        json_format=json.dumps(json_data)
        return json_format
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def index():
    return('<h1>Main Page</h1>')


if __name__ == '__main__':  
    app.run(debug=True)
