const Sequelize=require('sequelize');

class TreeAnalyze extends Sequelize.Model{
    static initiate(sequelize){
        TreeAnalyze.init({
            analysis_tree_id:{
                type: Sequelize.INTEGER,
                allowNull:true,
                unique:true,
                primaryKey:true
            },
            analysis_tree:{
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
            modelName:'TreeAnalyze',
            tableName:'interpretationstree',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){}
};

module.exports=TreeAnalyze;
