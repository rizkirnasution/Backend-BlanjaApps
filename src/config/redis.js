const { createClient } = require('redis')
const {REDIS_URL} = process.env

// const client = createClient(6379)
const client = createClient(REDIS_URL)

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

module.exports = client