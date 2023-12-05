from flask import Flask, render_template, jsonify, Response, request
from flask_mail import Mail, Message
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
KelpDB_NAME="KelpFarmsData"

# email settings for feedback form
app.config['MAIL_SERVER'] = 'smtp-mail.outlook.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = "feedback.carbonmapp@outlook.com"
app.config['MAIL_PASSWORD'] = "Anthinst498"
app.config['MAIL_DEFAULT_SENDER'] = "feedback.carbonmapp@outlook.com"

mail = Mail(app)

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.json
        print("Data received:", data)
        subject = "Feedback From The Carbon Mapp Website"
        body = f"""
        A user has submitted the feedback form on the Carbonmapp site.
        
        Feedback:

        Feedback Type: {data.get('feedbackType')}
        Name: {data.get('firstName')} {data.get('lastName')}
        Email: {data.get('email')}
        Feedback: {data.get('feedback')}
        """

        msg = Message(subject, recipients=['holsche2@msu.edu'], body=body)
        mail.send(msg)
        return jsonify({'message': 'Email sent successfully'}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

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

@app.route('/kelpfarms.geojson', methods=['GET'])
def get_kelpfarms():
    try:
        engine=connect_with_connector(INSTANCE_CONNECTION_NAME,DB_USER,DB_PASS,KelpDB_NAME)
        json_data = OrderedDict([
            ("type", "FeatureCollection"),
            ("features", [])
        ])
        with engine.connect() as connection:
            result = connection.execute(sqlalchemy.text("SELECT * FROM data_table"))
            
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
    app.run(debug=True,port=4000)
