from flask import jsonify, request
from controllers import *
from models import Permissions

@controllers.route('/permissions/all', methods=['GET'])
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

    perm = Permissions.query.get(id)

    data = {
        'id': perm.id,
        'permission': perm.permission
    }

    return jsonify(data)

@controllers.route('/permissions/update/<int:id>', methods=['PUT'])
def update_permission(id):
    try:
        args = request.get_json()
        
        permission = args['permission']

        Permissions.update_permission(id, permission)

    except Exception as e:
        #logging.warning(e)
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Service addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=permission), 201

@controllers.route('/permissions/post', methods=['POST'])
def post_permission():
    try:
        args = request.get_json()

        id = args['id']
        permission = args['permission']

        Permissions.post_permission(id, permission)

    except Exception as e:
        #logging.warning(e)
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Service addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=permission), 201

@controllers.route('/permissions/delete/<int:id>')
def delete_permission(id):
    try:

        Permissions.delete_permission(id)

    except Exception as e:
        #logging.warning(e)
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Service addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data="permission"), 201
