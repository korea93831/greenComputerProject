const passport=require('passport');
const local=require('./localStrategy');
const User=require('../models/user');

module.exports=()=>{
    passport.serializeUser((user,done)=>{
        done(null,user.user_id);
    });

    passport.deserializeUser((id,done)=>{
        User.findByPk(id)
        .then(user=>{
            if (!user) {
                done(new Error('User not found'), null);
                return;
            }
            done(null,user);
        })
        .catch(err=>{
            done(err);});
    });
    local();
};