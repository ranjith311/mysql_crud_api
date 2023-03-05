const db = require("../config/db.config")
const client = require("../config/redis.config")

const getAllUsers =  async(req,res,next)=>{

        db.query("SELECT * FROM clients",(err,result)=>{
            if(err){
                console.log(err)
                if(err.errno == 1146){
                    err.status = 404
                }
                next(err)
            }
            client.set("data",JSON.stringify(result),"EX",10)
            res.status(200).json(result)
        })

}

const createUser =async(req,res,next)=>{
    const {name,email,password} = req.body

        db.query("INSERT INTO clients (name,email,password) VALUES (?,?,?)",[name,email,password],(err,result)=>{
           if(err){
            console.log(err)
            if(err.errno==1062){
                err.status = 409
            }
            if(err.errno == 1048){
                err.status = 422
            }

           next(err)
           }
            res.send(result)
        })
        
}

const update = async(req,res,next)=>{
    db.query('UPDATE clients SET ? WHERE id = ?', [req.body,req.params.id ],(err,result)=>{
        if(err){
            if(err.errno == 1064){
                err.status = 422
                err.message = "invalid input"
            }
            next(err)
        }else{
            res.status(200).json({"message":"successfully updated",result})
        }
        
    })
    
}

const deleteUser =(req,res,next)=>{
    db.query("DELETE FROM clients WHERE id = ?",[req.params.id],(err,result)=>{
        if(err){
            res.status(500).json({"message":err.message})
        }
        res.status(200).json({"message":"succssfully deleted",result})
    })
    
}








module.exports ={getAllUsers,createUser,update,deleteUser}