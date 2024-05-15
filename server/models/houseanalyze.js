const Sequelize=require('sequelize');

class HouseAnalyze extends Sequelize.Model{
    static initiate(sequelize){
        HouseAnalyze.init({
            analysis_house_id:{
                type: Sequelize.INTEGER,
                allowNull:true,
                unique:true,
                autoIncrement:true
            },
            analysis_house:{
                type:Sequelize.STRING(300),
                allowNull:true,
            },
            keyword:{
                type:Sequelize.STRING(50),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'HouseAnalyze',
            tableName:'houseanalyze',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){}
};

module.exports=HouseAnalyze;
