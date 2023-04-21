const {Schema, model} = require('mongoose');

const schema = new Schema({
  userName: {type: String},
  message: {type: String},
  createdAt: {type: Date},
  messageId: {type: String}
})

const Message = new model('messages', schema);

module.exports = { Message };