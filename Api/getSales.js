const Router = require('express');
const router = Router();
const { Sales } = require('../models/Sales');

router.get('/sales', async (req, res) => {
  const {_id} = req.query;
  const queryDb = {};
  
  if(_id){
    queryDb._id = _id;
  }

  const docs = await Sales.find(queryDb);

  return res.status(200).send(docs)
})

module.exports = { router }