//Підключення необхідних файлів і моделей
const { Users } = require('../models/Users');
const Router = require('express');
const router = Router();

router.post('/users', async (req, res)=> {
    const {email, password} = req.body;
    const user = new Users({
      email, password, apiToken: 'blabla'
    })

    const doc = await user.save()
    const queryDb = {};

    if(password){
      queryDb.password = password;
    }

    if(email){
      queryDb.email = email;
    }

    const docs = await Users.find(queryDb);

    return res.status(200).send(doc);
})

module.exports = { router };


