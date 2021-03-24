from flask import Flask, jsonify, request, send_file
from controllers import *
from models import Tags
import jwt
import io
import uuid
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/tags', methods=['GET'])
def get_tags():
    tags = Tags.query.all()
    lst = list()

    for tag in tags:
        lst.append(
            {
                'id': tag.id,
                'name': tag.name
            }
        )

    return jsonify(lst)

@controllers.route('/tags', methods=['POST'])
def post_tag():
    try:
        args = request.get_json()

        name = args['name']
        tag = Tags.query.filter_by(name=name).first()

        if not tag:
            Tags.post_tag(name)
            tag = Tags.query.filter_by(name=name).first()

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Tag addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=tag.id), 201