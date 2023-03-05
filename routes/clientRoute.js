
const router = require('express').Router()

const { getAllUsers, createUser, update, deleteUser } = require('../controllers/userController')
const cacheMiddleware = require('../middleware/redis_cache')

router.get("/users",cacheMiddleware,getAllUsers)

router.post("/create",createUser)

router.put("/update/:id",update)

router.delete("/delete/:id",deleteUser)

 
module.exports = router 