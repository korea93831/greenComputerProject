const Sequelize=require('sequelize');

class PeopleAnalyze extends Sequelize.Model{
    static initiate(sequelize){
        PeopleAnalyze.init({
            analysis_people_id:{
                type: Sequelize.INTEGER,
                allowNull:true,
                unique:true,
                autoIncrement:true
            },
            analysis_people:{
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
            modelName:'PeopleAnalyze',
            tableName:'peopleanalyze',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){}
};

module.exports=PeopleAnalyze;
