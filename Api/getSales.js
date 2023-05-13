const Router = require('express');
const router = Router();
const { Sales } = require('../models/Sales');

router.get('/sales', async (req, res) => {
  try {
    const storeLocation = req.query.storeLocation; //отримуємо значенння storeLocation

    const regexForStar = /^(\*.*|.*\*)$/;

    let part1, part2;

    if (regexForStar.test(storeLocation)) {// перевіряємо чи наша стрічка містить умови, які нам потрібні, тобто зірочка або спочатку, або в кінці
      if (storeLocation.startsWith('*')) { //якщо починається з *
        part1 = '*';
        part2 = storeLocation.substring(1);
        //створюємо регулярку, яка буде шукати з * на почтаку і таким чином знаходити все, що після * шукати як кінець слова

        const regex = new RegExp(`${part2}$`, 'i');

        const sales = await Sales.find({storeLocation: {$regex: regex}});

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

    // console.log('part1:', part1, 'part2:', part2);
    const sales = await Sales.find({storeLocation: storeLocation});

    res.status(200).send(sales);

  } catch (error) {
    console.log('An error was occured: ', error);
  }
})

module.exports = { router }