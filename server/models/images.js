const Sequelize=require('sequelize');

class Images extends Sequelize.Model{
    static initiate(sequelize){
        Images.init({
            filename:{
                type: Sequelize.STRING(50),
                unique:false,
                primaryKey:true
            },
            imagepath:{
                type:Sequelize.STRING(255),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Images',
            tableName:'images',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
    }
};

module.exports=Images;
