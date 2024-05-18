const Sequelize=require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            user_id:{
                type: Sequelize.INTEGER,
                unique:true,
                primaryKey:true
            },
            email:{
                type:Sequelize.STRING(40),
                allowNull:true,
                unique:true
            },
            password:{
                type:Sequelize.STRING(60),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'User',
            tableName:'users',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        // db.User.hasMany(db.Board,{foreignkey:'user_id',sourceKey:'user_id'});
        db.User.hasMany(db.TreeDraw,{foreignkey:'user_id',sourceKey:'user_id'});
        db.User.hasMany(db.HouseDraw,{foreignkey:'user_id',sourceKey:'user_id'});
        db.User.hasMany(db.PeopleDraw,{foreignkey:'user_id',sourceKey:'user_id'});
    }
};

module.exports=User;
