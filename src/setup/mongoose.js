const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Databse is connected');
    }
    catch (error) {
        console.log(error);
    }
};