const Sequelize=require('sequelize');

class Board extends Sequelize.Model{
    static initiate(sequelize){
        Board.init({
            board_id:{
                type: Sequelize.INTEGER,
                allowNull:true,
                unique:true,
                autoIncrement:true
            },
            title:{
                type:Sequelize.STRING(100),
                allowNull:true,
                unique:false
            },
            content:{
                type:Sequelize.TEXT,
                allowNull:true,
            },
            image:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            like:{
                type:Sequelize.INTEGER,
                defaultValue:0
            },
            comment:{
                type:Sequelize.STRING(100),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        db.Board.belongsTo(db.User,{foreignKey:'reg_user_id',targetKey:'user_id'})
    }
};

module.exports=Board;
