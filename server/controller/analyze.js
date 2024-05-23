const axios=require('axios');
const fs=require('fs');
const TreeDraw=require('../models/treedraw');
const HouseDraw=require('../models/housedraw');
const PersonDraw=require('../models/peopledraw');
const Images=require('../models/images');


exports.analyze=async(req,res,next)=>{
    const images=req.files;
    if(!images){
        return res.status(400).send('이미지가 제공되지 않았습니다');
    }
    try{
        if(images['houseimage']){
            await Images.create({
                filename:images['houseimage'][0]['originalname'],
                imagepath:images['houseimage'][0]['path']
            })
        }
        if(images['treeimage']){
            await Images.create({
                filename:images['treeimage'][0]['originalname'],
                imagepath:images['treeimage'][0]['path']
            })
        }
        if(images['personimage']){
            await Images.create({
                filename:images['personimage'][0]['originalname'],
                imagepath:images['personimage'][0]['path']
            })
        }

    }catch(error){
        console.error(error)
    }
    res.send('api/analyze')
}

exports.treeResultSave=async(req,res,next)=>{
    // console.log('Parsed body:',req.body);
    //console.log(req.user);
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
    let list_string="";
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
            const image_path= await Images.findOne({
                attributes:['imagepath'],
                where:{filename:file_name}
            });
            imagepath=image_path.dataValues['imagepath'];
        }
    }
    try{
        await TreeDraw.create({
            
            user_id:req.user['user'],
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
    res.sendStatus(200)
}


exports.houseResultSave=async(req,res,next)=>{
    const json_data=req.body;
    // console.log(req.user['user'])
    let house_size=0;
    let house_loc=0;
    let house_roof=0;
    let house_wall=0;
    let house_door=0;
    let house_window=0;
    let house_chimney=0;
    let house_smoke=0;
    let house_fence=0;
    let house_road=0;
    let house_pond=0;
    let house_mountain=0;
    let house_tree=0;
    let house_flower=0;
    let house_grass=0;
    let house_sun=0;
    let list=[];
    let imagepath="";
    let list_string="";
    // console.log(json_data);
    for(let i=0;i<json_data.length;i++){
        if(json_data[i]['라벨']=='집전체'){
            if( (json_data[i]['width']*json_data[i]['height'])/640*640>2/3){
                house_size=2
            }
            else if((json_data[i]['width']*json_data[i]['height'])/640*640<1/3){
                house_size=0
            }
            else{
                house_size=1
            }

            if((json_data[i]['center_x']<220&json_data[i]['center_y']<220)){
                house_loc=1
            }
            else if((json_data[i]['center_x']>420&json_data[i]['center_y']<220)){
                house_loc=2
            }
            else if((json_data[i]['center_x']<220&json_data[i]['center_y']>420)){
                house_loc=4
            }
            else if((json_data[i]['center_x']>420&json_data[i]['center_y']>420)){
                house_loc=5
            }
            else{
                house_loc=3
            }
            list.push(json_data[i]['top_left_x'])
            list.push(json_data[i]['top_left_y'])
            list.push(json_data[i]['width'])
            list.push(json_data[i]['height'])
            list_string=String(list)
        }
        else if(json_data[i]['라벨']=='지붕'){
            house_roof=1
        } 
        else if(json_data[i]['라벨']=='집벽'){
            house_wall=1
        }
        else if(json_data[i]['라벨']=='문'){
            house_door=1
        }
        else if(json_data[i]['라벨']=='창문'){
            house_window=1
        }
        else if(json_data[i]['라벨']=='굴뚝'){
            house_chimney=1
        }
        else if(json_data[i]['라벨']=='연기'){
            house_smoke=1
        }
        else if(json_data[i]['라벨']=='울타리'){
            house_fence=1
        }
        else if(json_data[i]['라벨']=='길'){
            house_road=1
        }
        else if(json_data[i]['라벨']=='연못'){
            house_pond=1
        }
        else if(json_data[i]['라벨']=='산'){
            house_mountain=1
        }
        else if(json_data[i]['라벨']=='나무'){
            house_tree=1
        }
        else if(json_data[i]['라벨']=='꽃'){
            house_flower=1
        }
        else if(json_data[i]['라벨']=='잔디'){
            house_grass=1
        }
        else if(json_data[i]['라벨']=='태양'){
            house_sun=1
        }
        else{
            file_name=json_data[i]['라벨'];
            const image_path= await Images.findOne({
                attributes:['imagepath'],
                where:{filename:file_name}
            });
            imagepath=image_path.dataValues['imagepath'];
        }
    }
    try{
        await HouseDraw.create({
            
            user_id:req.user['user'],
            house:list_string,
            house_size:house_size,
            house_loc:house_loc,
            house_roof:house_roof,
            house_wall:house_wall,
            house_door:house_door,
            house_window:house_window,
            house_chimney:house_chimney,
            house_smoke:house_smoke,
            house_fence:house_fence,
            house_road:house_road,
            house_pond:house_pond,
            house_mountain:house_mountain,
            house_tree:house_tree,
            house_flower:house_flower,
            house_grass:house_grass,
            house_sun:house_sun,
            house_image:imagepath,
        })
    }catch(err){
        console.error(err)
    }
    res.sendStatus(200)
}
exports.personResultSave=async(req,res,next)=>{
    const json_data=req.body;
    let person_size=0;
    let person_head=0;
    let person_face=0;
    let person_eye=0;
    let person_nose=0;
    let person_mouse=0;
    let person_ear=0;
    let person_hair=0;
    let person_neck=0;
    let person_body=0;
    let person_arm=0;
    let person_hand=0;
    let person_leg=0;
    let person_foot=0;
    let person_button=0;
    let person_pocket=0;
    let person_runshoes=0;
    let person_shoes=0;
    let list=[];
    let imagepath="";
    let list_string="";
    // console.log(json_data);
    for(let i=0;i<json_data.length;i++){
        if(json_data[i]['라벨']=='사람전체'){
            if( (json_data[i]['width']*json_data[i]['height'])/640*640>2/3){
                person_size=2
            }
            else if((json_data[i]['width']*json_data[i]['height'])/640*640<1/3){
                person_size=0
            }
            else{
                person_size=1
            }

            // if((json_data[i]['center_x']<220&json_data[i]['center_y']<220)){
            //     house_loc=1
            // }
            // else if((json_data[i]['center_x']>420&json_data[i]['center_y']<220)){
            //     house_loc=2
            // }
            // else if((json_data[i]['center_x']<220&json_data[i]['center_y']>420)){
            //     house_loc=4
            // }
            // else if((json_data[i]['center_x']>420&json_data[i]['center_y']>420)){
            //     house_loc=5
            // }
            // else{
            //     house_loc=3
            // }
            list.push(json_data[i]['top_left_x'])
            list.push(json_data[i]['top_left_y'])
            list.push(json_data[i]['width'])
            list.push(json_data[i]['height'])
            list_string=String(list)
        }
        else if(json_data[i]['라벨']=='머리'){
            person_head=1
        } 
        else if(json_data[i]['라벨']=='얼굴'){
            person_face=1
        }
        else if(json_data[i]['라벨']=='눈'){
            person_eye=1
        }
        else if(json_data[i]['라벨']=='코'){
            person_nose=1
        }
        else if(json_data[i]['라벨']=='입'){
            person_mouse=1
        }
        else if(json_data[i]['라벨']=='귀'){
            person_ear=1
        }
        else if(json_data[i]['라벨']=='머리카락'){
            person_hair=1
        }
        else if(json_data[i]['라벨']=='목'){
            person_neck=1
        }
        else if(json_data[i]['라벨']=='상체'){
            person_body=1
        }
        else if(json_data[i]['라벨']=='팔'){
            person_arm=1
        }
        else if(json_data[i]['라벨']=='손'){
            person_hand=1
        }
        else if(json_data[i]['라벨']=='다리'){
            person_leg=1
        }
        else if(json_data[i]['라벨']=='발'){
            person_foot=1
        }
        else if(json_data[i]['라벨']=='단추'){
            person_button=1
        }
        else if(json_data[i]['라벨']=='주머니'){
            person_pocket=1
        }
        else if(json_data[i]['라벨']=='운동화'){
            person_runshoes=1
        }
        else if(json_data[i]['라벨']=='여자구두' | json_data[i]['라벨']=='남자구두'){
            person_shoes=1
        }
        else{
            file_name=json_data[i]['라벨'];
            const image_path= await Images.findOne({
                attributes:['imagepath'],
                where:{filename:file_name}
            });
            imagepath=image_path.dataValues['imagepath'];
        }
    }
    try{
        await PersonDraw.create({
            
            user_id:req.user['user'],
            people:list_string,
            people_size:person_size,
            people_head:person_head,
            people_face:person_face,
            people_eye:person_eye,
            people_nose:person_nose,
            people_mouse:person_mouse,
            people_ear:person_ear,
            people_hair:person_hair,
            people_neck:person_neck,
            people_body:person_body,
            people_arm:person_arm,
            people_hand:person_hand,
            people_leg:person_leg,
            people_foot:person_foot,
            people_button:person_button,
            people_pocket:person_pocket,
            people_runshoes:person_runshoes,
            people_shoes:person_shoes,
            people_image:imagepath,
        })
    }catch(err){
        console.error(err)
    }
    res.sendStatus(200)
}