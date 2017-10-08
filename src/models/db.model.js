let mongoose = require('mongoose');
let gracefulShutdown;
let dbURI = 'mongodb://localhost:27017/hiesagc';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI, {
    useMongoClient: true
});

mongoose.connection.on('connected', () =>{
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', err =>{
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () =>{
    console.log('Mongoose disconnected');
});

gracefulShutdown = (msg, callback) =>{
    mongoose.connection.close(() =>{
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', () =>{
    gracefulShutdown('nodemon restart', () =>{
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () =>{
    gracefulShutdown('app termination', () =>{
        process.exit(0);
    });
});

process.on('SIGTERM', () =>{
    gracefulShutdown('Heroku app termination', () =>{
        process.exit(0);
    });
});
