const { Links } = require('../models/Links');
const Router = require('express');
const router = Router();

router.get('/shortLink/:cut', async (req, res) => {
  const {cut} = req.params;
  //find cut link
  const QueryDB ={};
  QueryDB["link.cut"] = cut;


  const docs = await Links.findOne(QueryDB);

  if(!docs){
    return res.status(400).send('Short link wasn`t found')
  }

  if(docs.link.expiredAt){
    return res.status(400).send('Link was expired');
  }

  return res.redirect(docs.link.original);
})

module.exports = { router }