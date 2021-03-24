from flask import Flask, jsonify, request, send_file
from controllers import *
from models import TagItems
import jwt
import io
import uuid
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/tagItems', methods=['GET'])
def get_tagItems():
    tagItems = TagItems.query.all()
    lst = list()

    for tagItem in tagItems:
        lst.append(
            {
                'tagId': tagItem.tagId,
                'itemId': tagItem.itemId
            }
        )

    return jsonify(lst)

@controllers.route('/tagItems', methods=['POST'])
def post_tagItem():
    try:
        args = request.get_json()

        tagId = args['tagId']
        itemId = args['itemId']

        TagItems.post_tagItem(tagId, itemId)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("TagItem addition error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data="Success"), 201