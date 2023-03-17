const { Links } = require('../models/Links');
const Router = require('express');
const router = Router();


function CurrentDate() {
  let date = new Date();
  return date;
}


router.get('/shortLink/:cut', async (req, res) => {
  let current = CurrentDate();
  const { cut } = req.params;
  //find cut link
  const QueryDB = {};
  QueryDB["link.cut"] = cut;


  const docs = await Links.findOne(QueryDB);

  if (!docs) {
    return res.status(400).send('Short link wasn`t found')
  }

  if (current >= docs.expiredAt) {
    return res.status(400).send('Link was expired');
  }

  console.log(docs.expiredAt);

  return res.redirect(docs.link.original);
})

module.exports = { router }