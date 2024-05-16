const axios=require('axios');
const fs=require('fs');
const TreeDraw=require('../models/treedraw');
const Images=require('../models/images');
const { Console } = require('console');
exports.tree=async(req,res,next)=>{
    const image=req.file;
    if(!image){
        return res.status(400).send('이미지가 제공되지 않았습니다');
    }
    try{
        await Images.create({
            filename:req.body['filename'],
            imagepath:image.path
        })
    }catch(error){
        console.error(error)
    }

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
    res.send('api/tree')
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








exports.house=(req,res,next)=>{

    console.log('req house');
    res.send('res house');
}

exports.person=(req,res,next)=>{

    console.log('req person');
    res.send('res person');
}

exports.saveResult=(req,res,next)=>{
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
    let imagepath="";
    // console.log(json_data);
    for(let i=0;i<json_data.length;i++){
        if(json_data[i]['라벨']=='나무전체'){

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
            Images.findOne({where:{filename:json_data[i]['라벨']}
            }).then((filepath)=>{
                
                console.log(filepath.dataValues.imagepath);
            });
            
        }
        // const tree=TreeDraw.create({
        //     tree:'test',
        //     tree_size:'size_test',
        //     tree_loc:'loc_test',
        //     tree_pillar:tree_pillar,
        //     tree_crown:tree_crown,
        //     tree_branch:tree_branch,
        //     tree_root:tree_root,
        //     tree_leaf:tree_leaf,
        //     tree_flower:tree_flower,
        //     tree_fruit:tree_fruit,
        //     tree_swing:tree_swing,
        //     tree_bird:tree_bird,
        //     tree_cloud:tree_cloud,
        //     tree_moon:tree_moon,
        //     tree_star,tree_star
        //     tree
        // })
    }


}
