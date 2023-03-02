const { Theaters } = require('../models/Theaters');
const { Router } = require('express');

const router = Router();

router.get('/theaters', async (req, res) => {
    const {city, zipcode, latitude, longitude} = req.query;
    const queryDb = {};

    if(city){
        queryDb["location.address.city"] = city;
    }

    if(zipcode){
        queryDb["location.address.zipcode"] = zipcode;
    }

    if(latitude){
        queryDb["location.geo.coordinates.0"] = latitude;
    }

    if(longitude){
        queryDb["location.geo.coordinates.1"] = longitude;
    }

    const docs = await Theaters.find(queryDb);

    return res.status(200).send(docs);

})

module.exports = { router };