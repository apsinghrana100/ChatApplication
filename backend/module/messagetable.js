const sequelize=require('sequelize');
const Sequelize=require('../util/Databaseconnection');

const messagetable=Sequelize.define('chattable',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    message:sequelize.TEXT
})

module.exports=messagetable;