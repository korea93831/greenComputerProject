const TreeAnalyze=require('../models/treeanalyze');
const TreeDraw=require('../models/treedraw');
const Image=require('../models/images')
const { Op } = require('sequelize');
exports.interpretationTree= async(req,res,next)=>{
    console.log('interpretationTree')
    const filename=req.body['imageurl']
    console.log(filename)
    let imageurl='';
    try{
        const image_path=await Image.findOne({
            attributes:['imagepath'],
            where:{filename:filename}
        })
        console.log(image_path.dataValues['imagepath'])
        imageurl=image_path.dataValues['imagepath'].slice(8,26)
    }
    catch(error){
        console.error(error)
    }
    try{
        const tree=await TreeDraw.findOne({ 
            attributes:['user_id','tree','tree_size','tree_loc','tree_pillar','tree_crown',
                        'tree_branch','tree_root','tree_leaf','tree_flower','tree_fruit',
                        'tree_swing','tree_bird','tree_squirrel','tree_cloud','tree_moon',
                        'tree_star','redate','tree_image'],
            where:{tree_image:{
                [Op.like]:`%${imageurl}%`
            }}
        })
        console.log(imageurl)
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
                console.log(topResults)
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
                console.log(response)
                res.json(response)
                }
            }catch(error){
                console.error(error)
            }
}        


exports.interpretationHouse=(req,res,next)=>{

}
exports.interpretationPeople=(req,res,next)=>{

}