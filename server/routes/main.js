const express=require('express');
const {Main,profile,Join}=require('../controller/main');
const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const router=express.Router();

// router.use((req,res,next)=>{
//     res.locals.use=req.user;
    
// })
router.get('/',Main);

// router.get('/profile',isLoggedIn,profile); //마이프로필은 로그인 해야 볼 수 있도록
// router.get('join',isNotLoggedIn,Join); // 회원가입은 로그인 하지 않아야만 보이도록
module.exports=router;