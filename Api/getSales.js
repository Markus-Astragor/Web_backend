const Router = require('express');
const router = Router();
const { Sales } = require('../models/Sales');

router.get('/sales', async (req, res) => {
  try {
    const storeLocation = req.query.storeLocation; //отримуємо значенння storeLocation
    // const customer_age = req.query.customer_age;
    const customer_emailDomain = req.query.customer_emailDomain;

    const regexForStar = /^(\*.*|.*\*)$/;

    let part1, part2;

    if (regexForStar.test(storeLocation)) {// перевіряємо чи наша стрічка містить умови, які нам потрібні, тобто зірочка або спочатку, або в кінці
      if (storeLocation.startsWith('*')) { //якщо починається з *
        part1 = '*';
        part2 = storeLocation.substring(1);
        //створюємо регулярку, яка буде шукати з * на почтаку і таким чином знаходити все, що після * шукати як кінець слова

        const regex = new RegExp(`${part2}$`, 'i');

        const sales = await Sales.find({ storeLocation: { $regex: regex } });

        res.status(200).send(sales);

      }
      else if (storeLocation.endsWith('*')) {
        part1 = storeLocation.substring(0, storeLocation.length - 1);//щоб отримати правильний індекс символу 
        part2 = '*';
        //Створюємо руглярку
        const regex = new RegExp('^' + storeLocation.replace('*', '.*'), 'i');

        //вертаємо відповідь Бази даних
        const sales = await Sales.find({ storeLocation: { $regex: regex } });//дозволяє виконувати використовувати регулярний вираз у фільтрі запиту

        res.status(200).send(sales);
      }
    }

    if (storeLocation.includes('\*')) {
      // наш роздільник
      let delimeter = '\*';
      let str = storeLocation.split(delimeter);
      let part1 = str[0].slice(0, -1);
      let part2 = str[1];
      let middleRegex = new RegExp(`^${part1}.*${part2}$`, `i`);
      //шукаємо в базі даних за регуляркою
      const sales = await Sales.find({storeLocation: {$regex: middleRegex}});
      res.status(200).send(sales);
    }

    if(customer_emailDomain){
      
      const regex = new RegExp(`${customer_emailDomain}$`, 'i');
      const sales = await Sales.find({ "customer.email": {$regex: regex}});
      res.status(200).json(sales);
      
    }

    // const sales = await Sales.find({ storeLocation: storeLocation });

    // res.status(200).send(sales);

  } catch (error) {
    console.log('An error was occured: ', error);
  }
})

module.exports = { router }