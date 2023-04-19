const usertable=require('../module/userdetailtable');
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');

exports.addUserDetail=(async(req,res)=>{
    try {
        saltround=10;
        const password=req.body.password
        const isEmailExist=await usertable.findOne({where:{useremail:req.body.email}})
        if(isEmailExist===null)
        {
            bcrypt.hash(password,saltround,async(err,hashpwd)=>{
                
                 usertable.create({
                        username:req.body.name,
                        useremail:req.body.email,
                        mobil:req.body.mobile,
                        userpass:hashpwd
                    }).then((response)=>{
                        res.send({success:true,msg:"Insert successfully"})
                    }).catch(error=>{
                         throw new Error("something went wrong in insert data");
                    })

            })
        }else{
            res.send({success:false,msg:"Email-id Exist!!"})
        }
       
       
        
    } catch (error) {
        res.status(400).send({success:false,msg:error})
    }
  
})

function token(id,name)
{
    return jwt.sign({ userid: id, username:name }, 'secretkey');
}


 exports.loginUser=(async(req,res)=>{
    try {
        console.log("useremail",req.body.email)
   const data= await usertable.findOne({where:{useremail:req.body.email}});
//    console.log("userpass"+data.useremail);
    if(data===null)
    {
        res.send({success:false,msg:"Email_id does not exits"});
    }else{
        
        bcrypt.compare(req.body.password,data.userpass, (err,response)=>{
            if(err)
            {
                throw new Error("Something went wrong in password")
            }
            console.log(response);
            if(response===true)
            {
                res.send({success:true,msg:"login Successfully",userdata:token(data.id,data.username)}) 
            }else{
                res.send({success:false, msg:"Password does not match"}) 
            }
                
           
        })
    }

} catch (error) {
        console.log(error);
}
    
 })