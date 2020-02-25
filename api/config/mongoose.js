const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = Promise;

const DB_URL = process.env.DATABASE_URL;

mongoose.connection.on('error', (err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
});

if (process.env.NODE_ENV === 'test') {
    mongoose.set('debug', true);
}

exports.connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        keepAlive: 1,
    }).then(() => console.log('Database connected'));

    return mongoose.connection;
};