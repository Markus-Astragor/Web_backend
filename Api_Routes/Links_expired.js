const { Users } = require('../models/Users');
const { Links } = require('../models/Links');
const Router = require('express');
const router = Router();

router.get('/links', async (req, res) => {
  const { auth } = req.headers;
  const user = await Users.findOne({ apiKey: auth });
  const { expiredAt } = req.query;


  if (!user) {
    return res.status(401).send('User is not authorized');
  }

  const userId = user._id;
 

  const queryDb = {};
  if (expiredAt) {
    queryDb.expiredAt = expiredAt;
  }

  let expiredAt_parsed = JSON.parse(expiredAt);  
  const docs = await Links.find({userId: userId, expiredAt: expiredAt_parsed});
  return res.status(200).send(docs);



})

module.exports = { router };
