const express=require('express');
const app=express();
const bodyperser=require('body-parser');
const sequelize=require('./util/Databaseconnection');
const userroute=require('./router/user');
const messageRoute=require('./router/message');
const groupRoute=require('./router/group');
const path=require('path');

const cors=require('cors')
app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

const usertable=require('./module/userdetailtable');
const userchattable=require('./module/messagetable');
const grouptable=require('./module/grouptable');
const usergrouptbble=require('./module/usergroup');


app.use(userroute);
app.use(messageRoute);
app.use(groupRoute);

usertable.hasMany(userchattable);
userchattable.belongsTo(usertable);

grouptable.hasMany(userchattable);
userchattable.belongsTo(grouptable);



usertable.belongsToMany(grouptable,{ through: usergrouptbble });
grouptable.belongsToMany(usertable, { through: usergrouptbble });

grouptable.hasMany(usergrouptbble);
usertable.hasMany(usergrouptbble);

// Movie.belongsToMany(Actor, { through: 'ActorMovies' });
// Actor.belongsToMany(Movie, { through: 'ActorMovies' });

sequelize.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})