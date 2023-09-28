from flask import Flask, render_template, jsonify
from DatabaseConnector import connect_with_connector
import sqlalchemy

app = Flask(__name__)



@app.route('/coordinates', methods=['GET'])
def get_coordinates():
    engine=connect_with_connector()
    data = []
    try:
        with engine.connect() as connection:
            result = connection.execute(sqlalchemy.text("select reforestation_table.longitude from reforestation_table"))
            lats = []
            longs = []
            for row in result:
                print("Longitude:", row.longitude)
                longs.append(row.longitude)
            result = connection.execute(sqlalchemy.text("select reforestation_table.latitude from reforestation_table"))
            for row in result:
                print("Latitude:", row.latitude)
                lats.append(row.latitude)
        for i in range(len(lats)):
            data.append({
                    "latitude": lats[i],
                    "longitude": longs[i]
                })
            
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/')
def index():
    return('<h1>hello</h1>')


if __name__ == '__main__':  
    app.run(debug=True)
