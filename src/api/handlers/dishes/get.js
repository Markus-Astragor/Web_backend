const { Dishes } = require('../../../models');

module.exports.getDishes = async (req, res) => {
 let { price, isAvailable } = req.query;

 const query = {};

 if (isAvailable) { 
    if (!['true','false'].includes(isAvailable)){
        return res.status(400).send('Must be true or false');
    }
  isAvailable = isAvailable == 'true'; 
  query.isAvailable = isAvailable;
 }

 if (price) {
  price = JSON.parse(price);
  query.price = {};
  if (price.gt) {
   query.price.$gt = price.gt;
  }
  if (price.lt) {
   query.price.$lt = price.lt;
  }

  if (!Object.keys(query.price).length) {
   return res.status(400).send({
    message: `Parameter price has incorrect format`
   });
  }
 }

 const docs = await Dishes.find(query);

 return res.status(200).send(docs);
};