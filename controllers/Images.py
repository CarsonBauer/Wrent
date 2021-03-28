from flask import Flask, jsonify, request, send_file
from controllers import *
from models import Items, Images
import jwt
import io
import uuid
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/images/<string:name>', methods=['GET'])
def get_image(name):
    try:
        img = Images.query.filter_by(name=name).first()

        if not img:
            return jsonify(isError=True,
                        message="Error",
                        statusCode=404,
                        data=str("Not found")), 404

    except Exception as e:
            return jsonify(isError=True,
                        message="Error",
                        statusCode=500,
                        data=str("Internal Server Error")), 500
    else:
        return send_file(io.BytesIO(img.data),
                        attachment_filename=name,
                        mimetype='image/png'), 200

@controllers.route('/images', methods=['POST'])
def upload_image():
    try:
        file = request.files['image']
        name = str(uuid.uuid4())
        url = "/images/"+name
        if not file:
            return jsonify(isError=True,
                        message="Error",
                        statusCode=500,
                        data=str("No image")), 500
        else:
            Images.post_image(file.read(), name)

    except Exception as e:
            return jsonify(isError=True,
                        message="Error",
                        statusCode=500,
                        data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                        message="Success",
                        statusCode=200,
                        data=url), 200