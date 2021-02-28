from flask import jsonify, request
from controllers import *
from models import Comments

@controllers.route('/comments', methods=['GET'])
def get_comments():

    comments = Comments.query.all()
    lst = list()

    for comment in comments:
        lst.append(
            {
                'id': comment.id,
                'commentText': comment.commentText,
                'posterId': comment.posterId,
                'itemId': comment.itemId
            }
        )

    return jsonify(lst)


@controllers.route('/comments/<int:id>', methods=['GET'])
def get_comment(id):
    try:
        comment = Comments.get_comment(id)

        if not comment:
            return jsonify(isError=True,
                       message="Could not find comment",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            data = {
                'id': comment.id,
                'commentText': comment.commentText,
                'posterId': comment.posterId,
                'itemId': comment.itemId
            }

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(data)

@controllers.route('/comments/<int:id>', methods=['PUT'])
def update_comment(id):
    try:

        args = request.get_json()

        commentText = args['commentText']
        posterId = args['posterId']
        itemId = args['itemId']

        if not Comments.get_comment(id):
            return jsonify(isError=True,
                       message="Could not find comment",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            Comments.update_comment(id, commentText, posterId, itemId)

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

@controllers.route('/comments', methods=['POST'])
def post_comment():
    try:
        args = request.get_json()

        commentText = args['commentText']
        posterId = args['posterId']
        itemId = args['itemId']

        Comments.post_comment(commentText, posterId, itemId)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data=posterId), 201

@controllers.route('/comments/<int:id>', methods=['DELETE'])
def delete_comment(id):
    try:

        if not Comments.get_comment(id):
            return jsonify(isError=True,
                       message="Could not find comment",
                       statusCode=404,
                       data=str("Not Found")), 404
        else:
            Comments.delete_comment(id)

    except Exception as e:
        return jsonify(isError=True,
                       message="Error",
                       statusCode=500,
                       data=str("Internal Server Error")), 500
    else:
        return jsonify(isError=False,
                       message="Success",
                       statusCode=201,
                       data="comment"), 201