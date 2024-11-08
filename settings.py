from flask_sqlalchemy import SQLAlchemy
from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
import base64
import json
import requests

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]=f"postgresql://postgres:Apple@localhost:5432/green_alchemy"
db = SQLAlchemy(app)
CORS(app)

class PlantProfile(db.Model):
    __tablename__ = 'Plant_Profile'
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    common_name = db.Column(db.String, nullable=True)
    botanical_name = db.Column(db.String, nullable=True)
    habitat = db.Column(db.JSON, nullable=True)
    medical_usage = db.Column(db.JSON, nullable=True)
    cultivation_method = db.Column(db.JSON, nullable=True)
    region = db.Column(db.JSON, nullable=True)
    type = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)
    audio = db.Column(db.LargeBinary, nullable=True)
    
    def __init__(self, common_name, botanical_name, habitat, medical_usage, cultivation_method, region, type, description, audio):
        self.common_name = common_name
        self.botanical_name = botanical_name
        self.habitat = habitat
        self.medical_usage = medical_usage
        self.cultivation_method = cultivation_method
        self.region = region
        self.type = type
        self.description = description
        self.audio = audio

    def to_dict(self):
        return {
            'common_name': self.common_name,
            'botanical_name': self.botanical_name,
            'habitat': self.habitat,
            'medical_usage': self.medical_usage,
            'cultivation_method': self.cultivation_method,
            'region': self.region,
            'type': self.type,
            'description': self.description,
            'audio': base64.b64encode(self.audio).decode('utf-8') if self.audio else None
        }
    
class Bookmark(db.Model):
    __tablename__ = 'Bookmarks'
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user = db.Column(db.String, nullable=True)
    bookmarks = db.Column(db.JSON, nullable=True)
    
    def __init__(self, user, bookmarks):
        self.user = user
        self.bookmarks = bookmarks

class Login_Table(db.Model):
    __tablename__ = "Login"
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    email = db.Column('email', primary_key=True, nullable=False)
    name = db.Column('name', db.String(), nullable=False)
    password =   db.Column('password', db.String(), nullable=False)
    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = password

cloudflare_configs={
    "BASE_CLOUDFLARE_URL" : "https://api.cloudflare.com/client/v4/accounts/323829bdb64803aee477ce43285a9e19/ai/run/",
    "headers" : {"Authorization": "Bearer cgvftPoHNVH3CEiV58HvfDHoCcngjttlxweNG0tX"},   
}

def run_cloudflare_model(model, inputs):
    input = { "messages": inputs }
    try:
        response = requests.post(
            f"{cloudflare_configs['BASE_CLOUDFLARE_URL']}{model}", 
            headers=cloudflare_configs['headers'], 
            json=input
        )
        res=response.json()
        # print(res)
        if res["success"]:
            return res["result"]["response"] , 1
        
        return res["errors"] , 0
    except Exception as e:
        return str(e) , 0
