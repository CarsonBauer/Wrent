from flask import Blueprint
controllers = Blueprint('routes', __name__, template_folder='../templates')
from .Permissions import *
from .Locations import *