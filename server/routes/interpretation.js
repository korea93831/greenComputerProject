const express=require('express');
const {interpretationTree,interpretationHouse,interpretationPerson,resultsave}=require('../controller/interpretation.js');
// const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const router=express.Router();

// router.use((req,res,next)=>{
//     res.locals.use=req.user;
    
// })
router.post('/tree',interpretationTree);
router.post('/house',interpretationHouse);
router.post('/person',interpretationPerson);
router.post('/resultsave',resultsave);
module.exports=router;