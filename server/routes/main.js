const express=require('express');
const {Main,profile,Join}=require('../controller/main');
const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const router=express.Router();

router.use((req,res,next)=>{
    res.locals.use=req.user;
    
})
router.get('/',Main);
router.get('/profile',isLoggedIn,profile);
router.get('join',isNotLoggedIn,Join);
module.exports=router;