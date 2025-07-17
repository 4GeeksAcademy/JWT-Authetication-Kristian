"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError 
from datetime import timedelta 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    print(">>> DATA RECEIVED:", data)

    required_fields = ['email', 'password', 'name', 'phone']
    missing_fields = [field for field in required_fields if field not in data or data[field].strip() == ""]
    if missing_fields:
        return jsonify({'msg': f"Missing fields: {', '.join(missing_fields)}"}), 400

    email = data['email']
    existing_user = db.session.execute(
        db.select(User).filter_by(email=email)).scalar_one_or_none()
    if existing_user:
        return jsonify({'msg': 'Email is already in use'}), 409

    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        name=data['name'],
        email=email,
        password=hashed_password,
        phone=data['phone'],
        is_active=True
    )
    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({
            'msg': 'User created successfully',
            'user': new_user.serialize()
        }), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'msg': 'Database error: Could not create user', 'error': str(e)}), 400
    except Exception as e:
        db.session.rollback()
        print(f"Unexpected error during user creation: {e}")
        return jsonify({'msg': 'Internal Server Error', 'error': str(e)}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}

    if not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Provide email and password"}), 400

    
    user = db.session.execute(db.select(User).filter_by(email=data['email'])).scalar_one_or_none()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"msg": "Bad credentials"}), 401


    token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=2))
    return jsonify({"access_token": token, "user": user.serialize()}), 200
