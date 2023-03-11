//Підключення необхідних файлів і моделей
const { Users } = require('../models/Users');
const Router = require('express');
const router = Router();
const crypto = require('crypto');


router.post('/users', async (req, res)=> {

    const {email, password} = req.body;
    Users.findOne({email: email}, async (err, result) => {

      if (result) {
        // користувач з такою електронною адресою уже існує
        res.status(400).send('This email is already in use');
      } else {
        
        // генерація унікального apiKey для нового користувача
        const apiKey = crypto.randomBytes(20).toString('hex');
        const user =  new Users({ email: email, password: password, apiKey: apiKey })
        const doc = await user.save();

        res.send(doc);

      }

    })

})

module.exports = { router };


