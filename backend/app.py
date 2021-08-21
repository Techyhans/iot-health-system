from flask import Flask, request
from flask_restplus import Resource, Api, reqparse, abort, marshal_with, fields
from database.config import Database
from flask_cors import CORS

from werkzeug.utils import cached_property

app = Flask(__name__)
CORS(app, support_credentials=True)
api = Api(app=app, version="1.0",
          title="IoT Health System",
          description="IoT Health System Developed by Techyhans")
db = Database()
parser = reqparse.RequestParser()


class Sensor(Resource):
    @staticmethod
    def get():
        sensor_data = db.get_latest_entry()
        return sensor_data


class Sensors(Resource):
    @staticmethod
    def get():
        sensor_data = db.get_all_sensor_values()
        return sensor_data

    @staticmethod
    @api.doc(params={'body_temp': 'Body Temperature'})
    @api.doc(params={'room_temp': 'Room Temperature'})
    @api.doc(params={'ecg_data': 'EcgData'})
    def post():
        parser.add_argument('body_temp', required=True)
        parser.add_argument('room_temp', required=True)
        parser.add_argument('ecg_data', required=True)
        args = parser.parse_args(strict=True)
        result = db.insert_values(args['body_temp'], args['room_temp'], args['ecg_data'])
        if result["success"]:
            return {"message": result}
        else:
            abort(404, error="Database Error. Please contact Admin")


api.add_resource(Sensors, "/sensors")
api.add_resource(Sensor, "/sensor")

if __name__ == '__main__':
    db.create_tables()
    app.run(debug=True)
