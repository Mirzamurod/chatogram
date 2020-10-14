const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect(
        process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )

    mongoose.connection.on('open', () => {
        console.log('MongiDB is Online!!!');
    })

    mongoose.connection.on('error', (err) => {
        console.log('Mongo DB is not Connected!!! \n', err);
    })
}