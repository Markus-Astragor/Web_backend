const { Users } = require('../models/Users');
const {Links} = require('../models/Links');
const Router = require('express');
const router = Router();
const { generateApiKey } = require('generate-api-key');

function linkDate(){
  let date = new Date;
  let currentDay = date.getDate();
  let expiredDate = date.setDate(currentDay + 5);

  return expiredDate;
}


router.post('/links', async (req, res) => {
  const {original} = req.body;
  const {auth} = req.headers;
  const user = await Users.findOne({apiKey: auth});

  if(!user){
    return res.status(400).send('User is not authorized');
  }

  const shortlink = generateApiKey({
    method: 'string',
    pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    min: 5,
    max: 15
  });


  
  const userId = user._id;

  const docs = new Links({
    id: userId,
    link: {
      original: original,
      cut: shortlink
    },
    expiredAt: linkDate(),
  })
    const doc = await docs.save();
  
    const linkResponse = {};
    linkResponse.cut = doc.link.cut;
    linkResponse.expiredAt = doc.expiredAt;

    res.send(linkResponse);
})

module.exports = {router};