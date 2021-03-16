from flask import jsonify, request
from controllers import *
from models import Locations
import jwt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/locations', methods=['GET'])
@jwt_required(optional=False)
def get_locations():

    locs = Locations.query.all()
    lst = list()

    for loc in locs:
        lst.append(
            {
                'id': loc.id,
                'lat': loc.lat,
                'lon': loc.lon
            }
        )

    return jsonify(lst)


@controllers.route('/locations/<int:id>', methods=['GET'])
@jwt_required(optional=False)
def get_location(id):
    try:
        loc = Locations.query.get(id)

        if not loc:
            return jsonify(isError=True,
                       message="Could not find location",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            data = {
                'id': loc.id,
                'lat': loc.lat,
                'lon': loc.lon
            }   

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(data)

@controllers.route('/locations/<int:id>', methods=['PUT'])
@jwt_required(optional=False)
def update_location(id):
    try:
        args = request.get_json()

        lat = args['lat']
        lon = args['lon']

        if not Locations.get_location(id):
            return jsonify(isError=True,
                       message="Could not find location",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            Locations.update_location(id, lat, lon)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=f"{lat},{lon}"), 201

@controllers.route('/locations', methods=['POST'])
@jwt_required(optional=False)
def post_location():
    try:
        args = request.get_json()

        lat = args['lat']
        lon = args['lon']

        if not Locations.query.filter_by(lat=lat, lon=lon).first():
            Locations.post_location(lat, lon)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=Locations.query.filter_by(lat=lat, lon=lon).first().id), 201

@controllers.route('/locations/<int:id>', methods=['DELETE'])
@jwt_required(optional=False)
def delete_location(id):
    try:

        if not Locations.get_location(id):
            return jsonify(isError=True,
                       message="Could not find location",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            Locations.delete_location(id)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Permission deletion error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data="location"), 201