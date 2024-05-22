exports.Main=(req,res,next)=>{
    console.log('req Home');
    res.send('res Home');
}

exports.Mypage= async(req,res,next)=>{
    console.log('mypage')
    console.log(req.user)
    
}