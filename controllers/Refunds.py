from flask import jsonify, request
from controllers import *
from models import Refunds, Items, Users, Rentals
import jwt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/refunds', methods=['GET'])
# @jwt_required(optional=False)
def get_refunds():

    refunds = Refunds.query.all()
    lst = list()

    for refund in refunds:
        item = Items.get_item(refund.itemId)
        user = Users.get_user(refund.renterId)

        lst.append(
            {
                'refundId': refund.id,
                'itemName': item.name,
                'user': user.name
            }
        )

    return jsonify(lst)

@controllers.route('/refunds', methods=['POST'])
def post_refund():
    try:
        args = request.get_json()

        renterId = args['renterId']
        itemId = args['itemId']

        Refunds.post_refund(renterId, itemId)

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

@controllers.route('/refunds/<int:id>', methods=['DELETE'])
def delete_refund(id):
    try:

        refund = Refunds.query.filter_by(id=id).first()

        Rentals.delete_rental(refund.renterId, refund.itemId)

        Refunds.delete_refund(id)

    except Exception as e:
        return jsonify(isError=True,
                    message="Error",
                    statusCode=500,
                    data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                    message="Success",
                    statusCode=201,
                    data="refund"), 201