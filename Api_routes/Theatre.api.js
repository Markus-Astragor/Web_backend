const { Theaters } = require('../models/Theaters');
const { Router } = require('express');

const router = Router();

router.get('/theaters/:theaterId', async (req, res) => {
    const {theaterId} = req.params;
    const queryDb = {};

    if(theaterId)
    {
        queryDb.theaterId = theaterId;
    }  

    const docs = await Theaters.find(queryDb);

    return res.status(200).send(docs);
})


module.exports = { router };
