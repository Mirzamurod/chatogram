const socketio = require('socket.io')
const socketAuthorization = require('../middleware/socketAuthorized')

const io = socketio()

// libs
const Users = require('./libs/Users')
const Rooms = require('./libs/Rooms')
const Messages = require('./libs/Messages')

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
    // console.log('a user is logged in with name: ' + socket.request.user.name);

    // Rooms.list(rooms => {
    //     // console.log(rooms);
    //     io.emit('roomList', rooms)
    // })

    Users.upsert(socket.id, socket.request.user)

    Users.list(users => {
        // console.log(users);
        io.emit('onlineList', users)
    })

    socket.on('newMessage', data => {
        console.log(data);
        Messages.upsert({
            ...data,
            username: socket.request.user.name,
            surname: socket.request.user.surname
        })
    })

    socket.on('newRoom', roomName => {
        Rooms.upsert(roomName)
        Rooms.list(rooms => {
            // console.log(rooms);
            io.emit('roomList', rooms)
        })
    })

    socket.on('disconnect', () => {
        Users.remove(socket.request.user.googleId)
        Users.list(users => {
            console.log(users);
            io.emit('onlineList', users)
        })
    })
})

module.exports = socketApi;