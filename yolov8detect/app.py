from flask import Flask,request,jsonify
from ultralytics import YOLO
from flask_cors import CORS
import pandas as pd
import json
import numpy as np
import base64
from PIL import Image
import io
import requests

app=Flask(__name__)
CORS(app)
UPLOAD_FOLDER='/uploads'
# ALLOWED_EXTENSIONS={'jpg','png','jpeg','gif'}
app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER

def preprocess_image(image_data):
    image = Image.open(io.BytesIO(image_data)).convert('RGB')
    image = np.array(image)
    return image

def tree_map_to_string(x):
    mapping={0:'나무전체',1:'기둥',2:'수관',3:'가지',4:'뿌리',5:'나뭇잎',6:'꽃',7:'열매',8:'그네',9:'새',10:'다람쥐',11:'구름',12:'달',13:'별'}
    return mapping.get(x,x)
def house_map_to_string(x):
    mapping={0:'집전체',1:'지붕',2:'집벽',3:'문',4:'창문',5:'굴뚝',6:'연기',7:'울타리',8:'길',9:'연못',10:'산',11:'나무',12:'꽃',13:'잔디',14:'태양'}
    return mapping.get(x,x)
def person_map_to_string(x):
    mapping={0:'사람전체',1:'머리',2:'얼굴',3:'눈',4:'코',5:'입',6:'귀',7:'머리카락',8:'목',9:'상체',10:'팔',11:'손',12:'다리',13:'발',14:'단추',15:'주머니',16:'운동화',17:'여자구두',18:'남자구두'}
    return mapping.get(x,x)

@app.route('/api/tree',methods=['POST'])
def tree():
    try:
        token=request.headers['authorization']
        data=request.get_json()
        image_data=data['image']
        image_id=data['filename']
        image_data = base64.b64decode(image_data.split(',')[1])
        image = preprocess_image(image_data)
        # print(image)
        model=YOLO('custom_tree_deteact.pt')
        results=model(image)
        img_cls=[]
        img_xyxy=[]
        img_xywh=[]
        for result in results:
            img_cls=pd.DataFrame(result.boxes.cls)
            img_xyxy=pd.DataFrame(result.boxes.xyxy)
            img_xywh=pd.DataFrame(result.boxes.xywh)

        
        img_cls.columns=['라벨']
        img_xyxy.columns=['top_left_x','top_left_y','bottom_right_x','bottom_right_y']
        img_xywh.columns=['center_x','center_y','width','height']
        img_cls.astype(int)
        img_cls['라벨']=img_cls['라벨'].apply(tree_map_to_string)
        df=pd.DataFrame()
        df=pd.concat([img_cls,img_xyxy,img_xywh],axis=1)
        new_row=[image_id,0,0,0,0,0,0,0,0]
        new_row[1]=token
        df_to_json=df.to_json(orient='records',force_ascii=False)
        json_dict=json.loads(df_to_json)
        print(json_dict)
        response=requests.post('http://localhost:3000/analyze/tree',json=json_dict)
        return jsonify({'result':'200'})
    except Exception as e:
        return str(e),500
    

    # try:
    #     if request.method=='POST':
    #         data=request.get_json()
    #         image_path='./uploads/'
    #         image_data=data['file']
    #         image_data=base64.b64decode(image_data.split(',')[1])
    #         print(image_data)
    #         image_data.save(app.config['UPLOAD_FOLDER']+secure_filename())

    # except Exception as err:{
    #     print(err)
    # }
    
   
    return 'succes'

@app.route('/api/house',methods=['POST'])
def house():
    try:
        token=request.headers['authorization']
        data=request.get_json()
        image_data=data['image']
        image_id=data['filename']
        image_data = base64.b64decode(image_data.split(',')[1])
        image = preprocess_image(image_data)
        # print(image)
        model=YOLO('custom_house_detect.pt')
        results=model(image)
        img_cls=[]
        img_xyxy=[]
        img_xywh=[]
        for result in results:
            img_cls=pd.DataFrame(result.boxes.cls)
            img_xyxy=pd.DataFrame(result.boxes.xyxy)
            img_xywh=pd.DataFrame(result.boxes.xywh)

        
        img_cls.columns=['라벨']
        img_xyxy.columns=['top_left_x','top_left_y','bottom_right_x','bottom_right_y']
        img_xywh.columns=['center_x','center_y','width','height']
        img_cls.astype(int)
        df=pd.DataFrame()
        img_cls['라벨']=img_cls['라벨'].apply(house_map_to_string)
        df=pd.concat([img_cls,img_xyxy,img_xywh],axis=1)
        new_row=[image_id,0,0,0,0,0,0,0,0]
        new_row[1]=token
        df.loc[len(df)]=new_row
        df_to_json=df.to_json(orient='records',force_ascii=False)
        json_dict=json.loads(df_to_json)
        print(json_dict)
        response=requests.post('http://localhost:3000/analyze/house',json=json_dict)
        return jsonify({'result':'200'})
    except Exception as e:
        return str(e),500
    
@app.route('/api/person',methods=['POST'])
def person():
    try:
        token=request.headers['authorization']
        data=request.get_json()
        image_data=data['image']
        image_id=data['filename']
        gender=data['gender']
        image_data = base64.b64decode(image_data.split(',')[1])
        image = preprocess_image(image_data)
        # print(image)
        model=YOLO('custom_people_detect.pt')
        results=model(image)
        img_cls=[]
        img_xyxy=[]
        img_xywh=[]
        for result in results:
            img_cls=pd.DataFrame(result.boxes.cls)
            img_xyxy=pd.DataFrame(result.boxes.xyxy)
            img_xywh=pd.DataFrame(result.boxes.xywh)

        
        img_cls.columns=['라벨']
        img_xyxy.columns=['top_left_x','top_left_y','bottom_right_x','bottom_right_y']
        img_xywh.columns=['center_x','center_y','width','height']
        img_cls.astype(int)
        df=pd.DataFrame()
        img_cls['라벨']=img_cls['라벨'].apply(person_map_to_string)
        df=pd.concat([img_cls,img_xyxy,img_xywh],axis=1)
        new_row=[image_id,0,0,0,0,0,0,0,0]
        new_row[1]=token
        new_row[2]=gender
        df.loc[len(df)]=new_row
        df_to_json=df.to_json(orient='records',force_ascii=False)
        json_dict=json.loads(df_to_json)
        print(json_dict)
        response=requests.post('http://localhost:3000/analyze/person',json=json_dict)
        return jsonify({'result':'200'})
    except Exception as e:
        return str(e),500


@app.route('/test',methods=['POST'])
def test():
    if(request.method=="POST"):
        file=request.form['fileName']
        if file:
            print(file)
    return 'hello this is test'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)