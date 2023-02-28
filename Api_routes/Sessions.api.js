//Підключення необхідних файлів і моделей

const { Sessions } = require('../models/Sessions');
const Router = require('express');

const router = Router();

router.get('/sessions', async (req, res) => {
  const { user_id } = req.query;
  const queryDb = {};

  if (user_id){
    queryDb.user_id = user_id
  }

  const docs = await Sessions.find(queryDb);

  return res.status(200).send(docs);

})


module.exports = { router }