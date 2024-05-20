const axios=require('axios');
const fs=require('fs');
const TreeDraw=require('../models/treedraw');
const Images=require('../models/images');
const { Console } = require('console');
const { stringify } = require('querystring');


exports.tree=async(req,res,next)=>{
    const image=req.file;
    if(!image){
        return res.status(400).send('이미지가 제공되지 않았습니다');
    }
    console.log(image)
    try{
        await Images.create({
            filename:req.body['filename'],
            imagepath:image.path
        })
    }catch(error){
        console.error(error)
    }
    res.send('api/analyze')
    //DB에 추가하기
    // try{
    //     console.log(image.filename);
    //     console.log(image.path);
    //     await TreeDraw.create({
    //         tree_image:image.filename,
    //     });
    // }catch (error){
    //     console.error(error);
    //     res.status(500).send('이미지를 저장하지 못했습니다')
    // }


    // const formData=new FormData();
    // sendFile=req.file;
    // formData.append("file",sendFile);
    // formData.append("filename",sendFile.originalname)

    // const result=await axios.post(
    //     'http://127.0.0.1:5000/api/tree',
    //     formData,{
    //         headers:{
    //             'Content-Type': 'multipart/form-data'
    //         },
    //     }
    // );
 
    // formData.append("file",sendfile);
    // const request_config={
    //     method:"post",
    //     url:'http://127.0.0.1:5000/api/tree',
    //     headers:{
    //         "Content-Type":"multipart/form-data"
    //     },
    //     data:formData
    // };
    // try{
    //     const SendFile=await axios.post(request_config)
    //     console.log(SendFile)
    // }catch(err){
    //     console.log(err)
    // }
}

exports.house=async(req,res,next)=>{
    const image=req.file;
    if(!image){
        return res.status(400).send('이미지가 제공되지 않았습니다');
    }
    console.log(image)
    try{
        await Images.create({
            filename:req.body['filename'],
            imagepath:image.path
        })
    }catch(error){
        console.error(error)
    }
    res.send('api/house')
}

exports.person=async(req,res,next)=>{
    const image=req.file;
    if(!image){
        return res.status(400).send('이미지가 제공되지 않았습니다');
    }
    console.log(image)
    try{
        await Images.create({
            filename:req.body['filename'],
            imagepath:image.path
        })
    }catch(error){
        console.error(error)
    }
    res.send('api/person')
}

exports.saveResult=async(req,res,next)=>{
    // console.log('Parsed body:',req.body);
    const json_data=req.body;
    let tree_size=0;
    let tree_loc=0;
    let tree_pillar=0;
    let tree_crown=0;
    let tree_branch=0;
    let tree_root=0;
    let tree_leaf=0;
    let tree_flower=0;
    let tree_fruit=0;
    let tree_swing=0;
    let tree_bird=0;
    let tree_squirrel=0;
    let tree_cloud=0;
    let tree_moon=0;
    let tree_star=0;
    let list=[];
    let imagepath="";
    // console.log(json_data);
    for(let i=0;i<json_data.length;i++){
        if(json_data[i]['라벨']=='나무전체'){
            if( (json_data[i]['width']*json_data[i]['height'])/640*640>2/3){
                tree_size=2
            }
            else if((json_data[i]['width']*json_data[i]['height'])/640*640<1/3){
                tree_size=0
            }
            else{
                tree_size=1
            }

            if((json_data[i]['center_x']<220&json_data[i]['center_y']<220)){
                tree_loc=1
            }
            else if((json_data[i]['center_x']>420&json_data[i]['center_y']<220)){
                tree_loc=2
            }
            else if((json_data[i]['center_x']<220&json_data[i]['center_y']>420)){
                tree_loc=4
            }
            else if((json_data[i]['center_x']>420&json_data[i]['center_y']>420)){
                tree_loc=5
            }
            else{
                tree_loc=3
            }
            list.push(json_data[i]['top_left_x'])
            list.push(json_data[i]['top_left_y'])
            list.push(json_data[i]['width'])
            list.push(json_data[i]['height'])
            list_string=String(list)
        }
        else if(json_data[i]['라벨']=='기둥'){
            tree_pillar=1
        } 
        else if(json_data[i]['라벨']=='수관'){
            tree_crown=1
        }
        else if(json_data[i]['라벨']=='가지'){
            tree_branch=1
        }
        else if(json_data[i]['라벨']=='뿌리'){
            tree_root=1
        }
        else if(json_data[i]['라벨']=='나뭇잎'){
            tree_leaf=1
        }
        else if(json_data[i]['라벨']=='꽃'){
            tree_flower=1
        }
        else if(json_data[i]['라벨']=='열매'){
            tree_fruit=1
        }
        else if(json_data[i]['라벨']=='그네'){
            tree_swing=1
        }
        else if(json_data[i]['라벨']=='새'){
            tree_bird=1
        }
        else if(json_data[i]['라벨']=='다람쥐'){
            tree_squirrel=1
        }
        else if(json_data[i]['라벨']=='구름'){
            tree_cloud=1
        }
        else if(json_data[i]['라벨']=='달'){
            tree_moon=1
        }
        else if(json_data[i]['라벨']=='별'){
            tree_star=1
        }
        else{
            file_name=json_data[i]['라벨'];
            console.log(file_name);
            const image_path= await Images.findOne({
                attributes:['imagepath'],
                where:{filename:file_name}
            });
            imagepath=image_path.dataValues['imagepath'];
            console.log(imagepath)
        }
    }
    try{
        await TreeDraw.create({
            
            user_id:2,
            tree:list_string,
            tree_size:tree_size,
            tree_loc:tree_loc,
            tree_pillar:tree_pillar,
            tree_crown:tree_crown,
            tree_branch:tree_branch,
            tree_root:tree_root,
            tree_leaf:tree_leaf,
            tree_flower:tree_flower,
            tree_fruit:tree_fruit,
            tree_swing:tree_swing,
            tree_bird:tree_bird,
            tree_squirrel:tree_squirrel,
            tree_cloud:tree_cloud,
            tree_moon:tree_moon,
            tree_star:tree_star,
            tree_image:imagepath,
            
        })
    }catch(err){
        console.error(err)
    }
    const data={
        imageurl:imagepath
    }
    // await axios.post('http://localhost:3000/interpretation/tree',data);
    res.sendStatus(200)
}
