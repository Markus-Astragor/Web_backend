const { Schema, model, Types} = require('mongoose');

const schema = new Schema({
  userId: {type: Types.ObjectId},
  link: {
    original: {type: String, required: true},
    cut: {type: String, required: true}
  },
  expiredAt: {type: Date, required: true},
})

const Links = new model('links', schema);

module.exports = { Links };