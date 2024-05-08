const express=require('express')
const {join}=require('../controller/user')

const router=express.Router();
router.get('/join',join);

module.exports=router;