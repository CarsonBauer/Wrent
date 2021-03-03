from flask import jsonify, request
from controllers import *
from models import Rentals
import jwt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/rentals', methods=['GET'])
@jwt_required(optional=False)
def get_rentals():

    rentals = Rentals.query.all()
    lst = list()

    for rental in rentals:
        lst.append(
            {
                'renterId': rental.renterId,
                'itemId': rental.itemId
            }
        )

    return jsonify(lst)


@controllers.route('/rentals/<int:renterId>/<int:itemId>', methods=['GET'])
@jwt_required(optional=False)
def get_rental(renterId, itemId):
    try:
        rental = Rentals.get_rental(renterId, itemId)

        if not rental:
            return jsonify(isError=True,
                       message="Could not find rental",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            data = {
                'renterId': rental.renterId,
                'itemId': rental.itemId
            }

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(data)

@controllers.route('/rentals/<int:renterId>/<int:itemId>', methods=['PUT'])
@jwt_required(optional=False)
def update_rental(renterId, itemId):

        data = get_jwt_identity()

        if Permissions.get_permission(data['permission']).permission == "Admin": #or Users.query.filter_by(email=data['email']).first().id == renterId:
            try:
                args = request.get_json()

                renterId = args['renterId']
                itemId = args['itemId']

                if not Items.get_item(id):
                    return jsonify(isError=True,
                            message="Could not find rental",
                            statusCode=404,
                            data=str("Not Found")), 404
                else:
                    Rentals.update_rental(renterId, itemId)
            except Exception as e:
                return jsonify(isError=True,
                            message="Error",
                            statusCode=500,
                            data=str("Internal Server Error")), 500
            else:
                return jsonify(isError=False,
                            message="Success",
                            statusCode=201,
                            data=name), 201
        else:
            return jsonify(isError=True,
                    message="You are Unauthorized",
                    statusCode=401,
                    data=str("Restricted access")), 401

@controllers.route('/rentals', methods=['POST'])
@jwt_required(optional=False)
def post_rental():
    try:
        args = request.get_json()

        renterId = args['renterId']
        itemId = args['itemId']

        Rentals.post_rental(renterId, itemId)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=renterId), 201

@controllers.route('/rentals/<int:renterId>/<int:itemId>', methods=['DELETE'])
@jwt_required(optional=False)
def delete_rental(renterId, itemId):

    data = get_jwt_identity()

    if Permissions.get_permission(data['permission']).permission == "Admin": #or Users.query.filter_by(email=data['email']).first().id == renterId:
        try:

            if not Rentals.get_rental(renterId, itemId):
                return jsonify(isError=True,
                        message="Could not find rental",
                        statusCode=404,
                        data=str("Not Found")), 404
            else:
                Rentals.delete_rental(renterId, itemId)

        except Exception as e:
            return jsonify(isError=True,
                        message="Error",
                        statusCode=500,
                        data=str("Internal Server Error")), 500
        else:
            return jsonify(isError=False,
                        message="Success",
                        statusCode=201,
                        data="rental"), 201
    else:
        return jsonify(isError=True,
                    message="You are Unauthorized",
                    statusCode=401,
                    data=str("Restricted access")), 401