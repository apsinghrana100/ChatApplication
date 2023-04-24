const { DatabaseError, DataTypes } = require('sequelize');
const sequelize=require('../util/Databaseconnection');

const usergroup=sequelize.define('usergroup',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    // userId:DataTypes.INTEGER,
    // groupId:DataTypes.INTEGER,
});

module.exports=usergroup;