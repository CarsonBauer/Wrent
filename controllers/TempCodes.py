from flask import jsonify, request
from controllers import *
from models import TempCodes, Users
import jwt
import random
import smtplib
import os
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

@controllers.route('/tempcodes', methods=['POST'])
def send_code():
    auth = request.json
    random_string = ''
    email = auth['email']

    if Users.query.filter_by(email=email).first():
        for _ in range(10):
            random_integer = random.randint(97, 97 + 26 - 1)
            flip_bit = random.randint(0, 1)
            random_integer = random_integer - 32 if flip_bit == 1 else random_integer
            random_string += (chr(random_integer))

        TempCodes.post_code(random_string)

        # server = smtplib.SMTP("smtp.gmail.com", 587)
        # server.starttls()
        # server.login("email", os.getenv('CONNP'))
        # server.sendmail("email", email, random_string)

        return jsonify(random_string),200
    else:
        return jsonify(isError=True,
                       message="Email not found",
                       statusCode=404,
                       data=str("Not found")), 404

@controllers.route('/tempcodes/check', methods=['POST'])
def check_code():
    auth = request.json
    code = TempCodes.query.filter_by(code=auth['code']).first()

    if code:
        user = Users.query.filter_by(email=auth['email']).first()
        # token = create_access_token({
        #     "userName": user.userName,
        #     "email": user.email,
        #     "permission": user.permission
        #     })
        # return jsonify({"access_token": token}), 200
        return jsonify({'password': user.password}), 200
    else:
        return jsonify(isError=True,
                       message="Invalid retrieval code.",
                       statusCode=404,
                       data=str("Not found")), 404