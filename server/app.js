const express=require('express');
const morgan=require('morgan');
const cookieParser=require('cookie-parser')
const session=require('express-session')
const passport=require('passport');
const passportConfig=require('./passport');
const dotenv=require('dotenv')
const path=require('path')
const {sequelize}=require('./models')
const cors=require('cors')
dotenv.config();
const app=express();

app.use(express.json());
passportConfig();
app.set('port',process.env.PORT||3000)

app.use(cors(
//     {
//     origin:'http://localhost:8080',
//     credentials:true,
// }
));
app.use(morgan('dev'));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))


sequelize.sync({force:false})
.then(()=>{
    console.log('db 연결 성공');
    })
.catch((err)=>{
    console.error(err);
    });
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());


// app.use(passport.initialize());
// app.use(passport.session());

const homeRouter=require('./routes/main.js')
const analyzeRouter=require('./routes/analyze.js')
const interpretation=require('./routes/interpretation.js')
const userRouter=require('./routes/auth.js')
// const userRouter=require('./routes/user.js')
app.use('/',homeRouter)
app.use('/analyze',analyzeRouter)
app.use('/interpretation',interpretation)
app.use('/',userRouter)



app.use((req,res,next)=>{
    const error=new Error(`${req.method} ${req.method} 라우터가 없습니다.`);
    error.status=404;
    next(error);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
})