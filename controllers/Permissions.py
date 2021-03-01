from flask import jsonify, request
from controllers import *
from models import Permissions

@controllers.route('/permissions', methods=['GET'])
def get_permissions():

    perms = Permissions.query.all()
    lst = list()

    for perm in perms:
        lst.append(
            {
                'id': perm.id,
                'permission': perm.permission
            }
        )

    return jsonify(lst)


@controllers.route('/permissions/<int:id>', methods=['GET'])
def get_permission(id):
    try:
        perm = Permissions.query.get(id)

        if not perm:
            return jsonify(isError=True,
                       message="Could not find permission",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            data = {
                'id': perm.id,
                'permission': perm.permission
            }

    except Exception as e:
        return jsonify(isError=True,
                       message="Could not find permission",
                       statusCode=404,
                       data=str("Not Found")), 404
    else:
        return jsonify(data)

@controllers.route('/permissions/<int:id>', methods=['PUT'])
def update_permission(id):
    try:
        args = request.get_json()

        permission = args['permission']

        if not Permissions.get_permission(id):
            return jsonify(isError=True,
                       message="Could not find permission",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            Permissions.update_permission(id, permission)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Permission update error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=permission), 201

@controllers.route('/permissions', methods=['POST'])
def post_permission():
    try:
        args = request.get_json()

        permission = args['permission']

        Permissions.post_permission(permission)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Permission addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=permission), 201

@controllers.route('/permissions/<int:id>', methods=['DELETE'])
def delete_permission(id):
    try:

        if not Permissions.get_permission(id):
            return jsonify(isError=True,
                       message="Could not find permission",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            Permissions.delete_permission(id)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Permission deletion error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data="permission"), 201