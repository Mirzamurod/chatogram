const redis = require('redis')

function Users() {
    this.client = redis.createClient({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    })
}

Users.prototype.upsert = function (connectionId, meta) {
    this.client.hset(
        'online',
        meta.googleId, // joyiga qaytdi
        JSON.stringify({
            connectionId,
            meta,
            when: Date.now()
        }),
        err => {
            if (err)
                console.error(err)
        }
    )
    // console.log(meta.googleId)
};

module.exports = new Users();
