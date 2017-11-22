const redisClient = require('../helpers/redis');
const co = require('co');

var get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, function (err, reply) {
            if (err)
                reject(err);
            else if (reply === null)
                resolve(reply);
            else {
                try {
                    resolve(JSON.parse(reply));
                } catch (err) {
                    resolve(reply);
                }
            }
        });
    })
}

var set = (key, value) => {
    return new Promise((resolve, reject) => {
        redisClient.set(key, value, (err, result) => {
            if (err)
                reject(err.message);
            else
                resolve(result);
        });
    });
}

var del = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (err, result) => {
            if (err)
                reject(err.message);
            else
                resolve(result);
        });
    });
}

module.exports = {
    get: get,
    set: set,
    del: del
}