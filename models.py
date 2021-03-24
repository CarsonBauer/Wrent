from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, ForeignKey, PrimaryKeyConstraint, Boolean, LargeBinary
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
    name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    location = Column(Integer, ForeignKey("Locations.id", ondelete="CASCADE"))
    userName = Column(String(120), unique=True, nullable=False)
    password = Column(String(30), nullable=False)
    permission = Column(Integer, ForeignKey("Permissions.id", ondelete="CASCADE"), nullable=False)
    isOauth = Column(Boolean, nullable=False)

    def __init__(self, name, password, email, location, userName, permission, isOauth):
        self.name = name
        self.password = password
        self.email = email
        self.location = location
        self.userName = userName
        self.permission = permission
        self.isOauth = isOauth

    def get_user(sent_id):
        return db_session.query(Users).get(sent_id)

    def post_user(sent_name, sent_password, sent_email, sent_location, sent_userName, sent_permission, sent_oauth):
        new_user = Users(name=sent_name,password=sent_password,email=sent_email,location=sent_location, userName=sent_userName,permission=sent_permission,isOauth=sent_oauth)
        db_session.add(new_user)
        db_session.commit()

    def delete_user(sent_id):
        del_user = db_session.query(Users).get(sent_id)
        db_session.delete(del_user)
        db_session.commit()

    def update_user(sent_id, sent_name, sent_password, sent_email, sent_location, sent_userName, sent_permission):
        updated_user = db_session.query(Users).get(sent_id)
        updated_user.id = sent_id
        updated_user.name = sent_name
        updated_user.password = sent_password
        updated_user.email = sent_email
        updated_user.location = sent_location
        updated_user.userName = sent_userName
        updated_user.permission = sent_permission
        db_session.commit()

    def update_user_password(sent_id, sent_password):
        updated_user = db_session.query(Users).get(sent_id)
        updated_user.password = sent_password
        db_session.commit()

    def authenticate(username, password):
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

    def get_item(sent_id):
        return db_session.query(Items).get(sent_id)

    def post_item(sent_location, sent_ownerId, sent_name, sent_description, sent_imageURL, sent_rating):
        new_item = Items(location=sent_location, ownerId=sent_ownerId, name=sent_name, description=sent_description, imageURL=sent_imageURL, rating=sent_rating)
        db_session.add(new_item)
        db_session.commit()

    def delete_item(sent_id):
        del_item = db_session.query(Items).get(sent_id)
        db_session.delete(del_item)
        db_session.commit()

    def update_item(sent_id, sent_location, sent_ownerId, sent_name, sent_description, sent_imageURL, sent_rating):
        updated_item = db_session.query(Items).get(sent_id)
        updated_item.location=sent_location
        updated_item.ownerId=sent_ownerId
        updated_item.name=sent_name
        updated_item.description=sent_description
        updated_item.imageURL=sent_imageURL
        updated_item.rating=sent_rating
        db_session.commit()

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

    def get_rental(sent_rentalId, sent_itemId):
        return db_session.query(Rentals).get((sent_rentalId, sent_itemId))

    def post_rental(sent_renterId, sent_itemId):
        db_session.add(Rentals(renterId=sent_renterId, itemId=sent_itemId))
        db_session.commit()

    def delete_rental(sent_rentalId, sent_itemId):
        ren = db_session.query(Rentals).get((sent_rentalId, sent_itemId))
        db_session.delete(ren)
        db_session.commit()

    def update_rental(sent_renterId, sent_itemId):
        ren = db_session.query(Rentals).get((sent_renterId, sent_itemId))
        ren.renterId=sent_renterId
        ren.itemId=sent_itemId
        db_session.commit()

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

    def get_comment(sent_id):
        return db_session.query(Comments).get(sent_id)

    def post_comment(sent_commentText, sent_posterId, sent_itemId):
        db_session.add(Comments(commentText=sent_commentText, posterId=sent_posterId, itemId=sent_itemId))
        db_session.commit()

    def delete_comment(sent_id):
        com = db_session.query(Comments).get(sent_id)
        db_session.delete(com)
        db_session.commit()

    def update_comment(sent_id, sent_commentText, sent_posterId, sent_itemId):
        com = db_session.query(Comments).get(sent_id)
        com.commentText=sent_commentText
        com.posterId=sent_posterId
        com.itemId=sent_itemId
        db_session.commit()

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

class TempCodes(Base):
    __tablename__ = "TempCodes"

    id = Column(Integer, primary_key=True)
    code = Column(String, nullable=False)

    def __init__(self, code):
        self.code = code

    def get_code(sent_id):
        return db_session.query(TempCodes).get(sent_id)

    def post_code(sent_code):
        db_session.add(TempCodes(code=sent_code))
        db_session.commit()

    def delete_code(sent_id):
        loc = db_session.query(TempCodes).get(sent_id)
        db_session.delete(loc)
        db_session.commit()

class Images(Base):
    __tablename__ = "Images"

    id = Column(Integer, primary_key=True)
    name = Column(String(300), nullable=False)
    itemId = Column(Integer, ForeignKey("Items.id", ondelete="CASCADE"), nullable=False)
    data = Column(LargeBinary, nullable=False)

    def __init__(self, data, name, itemId):
        self.data = data
        self.name = name
        self.itemId = itemId

    def post_image(sent_image, sent_name, sent_itemId):
        db_session.add(Images(data=sent_image, name=sent_name, itemId=sent_itemId))
        db_session.commit()

class Tags(Base):
    __tablename__ = "Tags"

    id = Column(Integer, primary_key=True)
    name = Column(String(300), nullable=False, unique=True)

    def __init__(self, name):
        self.name = name
    
    def post_tag(sent_name):
        db_session.add(Tags(name=sent_name))
        db_session.commit()

class TagItems(Base):
    __tablename__ = "TagItems"

    tagId = Column(Integer, ForeignKey("Tags.id", ondelete="CASCADE"), nullable=False)
    itemId = Column(Integer, ForeignKey("Items.id", ondelete="CASCADE"), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint(
            tagId, itemId,
        ),
    )

    def __init__(self, tagId, itemId):
        self.tagId = tagId
        self.itemId = itemId

    def post_tagItem(sent_tagId, sent_itemId):
        db_session.add(TagItems(tagId=sent_tagId, itemId=sent_itemId))
        db_session.commit()

# Create tables.
Base.metadata.create_all(bind=engine)