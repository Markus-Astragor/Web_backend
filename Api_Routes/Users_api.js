//Підключення необхідних файлів і моделей
const { Users } = require('../models/Users');
const Router = require('express');
const router = Router();
const crypto = require('crypto');


router.post('/users', async (req, res)=> {

    const {email, password} = req.body;
    Users.findOne({email: email}, async (err, result) => {

      if(err){
        console.log('Some error', err);
      }

      if (result) {
        // користувач з такою електронною адресою уже існує
        res.status(400).send('This email is already in use');
      } else {
        
        // генерація унікального apiKey для нового користувача
        let apiKey = crypto.randomBytes(20).toString('hex');
        const result = await Users.findOne({apiKey: apiKey});

        while(result){
          apiKey = crypto.randomBytes(20).toString('hex');
          result = await Users.findOne({apiKey: apiKey});
        }
        if(!password){
          console.log('Password should contain symbols');
          return res.status(400).send('Password should contain symbols')
        }
        if(!email){
          console.log('Email should contain symbols');
          return res.status(400).send('Email should contain symbols')
        }
        const user =  new Users({ email: email, password: password, apiKey: apiKey })
        const doc = await user.save();

        res.send(doc);

      }

    })

})

module.exports = { router };


