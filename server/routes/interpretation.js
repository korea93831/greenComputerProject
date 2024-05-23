const express=require('express');
const {interpretationTree,interpretationHouse,interpretationPerson,resultsave}=require('../controller/interpretation.js');
// const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const router=express.Router();
const {authenticateToken}=require('../middlewares/index.js')

// router.use((req,res,next)=>{
//     res.locals.use=req.user;
    
// })
router.post('/tree',authenticateToken,interpretationTree);
router.post('/house',authenticateToken,interpretationHouse);
router.post('/person',authenticateToken,interpretationPerson);
router.post('/resultsave',resultsave);
module.exports=router;