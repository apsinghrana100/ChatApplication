var jwt = require('jsonwebtoken');
const usertable=require('../module/userdetailtable')



// console.log(decoded.id);
exports.authentication=(async(req,res,next)=>{
    try {
        const token=req.header('Authorization');
        var decoded = jwt.verify(token, 'secretkey')
       const userdetail= await usertable.findByPk(decoded.userid);
       if(userdetail===null)
       {
            console.log("this is not valid user");
       }else{
            req.user=userdetail;
            next();
       }
    } catch (error) {
        console.log(error);
    }
});