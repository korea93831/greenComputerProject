const bcrypt=require('bcrypt');
const passport=require('passport');
const User=require('../models/user');

exports.join=async(req,res,next)=>{
    const {email,password}=req.body;
    console.log(email,password)
    try{
        const exUser=await User.findOne({where:{email}});
        if (exUser){
            return res.status(409).send('Duplicate email');
        }
        const hash=await bcrypt.hash(password,12);
        await User.create({
            email,
            password:hash
        });
        return res.send('Create')
    }catch(error){
        console.error(error);
        return res.status(500).send('Server error');
    }
};

exports.login=(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.status(401).json({ success: false, message: '로그인에 실패하였습니다.'});
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json({ success: true, message: '로그인에 성공하였습니다.', user });
        });
    })(req,res,next);
};

exports.logout=(req,res)=>{
    req.logout(()=>{
        res.send('logout');
    });
};