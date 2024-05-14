const axios=require('axios');
const fs=require('fs');

exports.tree=async(req,res,next)=>{
    console.log('req tree');
    res.send('res tree');
}

exports.house=(req,res,next)=>{

    console.log('req house');
    res.send('res house');
}

exports.person=(req,res,next)=>{

    console.log('req person');
    res.send('res person');
}