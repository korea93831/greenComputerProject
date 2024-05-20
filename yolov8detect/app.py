from flask import Flask,flash,request,jsonify
from ultralytics import YOLO
from flask_cors import CORS
import pandas as pd
import json
import numpy as np
import os
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

def map_to_string(x):
    mapping={0:'나무전체',1:'기둥',2:'수관',3:'가지',4:'뿌리',5:'나뭇잎',6:'꽃',7:'열매',8:'그네',9:'새',10:'다람쥐',11:'구름',12:'달',13:'별'}
    return mapping.get(x,x)

@app.route('/api/tree',methods=['POST'])
def tree():
    try:
        data=request.get_json()
        print(data['images']['tree'])
        image_data=data['image']['tree']
        image_id=data['filename']['tree']
        image_data = base64.b64decode(image_data.split(',')[1])
        image = preprocess_image(image_data)
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
        img_cls['라벨']=img_cls['라벨'].apply(map_to_string)
        df=pd.concat([img_cls,img_xyxy,img_xywh],axis=1)
        new_row=[image_id,0,0,0,0,0,0,0,0]
        df.loc[len(df)]=new_row
        # print(df)
        df_to_json=df.to_json(orient='records',force_ascii=False)
        json_dict=json.loads(df_to_json)
        print(json_dict)
        response=requests.post('http://localhost:3000/analyze/save_result',json=json_dict)
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

# @app.route('api/house',methods=['POST'])
# def house():
#     try:
#         data=request.get_json()
#         image_data=data['image']
#         image_id=data['filename']
#         print(image_id)
#         image_data = base64.b64decode(image_data.split(',')[1])
#         image = preprocess_image(image_data)
#         model=YOLO('custom_house_detect.pt')
#         results=model(image)
#         img_cls=[]
#         img_xyxy=[]
#         img_xywh=[]
#         for result in results:
#             img_cls=pd.DataFrame(result.boxes.cls)
#             img_xyxy=pd.DataFrame(result.boxes.xyxy)
#             img_xywh=pd.DataFrame(result.boxes.xywh)

#         img_cls.columns=['라벨']
#         img_xyxy.columns=['top_left_x','top_left_y','bottom_right_x','bottom_right_y']
#         img_xywh.columns=['center_x','center_y','width','height']
#         img_cls.astype(int)
#         img_cls['라벨']=img_cls['라벨'].apply(map_to_string)
#         df=pd.concat([img_cls,img_xyxy,img_xywh],axis=1)
#         new_row=[image_id,0,0,0,0,0,0,0,0]
#         df.loc[len(df)]=new_row
#         # print(df)
#         df_to_json=df.to_json(orient='records',force_ascii=False)
#         json_dict=json.loads(df_to_json)
#         print(json_dict)
#         response=requests.post('http://localhost:3000/analyze/save_result',json=json_dict)
#         return jsonify({'result':'200'})

#     except Exception as e:
#         return str(e),500



@app.route('/test',methods=['POST'])
def test():
    if(request.method=="POST"):
        file=request.form['fileName']
        if file:
            print(file)
    return 'hello this is test'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)