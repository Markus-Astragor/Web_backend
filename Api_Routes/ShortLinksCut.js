const { Links } = require('../models/Links');
const Router = require('express');
const router = Router();

router.get('/shortLink/:cut', async (req, res) => {
  const {cut} = req.params.cut;
  const docs = await Links.findOne({cut: cut});

  if(!docs){
    return res.status(400).send('Short link wasn`t found')
  }

  if(docs.link.expiredAt){
    return res.status(400).send('Link was expired');
  }


  return res.status(200).redirect(docs.link.original);
})

module.exports = { router }