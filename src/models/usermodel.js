const Sequelize = require('sequelize')
const sequelize = require('../utils/database');
const user=sequelize.define('tbl_user',
{
    userid:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    firstname:Sequelize.STRING,
    lastname:Sequelize.STRING,
    email:Sequelize.TEXT,
    age:Sequelize.INTEGER
},{
    freezeTableName:true,
    timestamps:false
}
)
module.exports={user}