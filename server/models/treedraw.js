const Sequelize=require('sequelize');

class TreeDraw extends Sequelize.Model{
    static initiate(sequelize){
        TreeDraw.init({
            tree_id:{
                type: Sequelize.INTEGER,
                allowNull:true,
                unique:true,
                primaryKey:true,
                autoIncrement:true
            },
            tree_image:{
                type:Sequelize.STRING(255),
                allowNull:true,
            },
            tree:{
                type:Sequelize.STRING(255),
                allowNull:true,
                defaultValue:0
            },
            tree_size:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_loc:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_pillar:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_crown:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_branch:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_root:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_leaf:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_flower:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_fruit:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_swing:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_bird:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_squirrel:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_cloud:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_moon:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            tree_star:{
                type:Sequelize.INTEGER,
                allowNull:true,
                defaultValue:0
            },
            redate:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'TreeDraw',
            tableName:'trees',
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        db.TreeDraw.belongsTo(db.User,{foreignKey:'user_id',targetKey:'user_id'})
    }
};

module.exports=TreeDraw;
