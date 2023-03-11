//Підключення необхідних файлів і моделей
const { Users } = require('../models/Users');
const Router = require('express');
const bodyParser = require('body-parser');
const router = Router();
const crypto = require('crypto');


router.post('/users', bodyParser.json() , (req, res)=> {
    const email = req.body.email;
    const password = req.body.password;
    Users.findOne({email: email}, (err, result) => {

      if (result) {
        // користувач з такою електронною адресою уже існує
        res.status(400).send('This email is already in use');
      } else {
        // генерація унікального apiKey для нового користувача
        const apiKey = crypto.randomBytes(20).toString('hex');
      

        const user =  new Users({ email: email, password: password, apiKey: apiKey })
        // const doc = user.save();

        res.send(user);

      }

    })

})

module.exports = { router };


