const express=require('express');
const app=express();
const bodyperser=require('body-parser');
const sequelize=require('./util/Databaseconnection');
const userroute=require('./router/user');

const cors=require('cors')
app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

const usertable=require('./module/userdetailtable');

app.use(userroute);

sequelize.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})