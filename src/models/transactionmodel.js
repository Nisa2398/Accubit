const Sequelize = require('sequelize')
const sequelize = require('../utils/database');
const transaction=sequelize.define('transaction',
{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:Sequelize.STRING,
    newslettername:Sequelize.STRING,
    date:Sequelize.DATE
   
},{
    freezeTableName:true,
    timestamps:false
}
)
module.exports={transaction}