const cookieParser = require('cookie-parser');
const { Error } = require('mongoose');
const passportSocketIo = require('passport.socket.io')
const redisStore = require('../helpers/redisStore')

onAuthorizeSuccess = (data, appect) => {
    console.log('successful connection to sockert.io');
    appect(null, true)
}

onAuthorizeFail = (data, message, error, accept) => {
    if (error)
        throw new Error(message)
    console.log('failed connection to socket.io');

    appect(null, false)
}

module.exports = passportSocketIo.authorize({
    cookieParser,
    key: 'connect.sid',
    secret: process.env.SESSION_SECRET_KEY,
    store: redisStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail,
})