'use strict';

const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

const redis = require('redis');
const {promisify} = require("util");

const {REDIS_HOST} = process.env;
const client = redis.createClient({host: REDIS_HOST});
//promisify redis using node
const get = promisify(client.get).bind(client);
const setnx = promisify(client.setnx).bind(client);

//only required when used with the vue frontend as it runs on a different host
var cors = require('cors');
app.use(cors())

const redis_key = "any key"
const value_to_set = "a value"

client.on("error", function (error) {
  console.error(`Error creating redis client: ${error}`);
});

app.get('/', async (req, res) => {
  try {
    const ok = await setnx(redis_key, value_to_set);
    const value = await get(redis_key)

    if (!ok) { // value was previously set
      res.send(`The key "${redis_key}" was already set, kind of a boring website, eh?\nAlso, the value is: "${value}"`)
    } else
      res.send(`The value for key "${redis_key}" is "${value}"`)
  } catch (e) {
    console.error('An error occurred:', e)
    res.status(500).send('An error occurred.')
  }
});

app.listen(PORT, HOST);
console.log(`Running on container at ${HOST}:${PORT}`);