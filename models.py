from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from extensions import db

engine = create_engine('postgresql://postgres:password@localhost/wrentTest', echo=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

# Set your classes here.

class Users(Base):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    location = db.Column(db.Integer, db.ForeignKey("Locations.id", ondelete="CASCADE"), nullable=False)
    userName = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(30), unique=True, nullable=False)
    permission = db.Column(db.Integer, db.ForeignKey("Permissions.id", ondelete="CASCADE"), nullable=False)

    def __init__(self, id, name, password, email, location, userName, permission):
        self.id = id
        self.name = name
        self.password = password
        self.email = email
        self.location = location
        self.userName = userName
        self.permission = permission

class Items(Base):
    __tablename__ = 'Items'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.Integer, db.ForeignKey("Locations.id", ondelete="CASCADE"), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    imageURL = db.Column(db.String(120))
    rating = db.Column(db.Float)

    def __init__(self, id, location, ownerId, name, description, imageURL, rating):
        self.id = id
        self.location = location
        self.ownerId = ownerId
        self.name = name
        self.description = description
        self.imageURL = imageURL
        self.rating = rating

class Rentals(Base):
    __tablename__ = "Rentals"

    renterId = db.Column(db.Integer, db.ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey("Items.id", ondelete="CASCADE"), nullable=False)

    __table_args__ = (
        db.PrimaryKeyConstraint(
            renterId, itemId,
        ),
    )

    def __init__(self, renterId, itemId):
        self.renterId = renterId
        self.itemId = itemId

class Permissions(Base):
    __tablename__ = "Permissions"

    id = db.Column(db.Integer, primary_key=True)
    permission = db.Column(db.String(120), nullable=False)

    def __init__(self, id, permission):
        self.id = id
        self.permission = permission

class Comments(Base):
    __tablename__ = "Comments"

    id = db.Column(db.Integer, primary_key=True)
    commentText = db.Column(db.String(120), nullable=False)
    posterId = db.Column(db.Integer, db.ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey("Items.id", ondelete="CASCADE"), nullable=False)

    def __init__(self, id, commentText, posterId, itemId):
        self.id = id
        self.commentText = commentText
        self.posterId = posterId
        self.itemId = itemId

class Locations(Base):
    __tablename__ = "Locations"

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)

    def __init__(self, id, lat, lon):
        self.id = id
        self.lat = lat
        self.lon = lon


# Create tables.
Base.metadata.create_all(bind=engine)