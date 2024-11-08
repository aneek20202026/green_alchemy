from settings import *

@app.route('/',methods=['GET'])
@cross_origin()
def check():
    return "Hello World!"

@app.route('/fetchPlant',methods=['POST'])
@cross_origin()
def fetchPlant():
    data = json.loads(request.data)
    details=PlantProfile.query.filter_by(common_name=data['name']).first()
    main_Det=details.to_dict()
    return jsonify({"data":main_Det})

@app.route('/setBookmark',methods=['POST'])
@cross_origin()
def setBookmark():
    data = json.loads(request.data)
    user, name=data["user"], data["name"]
    details=Bookmark.query.filter_by(user=user).first()
    
    try:
        if details is None:
            new_bookmark = Bookmark(user=user, bookmarks=[name])
            db.session.add(new_bookmark)
        elif name in details.bookmarks:
            return jsonify({"message": "Already bookmarked this plant"}), 200
        else:
            details.bookmarks=details.bookmarks+[name]
        
        db.session.commit()
        return jsonify({"message": f"{name} is now bookmarked"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating bookmark"}), 500

@app.route('/getBookmark', methods=['POST'])
@cross_origin()
def getBookmark():
    data = json.loads(request.data)   
    details = Bookmark.query.filter_by(user=data["user"]).first()
    if details is None:
        return jsonify({"message": None}), 200
    
    return jsonify({"message": details.bookmarks}), 200
 
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = json.loads(request.data)  
    datas = Login_Table.query.filter_by(email=data["email"]).first()
    if datas:
        if datas.password==data["password"]:
            return jsonify({"message":datas.name , "status":1})
        else:
            return jsonify({"message":"Incorrect password" , "status":0})
    return jsonify({"message":f"No user with {data['email']} exist", "status":0})

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = json.loads(request.data)  
    datas = Login_Table.query.filter_by(email=data["email"]).first()
    if datas:
        return jsonify({"message":f"{data['email']} email already exists", "status":0})
    
    new_user = Login_Table(email=data["email"], name=data["name"],password=data["password"])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message":"You are successfully registered.", "status":1})

@app.route('/chatBot',methods=['POST'])
@cross_origin()
def chatBot():
    data = json.loads(request.data)  
    model="@cf/meta/llama-3-8b-instruct"

    message = [
        { 
            "role": "system", 
            "content": """
            You are professional herbalist. Response in technical terms so that a layman can understand.
            Relevant responses should be in paragraphs and others in points.
            Keep your response short.
            Only provide response to questions which are related to plants.
            For other context questions provide your response as: "Sorry, I am a herbalist, I can only answer queries related to botanical world."
            """
        },{ 
            "role": "user", 
            "content": data["text"]
        }
    ]
    output , status = run_cloudflare_model(model, message)
    return jsonify({"message":output,"status":status})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000 , debug=True)
