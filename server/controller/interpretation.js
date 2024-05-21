const TreeAnalyze=require('../models/treeanalyze');
const TreeDraw=require('../models/treedraw');
const Image=require('../models/images')
const { Op } = require('sequelize');
const HouseDraw = require('../models/housedraw');
const HouseAnalyze=require('../models/houseanalyze');
const PersonDraw=require('../models/peopledraw');
const PersonAnalyze=require('../models/peopleanalyze');


exports.interpretationHouse= async(req,res,next)=>{
    console.log('interpretationHouse')
    const filename=req.body['house_url']
    let imageurl='';
    try{
        const image_path=await Image.findOne({
            attributes:['imagepath'],
            where:{filename:filename}
        })
        console.log(image_path.dataValues['imagepath'])
        imageurl=image_path.dataValues['imagepath'].slice(8,26)
        console.log('이미지'+imageurl)
    }
    catch(error){
        console.error(error)
    }
    try{
        const house=await HouseDraw.findOne({ 
            attributes:['user_id','house','house_size','house_loc','house_roof','house_wall',
                        'house_door','house_window','house_chimney','house_smoke','house_fence',
                        'house_road','house_pond','house_mountain','house_tree','house_flower',
                        'house_grass','house_sun',,'createdAt','house_image'],
            where:{house_image:{
                [Op.like]:`%${imageurl}%`
            }}
        })
        
            if (!house) {
                console.error('House not found!'); 
            }
            else{
                let result1 = 0, result2 = 0, result3 = 0, result4 = 0, result5 = 0,
                result6 = 0, result7 = 0, result8 = 0, result9 = 0, result10 = 0;
                // console.log(tree.dataValues)
                if (house.dataValues['house_roof'] == 1) {
                    result1 += 1;
                }
                if (house.dataValues['house_roof'] == 0) {
                    result5 += 1;
                    result10 += 1;
                }
                if (house.dataValues['house_wall'] == 1) {
                    result1 += 1;
                    result8 += 1;
                }
                if (house.dataValues['house_wall'] == 0) {
                    result3 += 1;
                    result4 += 1;
                    result9 += 1;
                }
                if (house.dataValues['house_door'] == 1) {
                    result2 += 1;
                    result3 += 1;
                    result4 += 1;
                    result5 += 1;
                    result9 +=1;
                }
                if (house.dataValues['house_door'] == 0) {
                    result1 += 1;
                    result4 += 1;
                    result10 +=1;
                }
                if (house.dataValues['house_window'] == 1) {
                    result2 += 1;
                    result3 += 1;
                    result6 += 1;
                    result9 += 1;
                }
                if (house.dataValues['house_window'] == 0) {
                    result5 +=1;
                    result10 +=1;
                }
                if (house.dataValues['house_chimney'] == 1) {
                    result1 += 1;
                }
                if (house.dataValues['house_chimney'] == 0) {
                    result4 += 1;
                }
                if (house.dataValues['house_smoke'] == 1) {
                    result5 += 1;
                    result7 += 1;
                    result9 += 1;
                }
                if (house.dataValues['house_smoke']==0) {
                    result8 += 1;
                }
                if (house.dataValues['house_fence']==1) {
                    result1+=1;
                    result5+=1;
                    result8+=1;
                    result10+=1;
                }
                if (house.dataValues['house_fence'] == 0) {
                    result3 += 1;
                    result4 += 1;
                    result9 += 1;
                }
                if (house.dataValues['house_road'] == 1) {
                    result2 += 1;
                    result3 += 1;
                    result4 += 1;
                    result9 += 1;
                }
                if (house.dataValues['house_road']==0) {
                    result10 +=1;
                }
                if (house.dataValues['house_pond']==1) {
                    result2 +=1;
                    result8 +=1;
                }
                if (house.dataValues['house_pond']==0) {
                    result5+=1;
                }
                if (house.dataValues['house_mountain']==1) {
                    result2+=1;
                    result4+=1;
                    result6+=1;
                }
                if (house.dataValues['house_mountain']==0) {
                    result1 += 1;
                }
                if (house.dataValues['house_tree'] == 1) {
                    result1 += 1;
                    result3 += 1;
                    result4 += 1;
                }
                if (house.dataValues['house_tree']==0) {
                    result5 += 1;
                    result10 += 1;
                }
                if (house.dataValues['house_flower'] == 1) {
                    result4 +=1;
                    result6+=1;
                }
                if (house.dataValues['house_flower'] == 0) {
                    result5 += 1;
                    result7 += 1;
                    result10 += 1;
                }
                if (house.dataValues['house_grass']==1) {
                    result1 +=1;
                    result4 +=1;
                    result6 +=1;
                }
                if (house.dataValues['house_grass'] == 0) {
                    result5 +=1;
                    result7 +=1;
                }
                if (house.dataValues['house_sun'] == 1) {
                    result4 +=1;
                    result6 +=1;
                    result8 +=1;
                }
                if (house.dataValues['house_sun'] == 0) {
                    result7 +=1;
                    result10 +=1;
                }
                if (house.dataValues['house_size']==3){
                    result1 +=3;
                }
                if(house.dataValues['house_loc']==1){
                    result6 +=3;
                }
                if(house.dataValues['house_loc']==2){
                    result6 +=3;
                }
                if(house.dataValues['house_loc']==3){
                    result1+=3;
                }
                if(house.dataValues['house_loc']==4){
                    result5+=3;
                }
                if(house.dataValues['house_loc']==5){
                    result5 +=3;
                }
                const topResults = [result1, result2, result3, result4, result5, 
                    result6, result7, result8, result9, result10]
                    .map((value, index) => ({value, index}))
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3);
                // console.log(topResults)
                const topInterpretations=await Promise.all(
                    topResults.map(result=>
                        HouseAnalyze.findOne({
                            where:{analysis_tree_id:result.index+1}
                        })
                    )
                );
                const response = topInterpretations.map(interpretation => ({
                    keyword: interpretation.keyword,
                    analysis: interpretation.analysis_tree
                }));
                // console.log(response)
                res.json(response)
                }
            }catch(error){
                console.error(error)
            }
}        


exports.interpretationTree=async(req,res,next)=>{
    console.log('interpretationTree')
    const filename=req.body['tree_url']
    // console.log(filename)
    let imageurl='';
    try{
        const image_path=await Image.findOne({
            attributes:['imagepath'],
            where:{filename:filename}
        })
        // console.log(image_path.dataValues['imagepath'])
        imageurl=image_path.dataValues['imagepath'].slice(8,26)
        console.log(imageurl)
    }
    catch(error){
        console.error(error)
    }
    try{
        const tree=await TreeDraw.findOne({ 
            attributes:['user_id','tree','tree_size','tree_loc','tree_pillar','tree_crown',
                        'tree_branch','tree_root','tree_leaf','tree_flower','tree_fruit',
                        'tree_swing','tree_bird','tree_squirrel','tree_cloud','tree_moon',
                        'tree_star','createdAt','tree_image'],
            where:{tree_image:{
                [Op.like]:`%${imageurl}%`
            }}
        })
        
            if (!tree) {
                console.error('Tree not found!'); 
            }
            else{
                let result1 = 0, result2 = 0, result3 = 0, result4 = 0, result5 = 0,
                result6 = 0, result7 = 0, result8 = 0, result9 = 0, result10 = 0;
                console.log(tree.dataValues)
                if (tree.dataValues['tree_pillar'] == 1) {
                    result1 += 1;
                    result2 += 1;
                }
                if (tree.dataValues['tree_pillar'] == 0) {
                    result3 += 1;
                    result6 += 1;
                }
                if (tree.dataValues['tree_crown'] == 1) {
                    result1 += 1;
                    result2 += 1;
                    result5 += 1;
                }
                if (tree.dataValues['tree_crown'] == 0) {
                    result3 += 1;
                    result6 += 1;
                    result10 += 1;
                }
                if (tree.dataValues['tree_branch'] == 1) {
                    result1 += 1;
                    result5 += 1;
                }
                if (tree.dataValues['tree_branch'] == 0) {
                    result6 += 1;
                    result10 += 1;
                }
                if (tree.dataValues['tree_root'] == 1) {
                    result2 += 1;
                    result5 += 1;
                }
                if (tree.dataValues['tree_root'] == 0) {
                    result3 += 1;
                    result6 += 1;
                    result10 += 1;
                }
                if (tree.dataValues['tree_leaf'] == 1) {
                    result1 += 1;
                    result5 += 1;
                    result7 += 1;
                    result8 += 1;
                }
                if (tree.dataValues['tree_leaf'] == 0) {
                    result9 += 1;
                    result10 += 1;
                }
                if (tree.dataValues['tree_flower'] == 1) {
                    result1 += 1;
                    result4 += 1;
                    result5 += 1;
                }
                if (tree.dataValues['tree_flower'] == 0) {
                    result6 += 1;
                    result9 += 1;
                    result10 += 1;
                }
                if (tree.dataValues['tree_fruit'] == 1) {
                    result1 += 1;
                    result4 += 1;
                }
                if (tree.dataValues['tree_fruit'] == 0) {
                    result3 += 1;
                    result6 += 1;
                    result9 += 1;
                }
                if (tree.dataValues['tree_swing'] == 1) {
                    result1 += 1;
                    result5 += 1;
                    result8 += 1;
                }
                if (tree.dataValues['tree_bird'] == 1) {
                    result1 += 1;
                    result4 += 1;
                    result7 += 1;
                    result8 += 1;
                }
                if (tree.dataValues['tree_squirrel'] == 1) {
                    result5 += 1;
                    result8 += 1;
                }
                if (tree.dataValues['tree_cloud'] == 1) {
                    result1 += 1;
                    result3 += 1;
                    result7 += 1;
                }
                if (tree.dataValues['tree_moon'] == 1) {
                    result1 += 1;
                    result4 += 1;
                }
                if (tree.dataValues['tree_star'] == 1) {
                    result1 += 1;
                    result4 += 1;
                }
                if (tree.dataValues['tree_size'] == 1) {
                    result3 += 3;
                    result6 += 3;
                }
                if (tree.dataValues['tree_size'] == 2) {
                    result4 += 3;
                }
                if (tree.dataValues['tree_size'] == 3) {
                    result1 += 3;
                    result5 += 3;
                }
                if (tree.dataValues['tree_loc'] == 1) {
                    result3 += 3;
                }
                if (tree.dataValues['tree_loc'] == 2) {
                    result4 += 3;
                }
                if (tree.dataValues['tree_loc'] == 3) {
                    result2 += 3;
                }
                if (tree.dataValues['tree_loc'] == 4) {
                    result3 += 3;
                }
                if (tree.dataValues['tree_loc'] == 5) {
                    result9 += 3;
                }
                const topResults = [result1, result2, result3, result4, result5, 
                    result6, result7, result8, result9, result10]
                    .map((value, index) => ({value, index}))
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3);
                // console.log(topResults)
                const topInterpretations=await Promise.all(
                    topResults.map(result=>
                        TreeAnalyze.findOne({
                            where:{analysis_tree_id:result.index+1}
                        })
                    )
                );
                const response = topInterpretations.map(interpretation => ({
                    keyword: interpretation.keyword,
                    analysis: interpretation.analysis_tree
                }));
                // console.log(response)
                res.json(response)
                }
            }catch(error){
                console.error(error)
            }
}
exports.interpretationPerson=async(req,res,next)=>{
    console.log('interpretationPeople')
    const filename=req.body['person_url']
    // console.log(filename)
    let imageurl='';
    try{
        const image_path=await Image.findOne({
            attributes:['imagepath'],
            where:{filename:filename}
        })
        console.log(image_path.dataValues['imagepath'])
        imageurl=image_path.dataValues['imagepath'].slice(8,26)
        console.log(imageurl)
    }
    catch(error){
        console.error(error)
    }
    try{
        const person=await PersonDraw.findOne({ 
            attributes:['user_id','people','sex','people_size','people_size','people_head','people_face',
                        'people_eye','people_nose','people_mouse','people_ear','people_hair',
                        'people_neck','people_body','people_arm','people_hand','people_leg',
                        'people_foot','people_button','people_pocket','people_runshoes','people_shoes','createdAt','people_image'],
            where:{people_image:{
                [Op.like]:`%${imageurl}%`
            }}
        })
        
            if (!person) {
                console.error('People not found!'); 
            }
            else{
                let result1 = 0, result2 = 0, result3 = 0, result4 = 0, result5 = 0,
                result6 = 0, result7 = 0, result8 = 0;
                console.log(tree.dataValues)
                if (person.dataValues['sex']=='M') {
                    result1 += 3;
                }
                if (person.dataValues['sex'] == 'F') {
                    result2+=3;
                }
                if (person.dataValues['people_size'] == 1) {
                    result4 +=3;
                }
                if (person.dataValues['people_size'] == 2) {
                    result2 +=3;
                }
                if (person.dataValues['people_size'] == 3) {
                    result1 +=3;
                }
                if (person.dataValues['people_head'] == 0) {
                    result4 +=1;
                }
                if (person.dataValues['people_face'] == 0) {
                    result5 += 1;
                    result6 += 1;
                }
                if (person.dataValues['people_eye'] == 0) {
                    result5 +=1;
                    result6 +=1;
                }
                if (person.dataValues['people_nose'] == 0) {
                    result6 +=1;
                }
                if (person.dataValues['people_mouse'] == 0) {
                    result5 +=1;
                    result7 +=1;
                    result8 +=1;
                }
                if (person.dataValues['people_ear'] == 0) {
                    result6 +=1;
                }
                if (person.dataValues['people_hair'] == 0) {
                    result6 +=1;
                }
                if (person.dataValues['people_neck'] == 0) {
                    result8 +=1;
                }
                if (person.dataValues['people_body'] == 0) {
                    result6 +=1;
                }
                if (person.dataValues['people_arm'] == 0) {
                    result3 +=1;
                    result5 +=1;
                    result6 +=1;
                    result8 +=1;
                }
                if (person.dataValues['people_hand'] == 0) {
                    result5 +=1;
                    result6 +=1;
                }
                if (person.dataValues['people_leg'] == 0) {
                    result8 += 1;
                }
                if (person.dataValues['people_foot'] == 0) {
                    result6 += 1;
                    result7 += 1;
                }
                if (person.dataValues['people_button'] == 1) {
                    result4 += 1;
                    result7 += 1;
                }
                if (person.dataValues['people_pocket'] == 1) {
                    result7 +=1;
                }
                if (person.dataValues['people_runshoes'] == 1) {
                    result3 +=1;
                }
                if (person.dataValues['people_shoes'] == 1) {
                    result1 +=1;
                    reuslt3 +=1;
                }
                const topResults = [result1, result2, result3, result4, result5, 
                    result6, result7, result8]
                    .map((value, index) => ({value, index}))
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3);
                console.log(topResults)
                const topInterpretations=await Promise.all(
                    topResults.map(result=>
                        PersonAnalyze.findOne({
                            where:{analysis_tree_id:result.index+1}
                        })
                    )
                );
                const response = topInterpretations.map(interpretation => ({
                    keyword: interpretation.keyword,
                    analysis: interpretation.analysis_tree
                }));
                // console.log(response)
                res.json(response)
                }
            }catch(error){
                console.error(error)
            }
}