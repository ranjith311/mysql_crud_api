


const client = require("../config/redis.config");

const cacheMiddleware = async(req, res, next) => {
  try {
    const data = await client.get("data")
    if (data) {
      return res.status(200).json(JSON.parse(data))
    }
    return next();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = cacheMiddleware