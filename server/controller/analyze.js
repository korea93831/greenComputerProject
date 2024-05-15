const axios=require('axios');
const fs=require('fs');

exports.tree=async(req,res,next)=>{
    // const formData=new FormData();
    // sendFile=req.file;
    // formData.append("file",sendFile);
    // formData.append("filename",sendFile.originalname)

    // const result=await axios.post(
    //     'http://127.0.0.1:5000/api/tree',
    //     formData,{
    //         headers:{
    //             'Content-Type': 'multipart/form-data'
    //         },
    //     }
    // );
    res.send('api/tree')
    // formData.append("file",sendfile);
    // const request_config={
    //     method:"post",
    //     url:'http://127.0.0.1:5000/api/tree',
    //     headers:{
    //         "Content-Type":"multipart/form-data"
    //     },
    //     data:formData
    // };
    // try{
    //     const SendFile=await axios.post(request_config)
    //     console.log(SendFile)
    // }catch(err){
    //     console.log(err)
    // }
    
    
}








exports.house=(req,res,next)=>{

    console.log('req house');
    res.send('res house');
}

exports.person=(req,res,next)=>{

    console.log('req person');
    res.send('res person');
}

exports.saveResult=(req,res,next)=>{
    console.log('Parsed body:',req.body);
}