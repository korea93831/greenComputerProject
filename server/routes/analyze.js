const express=require('express');
const {tree,house,person,saveResult}=require('../controller/analyze.js');
const router=express.Router();
const multer=require('multer')
const path=require('path');

const upload=multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext=path.extname(file.originalname);
            done(null,path.basename(file.originalname,ext)+Date.now()+ext);
            console.log('filename')
        },
    }),
    limits:{fileSize:5*1024*1024},
});

// 이미지가 base64형식일 때 사용
// const upload=multer({
//     storage:multer.memoryStorage(),
//     limits:{fileSize:5*1024*1024},
// });
// const save_base_64_image=(base64String,filepath)=>{
//     const matches=base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
//     if (!matches || matches.length !== 3) {
//         throw new Error('base64 모델이 아닙니다');
//     }
//     const buffer=Buffer.from(matches[2],'base64');
//     fstat.writeFileSync(filepath,buffer);
// };

router.post('/tree',upload.single('image'),tree);
router.post('/house',upload.single('image'),house);
router.post('/person',upload.single('image'),person);
router.post('/save_result',saveResult);

module.exports=router;