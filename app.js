const express = require("express");

const app = express();
const db = require("./config/db.config");
const client = require("./config/redis.config");


client.connect()
client.on("connect",()=>console.log("redis connected"))



 
app.use(express.json());
app.use("/api", require("./routes/clientRoute"));

db.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

app.use((err,req,res,next)=>{
  res.status(err.status || 500)
  res.send({
    code : err.status || 500,
    message:err.message || "something went wrong"
  })
})


app.listen(3000, () => console.log(`server is running at port 3000`));
