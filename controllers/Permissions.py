from flask import jsonify, request
from controllers import *
from models import Permissions
import jwt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/permissions', methods=['GET'])
@jwt_required(optional=False)
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
@jwt_required(optional=False)
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
@jwt_required(optional=False)
def update_permission(id):

    data = get_jwt_identity()

    if data['permission'] == "Admin":
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
    else:
        return jsonify(isError=True,
                    message="You are Unauthorized",
                    statusCode=401,
                    data=str("Restricted access")), 401

@controllers.route('/permissions', methods=['POST'])
#@jwt_required(optional=False)
def post_permission():

    #data = get_jwt_identity()

    #if data['permission'] == "Admin":
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
    # else:
    #     return jsonify(isError=True,
    #                 message="You are Unauthorized",
    #                 statusCode=401,
    #                 data=str("Restricted access")), 401

@controllers.route('/permissions/<int:id>', methods=['DELETE'])
@jwt_required(optional=False)
def delete_permission(id):

    data = get_jwt_identity()

    if data['permission'] == "Admin":
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
    else:
        return jsonify(isError=True,
                    message="You are Unauthorized",
                    statusCode=401,
                    data=str("Restricted access")), 401