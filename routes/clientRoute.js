

const router = require('express').Router()

const { default: axios } = require('axios')
const db = require('../config/db.config')
const client = require('../config/redis.config')
const cacheMiddleware = require('../middleware/redis_cache')


router.get("/data",cacheMiddleware, async(req,res,next)=>{

        // db.query("SELECT * FROM clients",(err,result)=>{
        //     if(err){
        //         res.status(500).json({"message":err.message})
        //     }
           
        //     // client.SETEX('data',JSON.stringify(result),10)
        //     res.status(200).json(result)
        // })

        const result = await axios.get("https://jsonplaceholder.typicode.com/photos")

        await client.set("data",JSON.stringify(result.data),'EX', 10 )

        res.status(200).json(result.data)

        

})




router.post("/create",async(req,res,next)=>{

    const {name,email,password} = req.body
   
        db.query("INSERT INTO clients (name,email,password) VALUES (?,?,?)",[name,email,password],(err,result)=>{
           if(err){
            console.log(err)
            res.status(500).json({"message":err.message})
           }
            res.send(result)
        })
        
})

router.put("/update/:id",async(req,res,next)=>{

        db.query('UPDATE clients SET ? WHERE id = ?', [req.body,req.params.id ],(err,result)=>{
            if(err){
                res.status(500).json({"message":err.message})
            }
            res.status(200).json({"message":"successfully updated",result})
        })
        
})

router.delete("/delete/:id",(req,res,next)=>{
        db.query("DELETE FROM clients WHERE id = ?",[req.params.id],(err,result)=>{
            if(err){
                res.status(500).json({"message":err.message})
            }
            res.status(200).json({"message":"succssfully deleted",result})
        })
        
})

 
module.exports = router 