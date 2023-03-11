const { Schema, model, Types} = require('mongoose');

const schema = new Schema({
  _id: {type: Types.ObjectId},
  link: {
    original: {type: String, required: true},
    cut: {type: String, required: true}
  },
  expiredAt: {type: Date, required: true},
  apiKey: { type: String, required: true }
})

const Links = new model('links', schema);

module.exports = { Links };