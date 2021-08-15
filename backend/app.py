from flask import Flask, request
from flask_restplus import Resource, Api, reqparse, abort
from database.config import Database

app = Flask(__name__)
api = Api(app)
db = Database()
parser = reqparse.RequestParser()

sensorData = {
    "bodyTemperature": 99,
    "roomTemperature": 99,
    "ecg": 99
}


class SensorsController(Resource):
    @staticmethod
    def get():
        sensor_data = db.get_all_sensor_values()
        return {"data": sensor_data}

    @staticmethod
    def post():
        parser.add_argument('body_temp', type=float, required=True)
        parser.add_argument('room_temp', type=float, required=True)
        parser.add_argument('ecg_data', type=float, required=True)
        args = parser.parse_args(strict=True)
        result = db.insert_values(args['body_temp'], args['room_temp'], args['ecg_data'])
        if result["success"]:
            return {"message": result}
        else:
            abort(404, error="Database Error. Please contact Admin")


class Sensors(Resource):
    def get(self):
        return {"data": sensorData}

    def post(self):
        parser.add_argument('data', type=int, help='Rate to charge for this resource')
        args = parser.parse_args(strict=True)
        print(args)
        return {"data": "Posted"}


api.add_resource(Sensors, "/sensors")
api.add_resource(SensorsController, "/ctl")

if __name__ == '__main__':
    db.create_tables()
    app.run(debug=True)
