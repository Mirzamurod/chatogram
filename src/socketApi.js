const socketio = require('socket.io')
const socketAuthorization = require('../middleware/socketAuthorized')

const io = socketio()

// libs
const Users = require('./libs/Users')

const socketApi = {
    io
}

// Socket authorization
io.use(socketAuthorization)

// Redis Adapter

const redisAdapter = require('socket.io-redis')
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}))

io.on('connection', socket => {
    console.log('a user is logged in with name: ' + socket.request.user.name);

    Users.upsert(socket.id, socket.request.user)
})

module.exports = socketApi;