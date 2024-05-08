const express=require('express');
const session=require('express-session')
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
// const passport=require('passport');
const dotenv=require('dotenv');
const path=require('path');


dotenv.config();
const app=express();
app.set('port',process.env.PORT||3000)
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json);
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(session({
//     resave:false,
//     saveUninitialized:false,
//     secret:process.env.COOKIE_SECRET,
//     cookie:{
//         httpOnly:true,
//         secure:false,
//     },
//     name:'session-cookie'
// }))

const homeRouter=require('./routes/main.js')
// const userRouter=require('./routes/user.js')
app.use('/',homeRouter)
// app.use('/user',userRouter)



app.use((req,res,next)=>{
    const error=new Error(`${req.method} ${req.method} 라우터가 없습니다.`);
    error.status=404;
    next(error);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
})