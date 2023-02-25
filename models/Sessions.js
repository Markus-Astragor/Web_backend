const { Schema, Types, model } = require('mongoose');

const schema = new Schema({
  id: { type : Types.ObjectId, required: true},
  user_id: {type : String, required: true},
  jwt: {type: String, required: true}
})

const Sessions = new model('sessions', schema);

module.exports = { Sessions }