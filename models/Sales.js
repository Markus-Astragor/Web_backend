const {Schema, Types, model} = require('mongoose');

const schema = new Schema({
  _id: { type: Types.ObjectId },
  saleDate: {type: Date},
  items: [{
    name: {type: String},
    tags: [{
      0: {type: String},
      1: {type: String}
    }],
    price: {type: Number},
    quantity: {type: Number},
  }],
  storeLocation: {type: String},
  customer: {
    gender: {type: String},
    age: {type: Number},
    email: {type: String},
    satisfaction: {type: Number}
  },
  couponUsed: {type: Boolean},
  purchaseMethod: {type: String},
})

const Sales = new model('sales', schema);

module.exports = { Sales };