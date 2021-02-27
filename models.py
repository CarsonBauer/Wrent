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

    def __init__(self, name, password, email, location, userName, permission):
        self.name = name
        self.password = password
        self.email = email
        self.location = location
        self.userName = userName
        self.permission = permission

    def get_user(self, sent_id):
        return db_session.query(Users).get(sent_id)

    def post_user(self, sent_name, sent_password, sent_email, sent_location, sent_userName, sent_permission):
        new_user = Users(name=sent_name,password=sent_password,email=sent_email,location=sent_location,userName=sent_userName,permission=sent_permission)
        db_session.add(new_user)
        db_session.commit()

    def delete_user(self, sent_id):
        del_user = db_session.query(Users).get(sent_id)
        db_session.delete(del_user)
        db_session.commit()

    def update_user(self, sent_id, sent_name, sent_password, sent_email, sent_location, sent_userName, sent_permission):
        updated_user = db_session.query(Users).get(sent_id)
        updated_user.id = sent_id
        updated_user.name = sent_name
        updated_user.password = sent_password
        updated_user.email = sent_email
        updated_user.location = sent_location
        updated_user.userName = sent_userName
        updated_user.permission = sent_permission
        db_session.commit()

    def authenticate(self, username, password):
        result = db_session.query(Users).filter(Users.name == username, Users.password == password).first()
        return result

class Items(Base):
    __tablename__ = 'Items'

    id = Column(Integer, primary_key=True)
    location = Column(Integer, ForeignKey("Locations.id", ondelete="CASCADE"), nullable=False)
    ownerId = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(120), nullable=False)
    description = Column(String(500), nullable=False)
    imageURL = Column(String(120))
    rating = Column(Float)

    def __init__(self, location, ownerId, name, description, imageURL, rating):
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

    def __init__(self, permission):
        self.permission = permission

    def get_permission(sent_id):
        return db_session.query(Permissions).get(sent_id)

    def post_permission(sent_permission):
        db_session.add(Permissions(permission=sent_permission))
        db_session.commit()

    def delete_permission(sent_id):
        perm = db_session.query(Permissions).get(sent_id)
        db_session.delete(perm)
        db_session.commit()

    def update_permission(sent_id, sent_permission):
        perm = db_session.query(Permissions).get(sent_id)
        perm.permission = sent_permission
        db_session.commit()


class Comments(Base):
    __tablename__ = "Comments"

    id = Column(Integer, primary_key=True)
    commentText = Column(String(120), nullable=False)
    posterId = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    itemId = Column(Integer, ForeignKey("Items.id", ondelete="CASCADE"), nullable=False)

    def __init__(self, commentText, posterId, itemId):
        self.commentText = commentText
        self.posterId = posterId
        self.itemId = itemId

class Locations(Base):
    __tablename__ = "Locations"

    id = Column(Integer, primary_key=True)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)

    def __init__(self, lat, lon):
        self.lat = lat
        self.lon = lon

    def get_location(sent_id):
        return db_session.query(Locations).get(sent_id)

    def post_location(sent_lat, sent_lon):
        db_session.add(Locations(lat=sent_lat,lon=sent_lon))
        db_session.commit()

    def delete_location(sent_id):
        loc = db_session.query(Locations).get(sent_id)
        db_session.delete(loc)
        db_session.commit()

    def update_location(sent_id, sent_lat, sent_lon):
        loc = db_session.query(Locations).get(sent_id)
        loc.lat = sent_lat
        loc.lon = sent_lon
        db_session.commit()


# Create tables.
Base.metadata.create_all(bind=engine)