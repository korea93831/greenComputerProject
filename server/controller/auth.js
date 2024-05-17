const bcrypt=require('bcrypt');
const passport=require('passport');
const User=require('../models/user');

exports.join=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const exUser=await User.findOne({where:{email}});
        if (exUser){
            return res.send('redirect')
        }
        const hash=await bcrypt.hash(password,12);
        await User.create({
            email,
            password:hash
        });
        return res.send('Create')
    }catch(error){
        console.error(error);
        return res.send('error');
    }
};

exports.login=(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.send('None user');
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.send('login');
        });
    })(req,res,next);
};

exports.logout=(req,res)=>{
    req.logout(()=>{
        res.send('logout');
    });
};