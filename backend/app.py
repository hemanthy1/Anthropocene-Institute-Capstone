from flask import Flask, render_template, jsonify, Response
from DatabaseConnector import connect_with_connector
import sqlalchemy
import os
from google.oauth2.credentials import Credentials
from collections import OrderedDict
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

INSTANCE_CONNECTION_NAME="carbon-mapp:us-east5:carbon-mapp" 
DB_USER="Uploader1"
DB_PASS="Ubf:X$LI+{kRRiHz"
ForestationDB_NAME="ForestationData"
DacDB_NAME="DACData"


@app.route('/forestationstategeojson.geojson', methods=['GET'])
def get_forestationstatejson():
    try:
        engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,ForestationDB_NAME)
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
        engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,ForestationDB_NAME)
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


@app.route('/dacstategeojson.geojson', methods=['GET'])
def get_dacstatejson():
    try:
        engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,DacDB_NAME)
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


@app.route('/daccountygeojson.geojson', methods=['GET'])
def get_daccountyjson():
    try:
        engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,DacDB_NAME)
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



# @app.route('/hardcode.geojson', methods=['GET'])
# def get_hardcodedjson():
#     try:
#         print("Current working directory:", os.getcwd())
#         with open('./hardcode.json', 'r') as json_file:
            
#             data = json.load(json_file)
#         # Flask's jsonify function automatically sets the correct Content-Type for JSON
#         return jsonify(data)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500



@app.route('/')
def index():
    return('<h1>Main Page</h1>')


if __name__ == '__main__':  
    app.run(debug=True)
