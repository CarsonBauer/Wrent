from flask import Flask, jsonify, request
from controllers import *
from models import Items, Images, Rentals, TagItems
import jwt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/items', methods=['GET'])
def get_items():

    items = Items.query.all()
    lst = list()

    for item in items:
        lst.append(
            {
                'id': item.id,
                'location': item.location,
                'ownerId': item.ownerId,
                'name': item.name,
                'description': item.description,
                'imageURL': item.imageURL,
                'rating': item.rating,
                'price': item.price,
                'date': item.date
            }
        )

    return jsonify(lst)


@controllers.route('/items/<int:id>', methods=['GET'])
def get_item(id):
    try:
        item = Items.query.get(id)

        if not item:
            return jsonify(isError=True,
                       message="Could not find item",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            data = {
                'id': item.id,
                'location': item.location,
                'ownerId': item.ownerId,
                'name': item.name,
                'description': item.description,
                'imageURL': item.imageURL,
                'rating': item.rating,
                'price': item.price,
                'date': item.date
            }

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(data)

@controllers.route('/items/<int:id>', methods=['PUT'])
@jwt_required(optional=False)
def update_item(id):

    data = get_jwt_identity()

    if data['permission'] == "Admin" or Users.query.filter_by(email=data['email']).first().id == Items.get_item(id).ownerId:
        try:

            args = request.get_json()

            location = args['location']
            ownerId = args['ownerId']
            name = args['name']
            description = args['description']
            imageURL = args['imageURL']
            rating = args['rating']
            price = args['price']

            if not Items.get_item(id):
                return jsonify(isError=True,
                        message="Could not find item",
                        statusCode=404,
                        data=str("Not Found")), 404
            else:
                Items.update_item(id, location, ownerId, name, description, imageURL, rating, price)

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

@controllers.route('/items', methods=['POST'])
@jwt_required(optional=False)
def post_item():
    try:
        args = request.get_json()

        location = args['location']
        ownerId = args['ownerId']
        name = args['name']
        description = args['description']
        imageURL = args['imageURL']
        rating = args['rating']
        price = args['price']

        res = Items.post_item(location, ownerId, name, description, imageURL, rating, price)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=res), 201

@controllers.route('/items/<int:id>', methods=['DELETE'])
@jwt_required(optional=False)
def delete_item(id):

    data = get_jwt_identity()

    if data['permission'] == "Admin" or Users.query.filter_by(email=data['email']).first().id == Items.get_item(id).ownerId:
        try:

            if not Items.get_item(id):
                return jsonify(isError=True,
                        message="Could not find item",
                        statusCode=404,
                        data=str("Not Found")), 404
            else:
                Items.delete_item(id)

        except Exception as e:
            return jsonify(isError=True,
                        message="Error",
                        statusCode=500,
                        data=str("Item deletion error")), 500
        else:
            return jsonify(isError=False,
                        message="Success",
                        statusCode=201,
                        data="item"), 201
    else:
        return jsonify(isError=True,
                    message="You are Unauthorized",
                    statusCode=401,
                    data=str("Restricted access")), 401

@controllers.route('/items/available', methods=['GET'])
def get_available_items():

    items = Items.query.all()
    lst = list()

    for item in items:
        if not Rentals.query.filter_by(itemId=item.id).first():
            lst.append(
                {
                    'id': item.id,
                    'location': item.location,
                    'ownerId': item.ownerId,
                    'name': item.name,
                    'description': item.description,
                    'imageURL': item.imageURL,
                    'rating': item.rating,
                    'price': item.price,
                    'date': item.date.timestamp()
                }
            )

    return jsonify(lst)

@controllers.route('/items/tags', methods=['POST'])
def get_items_from_tag():
    args = request.get_json()
    items = TagItems.query.filter_by(tagId=args['id'])
    lst = list()

    for i in items:
        item = Items.get_item(i.itemId)
        if not Rentals.query.filter_by(itemId=item.id).first():
            lst.append(
                    {
                        'id': item.id,
                        'location': item.location,
                        'ownerId': item.ownerId,
                        'name': item.name,
                        'description': item.description,
                        'imageURL': item.imageURL,
                        'rating': item.rating,
                        'price': item.price,
                        'date': item.date.timestamp()
                    }
                )

    return jsonify(lst)