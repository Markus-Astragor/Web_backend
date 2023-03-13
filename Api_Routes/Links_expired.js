const { Users } = require('../models/Users');
const { Links } = require('../models/Links');
const Router = require('express');
const router = Router();

router.get('/links', async (req, res) => {
  const { auth } = req.headers;
  const user = await Users.findOne({ apiKey: auth });
  const { original, cut } = req.query;

  if (!user) {
    return res.status(401).send('User is not authorized');
  }

  const queryDb = {};

  // linksResponse.original = queryDb["link.original"] = original;
  // linksResponse.cut = 

  if (original) {
    queryDb["link.original"] = original;
  }

  if (cut) {
    queryDb["link.cut"] = cut;
  }

  const docs = await Links.find(queryDb);


  console.log(docs);
  return res.status(200).send(docs);
  


})

module.exports = { router };
