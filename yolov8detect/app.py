from flask import Flask,request,jsonify
from ultralytics import YOLO
import pandas as pd
import json
import numpy as np

app=Flask(__name__)

@app.route('/api/tree',methods=['POST'])
def tree():
    model=YOLO('custom_tree_deteact.pt')
    source=request.files['file']
    upload_path='./image/'+request.form['fileName']
    source.save(upload_path)
    img=upload_path
    results=model(img)
    img_cls=[]
    img_xyxy=[]
    img_xywh=[]
    def map_to_string(x):
        mapping={0:'나무전체',1:'기둥',2:'수관',3:'가지',4:'뿌리',5:'나뭇잎',6:'꽃',7:'열매',8:'그네',9:'새',10:'다람쥐',11:'구름',12:'달',13:'별'}
        return mapping.get(x,x)
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
    print(df)
    return 'succes'

@app.route('/test',methods=['POST'])
def test():
    if(request.method=="POST"):
        file=request.form['fileName']
        if file:
            print(file)
    return 'hello this is test'