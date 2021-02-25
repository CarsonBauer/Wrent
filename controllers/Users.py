from flask import jsonify, request
from controllers import *
from models import Users

@controllers.route('/users', methods=['GET'])
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
def get_user(id):
    try:
        user = Users.query.get(id)

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
def update_user(id):
    try:
        args = request.get_json()

        name = args['name']
        password = args['password']
        email = args['email']
        location = args['location']
        userName = args['userName']
        permission = args['permission']

        Users.update_user(id, name, password, email, location, userName, permission)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("User update error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=name), 201

@controllers.route('/users', methods=['POST'])
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
def delete_user(id):
    try:

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