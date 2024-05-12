const Sequelize=require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            user_id:{
                type: Sequelize.STRING(20),
                allowNull:true,
                unique:true
            },
            email:{
                type:Sequelize.STRING(60),
                allowNull:true,
                unique:true
            },
            password:{
                type:Sequelize.STRING(20),
                allowNull:true,
            },
            nickname:{
                type:Sequelize.STRING(10),
                allowNull:true,
                unique:true
            }
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
    static associate(db){}
};

module.exports=User;
