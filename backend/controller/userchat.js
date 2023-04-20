const chattable=require('../module/messagetable');
const Tbluserdetails=require('../module/userdetailtable');



exports.fetchChat=( async(req,res)=>{
      // const userchat= await chattable.findAll({
      //   attributes: ['message']
      // });
      const userchat= await chattable.findAll({
        include: [{
          model: Tbluserdetails,
          attributes: ['username']
        }]
      })

       res.send({success:true,userchat:userchat});
});

exports.Adduserchat=(async (req,res)=>{
    console.log(req.body.message);
    try {
      await chattable.create({
          message:req.body.message,
          tbluserdetailId:req.user.id
      })
      res.send({success:true,msg:"successfull inserted"})
    } catch (error) {
      res.send({success:false,msg:error})
    }
   
})