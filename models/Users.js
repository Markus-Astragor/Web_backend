const {Schema, Types, model} = require('mongoose');

const schema = new Schema({
 _id: {type: Types.ObjectId},
 name: {type: String, required: true},
 email: {type: String, },
 password: {type: String, required: true}
})

const Users = new model('users', schema);

module.exports = { Users } 