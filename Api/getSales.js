const Router = require('express');
const router = Router();
const { Sales } = require('../models/Sales');

router.get('/sales', async (req, res) => {
 try {
  const storeLocation = req.query.storeLocation; //отримуємо значенння storeLocation
  console.log(storeLocation);


  //Створюємо руглярку
  const regex = new RegExp('^' + storeLocation.replace('*', '.*'), 'i');

  //вертаємо відповідь Бази даних
  const sales = await Sales.find({storeLocation: {$regex: regex}});

  res.status(200).send(sales);


 } catch (error) {
    console.log('An error was occured: ',error);
 }
})

module.exports = { router }