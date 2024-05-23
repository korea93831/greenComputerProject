const {Result}=require("../models");


exports.Main=(req,res,next)=>{
    console.log('req Home');
    res.send('res Home');
}
exports.Mypage= async(req,res,next)=>{
    user_id=req.user['user'];
    
    Mydata=await Result.findAll({
        attributes:["image_url",'label','keyword','text'],
        where:{
        user_id:user_id
    }})
    const sendResponse = Mydata.map(data => ({
        imageUrl: data.dataValues['image_url'],
        label: data.dataValues['label'],
        keyword: data.dataValues['keyword'],
        text: data.dataValues['text'],
        imagesrc:''
      }));
  
      // 응답을 클라이언트에 보냅니다.
      res.json(sendResponse);
}