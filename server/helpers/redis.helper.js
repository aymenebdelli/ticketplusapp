require('dotenv').config()
const redis = require("redis")
const client = redis.createClient(process.env.REDIS_ENDPOINT_URI, {
    no_ready_check: true,
    auth_pass: process.env.REDIS_PASSWORD
  });
 

client.on('connect', () =>  console.log('Connected to Redis successfully!'))
client.on('error', (err) => console.log('Redis Client Connection Error', err))

const setJWT = (key, value) => {
    // console.log(typeof key, typeof value)
    return new Promise((resolve, reject) => {
        try {
            client.set(key, value, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        } catch (err) {
            reject(err)
        }
    })
}

const getJWT = (key) => {
    // console.log(key)
    return new Promise((resolve, reject) => {
        try {
            client.get(key, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        } catch (err) {
            reject(err)
        }
    })
}

const deleteJWT = (key) => {
    try {
        client.del(key)
    } catch (err) {
        console.log(err)
    }
}


module.exports = { setJWT, getJWT, deleteJWT }