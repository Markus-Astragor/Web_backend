const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  apiKey: { type: String, required: true }
})

const Users = new model('users', schema);

module.exports = { Users };