from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, ForeignKey, PrimaryKeyConstraint
from config import SQLALCHEMY_DATABASE_URI

engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

# Set your classes here.

class Users(Base):
    __tablename__ = 'Users'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    location = Column(Integer, ForeignKey("Locations.id", ondelete="CASCADE"), nullable=False)
    userName = Column(String(20), unique=True, nullable=False)
    password = Column(String(30), unique=True, nullable=False)
    permission = Column(Integer, ForeignKey("Permissions.id", ondelete="CASCADE"), nullable=False)

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

    id = Column(Integer, primary_key=True)
    location = Column(Integer, ForeignKey("Locations.id", ondelete="CASCADE"), nullable=False)
    ownerId = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(120), nullable=False)
    description = Column(String(500), nullable=False)
    imageURL = Column(String(120))
    rating = Column(Float)

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

    renterId = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    itemId = Column(Integer, ForeignKey("Items.id", ondelete="CASCADE"), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint(
            renterId, itemId,
        ),
    )

    def __init__(self, renterId, itemId):
        self.renterId = renterId
        self.itemId = itemId

class Permissions(Base):
    __tablename__ = "Permissions"

    id = Column(Integer, primary_key=True)
    permission = Column(String(120), nullable=False)

    def __init__(self, id, permission):
        self.id = id
        self.permission = permission

class Comments(Base):
    __tablename__ = "Comments"

    id = Column(Integer, primary_key=True)
    commentText = Column(String(120), nullable=False)
    posterId = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    itemId = Column(Integer, ForeignKey("Items.id", ondelete="CASCADE"), nullable=False)

    def __init__(self, id, commentText, posterId, itemId):
        self.id = id
        self.commentText = commentText
        self.posterId = posterId
        self.itemId = itemId

class Locations(Base):
    __tablename__ = "Locations"

    id = Column(Integer, primary_key=True)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)

    def __init__(self, id, lat, lon):
        self.id = id
        self.lat = lat
        self.lon = lon


# Create tables.
Base.metadata.create_all(bind=engine)