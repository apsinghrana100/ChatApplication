const { DatabaseError, DataTypes } = require('sequelize');
const sequelize=require('../util/Databaseconnection');

const grouptable=sequelize.define('grouptable',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupName:DataTypes.STRING
});





module.exports=grouptable;