////////////////////////////////////////////////////////
// Database socket. Uses mongo database for everything.
////////////////////////////////////////////////////////

const mongoose = require('mongoose');
const DB_URL = require('../CONFIG');

mongoose.Promise = global.Promise;
let isConnected;


const connectToDatabase = () => {

    if (isConnected) {
        console.log('Use existing');
        return Promise.resolve();
    }
    console.log('Using new');
    return mongoose.connect(DB_URL, { useNewUrlParser: true }).then(db=> {
        isConnected = db.connections[0].readyState;
    });

}

module.exports = connectToDatabase;