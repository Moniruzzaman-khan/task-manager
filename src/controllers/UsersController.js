const UsersModel = require("../models/UsersModel")
const jwt = require("jsonwebtoken");

//Registration
exports.registration=(req,res)=>{
    let reqBody = req.body;
    UsersModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(200).json({status:"Failed",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}

//Login
exports.login=(req,res)=>{
    let reqBody=req.body
    UsersModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0,firstName:1,lastName:1,email:1,photo:1,mobile:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            if(data.length>0){
                let Payload={exp:Math.floor(Date.now()/1000)+(240*60*60),data:data[0]['email']}
                let token = jwt.sign(Payload,'SecretKey123456');
                res.status(200).json({status:"success",token:token,data:data[0]})
            }
            else{
                res.status(401).json({status:"Unauthorized"})
            }
        }
    })
}

//Profile Update
exports.profileUpdate=(req,res)=>{
    let email = req.headers['email']
    let reqBody=req.body;

    UsersModel.updateOne({email:email},reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"Failed",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}