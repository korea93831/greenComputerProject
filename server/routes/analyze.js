const express=require('express');
const {tree,house,person}=require('../controller/analyze.js');
const router=express.Router();
const multer=require('multer')
const path=require('path');

const upload=multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads/');
        },
        filename(req,file,done){
            const ext=path.extname(file.originalname);
            done(null,path.basename(file.originalname,ext)+Date.now()+ext);
        },
    }),
    limits:{fileSize:5*1024*1024},
});

router.post('/tree',upload.single('image'),tree);
router.post('/house',upload.single('image'),house);
router.post('/person',upload.single('image'),person);

module.exports=router;