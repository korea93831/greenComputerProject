const express=require('express');

const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const {join,login,logout}=require('../controller/auth');
const router=express.Router();

router.post('/register',isNotLoggedIn,join);
router.post('/login',login);
router.get('/logout',isLoggedIn,logout);

module.exports=router;