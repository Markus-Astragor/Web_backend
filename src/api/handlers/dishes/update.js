const { Dishes } = require('../../../models');
const {Types} = require('mongoose');


module.exports.updateDish = async (req, res) => {
 const { price, isAvailable } = req.body;
 const { _id } = req.params;
 const update = {};
 if (price) {
  update.price = price;
 }

 if (isAvailable) {
  update.isAvailable = isAvailable;
 }

 const doc = await Dishes.findOneAndUpdate(
  { _id: Types.ObjectId(_id) },
  { $set: update },
  { new: true }
 );

 return res.status(200).send(doc);
};