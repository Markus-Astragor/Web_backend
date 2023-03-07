const {Schema, model} = require('mongoose');

const schema = new Schema({
 email: {type: String, },
 password: {type: String, required: true}
})

const Users = new model('Users', schema);

module.exports = { Users };