const axios=require('axios');
const { Console } = require('console');
const fs=require('fs');

exports.tree=async(req,res,next)=>{
    console.log(req.file.path)
    const existingFile=fs.readFileSync(req.file.path)
    console.log(existingFile)
    const formData=new FormData()
    formData.append("file",existingFile)
    formData.append("fileName",req.file.originalname)
    try{
        const response=await axios.post("http://127.0.0.1:5000/api/tree",formData)
        console.log(response)
    }catch(error){
        console.log(error,"getFileError")
    }
}

exports.house=(req,res,next)=>{

    console.log('req house');
    res.send('res house');
}

exports.person=(req,res,next)=>{

    console.log('req person');
    res.send('res person');
}