exports.Main=(req,res,next)=>{
    console.log('req Home');
    res.send('res Home');
}

// exports.Mypage= async(req,res,next)=>{
//     const userID=req.body
//     console.log(userID)
//     const user=  USER.findOne({
//         attributes:['user_id'],
//         where:{email:userID}
//     });
//     user_id=user.dataValues['user_id']
// }