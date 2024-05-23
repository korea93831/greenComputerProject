const express=require('express');
const {analyze,treeResultSave,houseResultSave, personResultSave}=require('../controller/analyze.js');
const router=express.Router();
const multer=require('multer')
const path=require('path');
const {authenticateToken2}=require('../middlewares/index.js')

const upload=multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            // const ext=path.extname(file);
            console.log(file)
            cb(null,file.fieldname+'-'+Date.now()+'.jpg');
            
        },
    }),
    limits:{fileSize:5*1024*1024},
});



router.post('/',upload.fields([
    {name:'houseimage',maxCount:1},
    {name:'treeimage',maxCount:1},
    {name:'personimage',maxCount:1}
]),analyze);
router.post('/tree',authenticateToken2,treeResultSave);
router.post('/house',authenticateToken2,houseResultSave);
router.post('/person',authenticateToken2,personResultSave);

module.exports=router;