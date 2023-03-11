const { Users } = require('../models/Users');
const Router = require('express');
const router = Router();
const { generateApiKey } = require('generate-api-key');

router.post('/links', async (req, res) => {

  const user = await  Users.findOne({apiKey: apiKey});

  if(!user){
    res.status(400).send('User is not authorized');
  }

  const shortlink = generateApiKey({
    method: 'string',
    pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/',
    min: 5,
    max: 15
  });

  const userId = user._id;

    


})