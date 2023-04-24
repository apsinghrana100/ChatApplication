const grouptable=require('../module/grouptable');
const usergroup=require('../module/usergroup');
const messagetable=require('../module/messagetable')
// const sequelize=require('../util/Databaseconnection');
  const sequelize=require('sequelize');
const { Op } = require('sequelize');
const usertable = require('../module/userdetailtable');


exports.CreateGroup=(async(req,res)=>{
    console.log("createfgorp data"+req.body.groupname+req.body.groupUseridArray)
    try {
        await grouptable.create({
            groupName:req.body.groupname,
        });
    

        const groupid=await grouptable.findOne({where:{groupName:req.body.groupname}});
        console.log(groupid.id);
        for (let index = 0; index < req.body.groupUseridArray.length; index++) {
            usergroup.create({
                grouptableId:groupid.id,
                tbluserdetailId:req.body.groupUseridArray[index]
            })
        }
        
    } catch (error) {
        console.log(error);
    }
})

exports.FetchGroupName=(async (req,res)=>{
    try {
        // const groupName=await grouptable.findAll({where:{ }});

        console.log("userid"+req.user.id)
        


  const groupName = await grouptable.findAll({
    attributes: ['id', 'groupName', 'createdAt', 'updatedAt'],
    include: [{
      model: usergroup,
      attributes: [],
      where: {
        tbluserdetailId: `${req.user.id}`
      },
      required: true
    }]
  });
        res.send({message:true,groupname:groupName})
    } catch (error) {
        console.log(error);
    }
})


exports.AddGroupchatMessage=(async (req,res)=>{
    console.log(req.body.message);
    console.log(req.body.groupid);
    try {
   const response=await messagetable.create({
          message:req.body.message,
          tbluserdetailId:req.user.id,
          grouptableId:req.body.groupid,
      })
      
      res.send({success:true,msg:"successfull inserted"})
    } catch (error) {
      res.send({success:false,msg:error})
    }
   
})


exports.fetchGroupMessage=( async(req,res)=>{
   console.log(req.query.groupid);
    try {
      const userchat= await messagetable.findAll({
       where:{
        grouptableId:req.query.groupid
       }
      })

       res.send({success:true,userchat:userchat});
    } catch (error) {
      console.log(error);
    }
    
});
