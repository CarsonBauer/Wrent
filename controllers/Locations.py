from flask import jsonify, request
from controllers import *
from models import Locations

@controllers.route('/locations', methods=['GET'])
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
def get_location(id):
    try:
        loc = Locations.query.get(id)

        data = {
            'id': loc.id,
            'lat': loc.lat,
            'lon': loc.lon
        }

    except Exception as e:
        return jsonify(isError=True,
                       message="Could not find location",
                       statusCode=404,
                       data=str("Not Found")), 404
    else:
        return jsonify(data)

@controllers.route('/locations/<int:id>', methods=['PUT'])
def update_location(id):
    try:
        args = request.get_json()

        lat = args['lat']
        lon = args['lon']

        Locations.update_location(id, lat, lon)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Location update error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=f"{lat},{lon}"), 201

@controllers.route('/locations', methods=['POST'])
def post_location():
    try:
        args = request.get_json()

        id = args['id']
        lat = args['lat']
        lon = args['lon']

        Locations.post_location(id, lat, lon)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Permission addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=f"{lat},{lon}"), 201

@controllers.route('/locations/<int:id>', methods=['DELETE'])
def delete_location(id):
    try:

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