const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
});

const DB_URL = process.env.NODE_ENV === 'tests' ? process.env.DATABASE_URL_TESTS : process.env.DATABASE_URL;

exports.connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        keepAlive: 1,
    }).then(() => console.log('Database connected'));

    return mongoose.connection;
};