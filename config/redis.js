const redis = require("redis");
const jsonify = require("redis-jsonify");
const { createClient } = redis;
const redisClient = async () => {
  const client = jsonify(createClient());
  client.on("error", (err) => {
    console.log("Redis Client Error ", err);
    return;
  });
  await client.connect();
  console.log("done bro");
  return client;
};

module.exports.setKey = async (key, value, expireIn) => {
  try {
    await client.set(key.toString(), value.toString());
    return true;
  } catch (err) {
    return false;
  }
};
module.exports.setKeyWithExpiry = async (key, value, expireIn) => {
  try {
    await client.set(key.toString(), value.toString(), {
      EX: expireIn,
    });
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.getValue = async (key) => {
  return await client.get(key.toString());
};

const client = redisClient();

module.exports.client = client;
