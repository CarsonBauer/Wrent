from flask import jsonify, request
from controllers import *
from models import Users
import jwt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/users/login', methods=['POST'])
def login():
    auth = request.form

    if not auth or not auth.get('email') or not auth.get('password'):
        return jsonify(isError=True,
                       message="Login required",
                       statusCode=401,
                       data=str("Could not verify")), 401
    
    user = Users.query.filter_by(email = auth.get('email')).first()

    if not user:
        return jsonify(isError=True,
                       message="User not found",
                       statusCode=404,
                       data=str("Not found")), 404

    if user.password == auth.get('password'):
        token = create_access_token({
            "userName": user.userName,
            "email": user.email,
            "permission": 2
            })
        return {"access_token": token}, 200
        return 'Success', 200
    else:
        return 'Invalid login info', 400
        

@controllers.route('/users', methods=['GET'])
@jwt_required(optional=False)
def get_users():

    users = Users.query.all()
    lst = list()

    for user in users:
        lst.append(
            {
                'id': user.id,
                'name': user.name,
                'password': user.password,
                'email': user.email,
                'location': user.location,
                'userName': user.userName,
                'permission': user.permission
            }
        )

    return jsonify(lst)


@controllers.route('/users/<int:id>', methods=['GET'])
@jwt_required(optional=False)
def get_user(id):
    try:
        user = Users.query.get(id)

        if not user:
            return jsonify(isError=True,
                       message="Could not find user",
                       statusCode=404,
                       data=str("Not Found")), 404

        data = {
            'id': user.id,
            'name': user.name,
            'password': user.password,
            'email': user.email,
            'location': user.location,
            'userName': user.userName,
            'permission': user.permission
        }

    except Exception as e:
        return jsonify(isError=True,
                       message="Could not find user",
                       statusCode=404,
                       data=str("Not Found")), 404
    else:
        return jsonify(data)

@controllers.route('/users/<int:id>', methods=['PUT'])
@jwt_required(optional=False)
def update_user(id):

    data = get_jwt_identity()

    if data['permission'] == 1 or Users.query.filter_by(email=data['email']).first().id == id:
        try:
            args = request.get_json()

            name = args['name']
            password = args['password']
            email = args['email']
            location = args['location']
            userName = args['userName']
            permission = args['permission']

            if not Users.get_user(id):
                return jsonify(isError=True,
                        message="Could not find user",
                        statusCode=404,
                        data=str("Not Found")), 404
            else:
                Users.update_user(id, name, password, email, location, userName, permission)

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

@controllers.route('/users', methods=['POST'])
@jwt_required(optional=False)
def post_user():
    try:
        args = request.get_json()

        name = args['name']
        password = args['password']
        email = args['email']
        location = args['location']
        userName = args['userName']
        permission = args['permission']

        Users.post_user(name, password, email, location, userName, permission)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("User addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=name), 201

@controllers.route('/users/<int:id>', methods=['DELETE'])
@jwt_required(optional=False)
def delete_user(id):

    data = get_jwt_identity()

    if data['permission'] == 1 or Users.query.filter_by(email=data['email']).first().id == id:
        try:

            if not Users.get_user(id):
                return jsonify(isError=True,
                        message="Could not find user",
                        statusCode=404,
                        data=str("Not Found")), 404
            else:
                Users.delete_user(id)
        except Exception as e:
            return jsonify(isError=True,
                        message="Error",
                        statusCode=500,
                        data=str("User deletion error")), 500
        else:
            return jsonify(isError=False,
                        message="Success",
                        statusCode=201,
                        data="user"), 201
    else:
        return jsonify(isError=True,
                    message="You are Unauthorized",
                    statusCode=401,
                    data=str("Restricted access")), 401