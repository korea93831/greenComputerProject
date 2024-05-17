const Sequelize=require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            user_id:{
                type: Sequelize.INTEGER,
                allowNull:false,
                autoIncrement: true,
                primaryKey: true
            },
            email:{
                type:Sequelize.STRING(60),
                allowNull:false,
                unique:true
            },
            password:{
                type:Sequelize.STRING(255),
                allowNull:false,
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
