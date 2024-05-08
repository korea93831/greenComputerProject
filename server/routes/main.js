const express=require('express');
const {Main}=require('../controller/main');
const router=express.Router();

router.get('/',Main);
module.exports=router;