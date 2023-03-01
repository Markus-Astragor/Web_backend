const { Schema, Types, model } = require('mongoose');

const schema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    theatreId: { type: Number, required: true },
    location: {
      address: {
        street1: { type: String },
        city: {type: String},
        state: {type: String},
        zipcode: {type: String}
      },
      geo: {
        type: {type: String},
        coordinates: {type: Array}
      }
    }
  })

  const Theaters = new model('theatres', schema)

module.exports = { Theaters };