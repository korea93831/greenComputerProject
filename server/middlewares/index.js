const jwt=require('jsonwebtoken')

exports.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인이 필요합니다');
    }
};
exports.isNotLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message=encodeURIComponent('로그인한 상태입니다');
        ResizeObserver.REDIRECT(`/?ERROR=${message}`);
    }
};

const SECRET_KEY=process.env.COOKIE_SECRET

exports.authenticateToken=async(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user})
        next();
}

exports.authenticateToken2=(req,res,next)=>{
    const authtoken = req.body[req.body.length-1]['top_left_x'];
    console.log(authtoken)
    const token = authtoken && authtoken.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user})
        next();
}