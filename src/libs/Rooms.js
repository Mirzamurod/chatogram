const redisClient = require('../libs/redisClient')
const shortid = require('shortid')

function Rooms() {
    this.client = redisClient.getClient()
}

module.exports = new Rooms();

Rooms.prototype.upsert = function (name) {
    const newId = shortid.generate()

    this.client.hset('rooms', '@Room:' + newId, JSON.stringify({
            name,
            when: Date.now()
        }),
        err => {
            if (err)
                console.error(err)
        }
    )
    // console.log(meta.googleId)
};

Rooms.prototype.list = function (callback) {
    let roomList = []

    this.client.hgetall('rooms', function (err, rooms) {
        if (err) {
            console.log(err);
            return callback([])
        }

        for (let room in rooms) {
            roomList.push(JSON.parse(rooms[room]))
        }

        return callback(roomList)
    })
}