const express = require("express");

const app = express();
const db = require("./config/db.config");
const client = require("./config/redis.config");

// const setCache = require("./helpers/cache");

client.connect()
client.on("connect",()=>console.log("redis connected"))



 
app.use(express.json());
// app.use(setCache); 
app.use("/api", require("./routes/clientRoute"));

db.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});



app.listen(3000, () => console.log(`server is running at port 3000`));
