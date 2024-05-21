const Sequelize=require('sequelize');

class Result extends Sequelize.Model{
    static initiate(sequelize){
        Result.init({
            image_url:{
                type:Sequelize.STRING(255),
                unique:true,
                primaryKey:true
            },
            label:{
                type:Sequelize.STRING(10),
            },
            keyword:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
            text:{
                type:Sequelize.TEXT,
                allowNull:true
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Result',
            tableName:'results',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        db.Result.belongsTo(db.User,{foreignKey:'user_id',targetKey:'user_id'})
    }
};

module.exports=Result;
