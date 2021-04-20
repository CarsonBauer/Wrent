from flask import Blueprint
controllers = Blueprint('routes', __name__, template_folder='../templates')
from .Permissions import *
from .Locations import *
from .Users import *
from .Items import *
from .Comments import *
from .Rentals import *
from .TempCodes import *
from .Images import *
from .Tags import *
from .TagItems import *
from .Refunds import *