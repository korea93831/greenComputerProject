const { Result } = require("../models");
exports.Main=(req,res,next)=>{
    console.log('req Home');
    res.send('res Home');
}

exports.Mypage= async(req,res,next)=>{
    // user_id=req.user['user'];
    user_id=2
    Mydata=await Result.findAll({
        attributes:["image_url",'label','keyword','text'],
        where:{
        user_id:user_id
    }})
    console.log(Mydata)
}