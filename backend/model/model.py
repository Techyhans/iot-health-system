from flask_restplus import Namespace, fields

namespace = Namespace('iot_health', 'IoT Health System related endpoints')

sensor_controller_post_attr = {
    'message': fields.String(
        readonly=True,
        description='Hello world message'
    )
}