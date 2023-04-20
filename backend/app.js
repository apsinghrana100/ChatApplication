const express=require('express');
const app=express();
const bodyperser=require('body-parser');
const sequelize=require('./util/Databaseconnection');
const userroute=require('./router/user');
const messageRoute=require('./router/message');

const cors=require('cors')
app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

const usertable=require('./module/userdetailtable');
const userchattable=require('./module/messagetable');

app.use(userroute);
app.use(messageRoute);

usertable.hasMany(userchattable);
userchattable.belongsTo(usertable);

sequelize.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})