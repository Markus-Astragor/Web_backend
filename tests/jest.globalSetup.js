require('dotenv').config({ path: './.env.test' });
const { createMongoMemoryServer } = require("./mongo-db-memory");

module.exports = async () => {
 console.log('Start creating mongoDb server');
 await createMongoMemoryServer();
 console.log('MongoDB server was created');
};