const bcrypt=require('bcrypt');
const passport=require('passport');
const User=require('../models/user');
const jwt=require('jsonwebtoken')
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

exports.login=async(req,res,next)=>{
    const userform=req.body
    const email=userform['email']
    const password=userform['password']
    const SECRET_KEY=process.env.COOKIE_SECRET
    try{
        const user=await User.findOne(
            {where:{email:email}}
        );
        if(!user){
            console.log('not id')
            return res.send(402)
        }
        bcrypt.compare(password,user.dataValues['password'],(err,result)=>{
            if(err){
                return res.send(402)
            }
                if(result){
                    const token=jwt.sign({user:user.dataValues['user_id']},SECRET_KEY,{expiresIn:'1h'});
                    return res.json({token})
                }else{
                    console.log('password not match')
                    return res.send(402)
                }
            }
                )
            }catch(error){
            console.error(error)
        }
    }
    

exports.logout=(req,res)=>{
    req.logout(()=>{
        res.send('logout');
    });
};