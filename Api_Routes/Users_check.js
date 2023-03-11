const { Users } = require('../models/Users');
const Router = require('express');
const router = Router();

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email, password: password });


  if (!user) {
    return res.status(400).send('User with such credentials was not found');
  }
  res.send(user)
})

module.exports = { router };
