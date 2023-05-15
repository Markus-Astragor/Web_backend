const Router = require('express');
const router = Router();
const { Sales } = require('../models/Sales');

router.get('/sales', async (req, res) => {
  try {
    const storeLocation = req.query.storeLocation; //отримуємо значенння storeLocation
    const customer_age = req.query.customer_age;
    const customer_emailDomain = req.query.customer_emailDomain;
    const couponUsed = req.query.couponUsed;
    const items_tags = req.query.items_tags;
  
    console.log(customer_age);

    const queryDb = {};                           //об'єкт у який я записую всі поля, щоб по ньому шукати потім в БД
    const regexForStar = /^(\*.*|.*\*)$/;         //регулярка, яка перевіряє чи перевірка має зірочку чи ні


    let part1, part2;

  if(storeLocation)
  {
    if (regexForStar.test(storeLocation)) 
    {                           // перевіряємо чи наша стрічка містить умови, які нам потрібні, тобто зірочка або спочатку, або в кінці
      if (storeLocation.startsWith('*')) 
      {                            //якщо починається з *
        part1 = '*';
        part2 = storeLocation.substring(1);
        //створюємо регулярку, яка буде шукати з * на почтаку і таким чином знаходити все, що після * шукати як кінець слова

        const regex = new RegExp(`${part2}$`, 'i');

        const sales = await Sales.find({ storeLocation: { $regex: regex } });

      //  return  res.status(200).send(sales);
      queryDb.storeLocation = { $regex: regex };

      }
      else if (storeLocation.endsWith('*')) 
      {                           
        part1 = storeLocation.substring(0, storeLocation.length - 1);//щоб отримати правильний індекс символу 
        part2 = '*';
        //Створюємо руглярку
        const regex = new RegExp('^' + storeLocation.replace('*', '.*'), 'i');

        //вертаємо відповідь Бази даних
        const sales = await Sales.find({ storeLocation: { $regex: regex } });//дозволяє виконувати використовувати регулярний вираз у фільтрі запиту

      //  return res.status(200).send(sales);
      queryDb.storeLocation = { $regex: regex };

      }
    }

    if (storeLocation.includes('\*')) 
    {                           
      // наш роздільник
      let delimeter = '\*';
      let str = storeLocation.split(delimeter);
      let part1 = str[0].slice(0, -1);
      let part2 = str[1];
      let middleRegex = new RegExp(`^${part1}.*${part2}$`, `i`);
      //шукаємо в базі даних за регуляркою
      const sales = await Sales.find({storeLocation: {$regex: middleRegex}});
      // return res.status(200).send(sales);
      queryDb.storeLocation = {$regex: middleRegex};

    }
  }

    if(customer_emailDomain)
    {  
      const regex = new RegExp(`${customer_emailDomain}$`, 'i');
      const sales = await Sales.find({ "customer.email": {$regex: regex}});
      queryDb['customer.email'] = {$regex: regex};
    }

    if(couponUsed)            //шукаємо чи couponused true або false
    {
      const sales = await Sales.find({couponUsed: couponUsed});
      queryDb.couponUsed = couponUsed;
    }
    
    console.log(items_tags);

    if(items_tags)
    {
      if(items_tags.includes(','))
      {
        let delimeter = ','; ///наш дільник - це кома між тегами, наприклад: kids, travel
        let items_tags_str_array = items_tags.split(delimeter); // ['kids', 'travel']
        let part1 = items_tags_str_array[0].trim(); //очищаємо від пробілів
        let part2 = items_tags_str_array[1].trim();
        console.log('part1:',part1,'part2:',part2);
        const regex = new RegExp(`(${part1}|${part2})`, 'i');
        console.log('regex:',regex);
        const sales = await Sales.find({"items.tags": {$regex: regex}});
        queryDb['items.tags'] = {$regex: regex};
      }
    }

    if(customer_age)
    {
      let customer_age_parsed = JSON.parse(customer_age);

      if(customer_age_parsed.gt)
      {
        const sales = await Sales.find({"customer.age": {$gt: customer_age_parsed.gt}});
        queryDb['customer.age'] = {$gt: customer_age_parsed.gt};
      }

      if(customer_age_parsed.lt)
      {
        const sales = await Sales.find({"customer.age": {$lt: customer_age_parsed.lt}});
        queryDb['customer.age'] = {$lt: customer_age_parsed.lt};
      }

      if(customer_age_parsed.gt && customer_age_parsed.lt)
      {
        if(customer_age_parsed.lt < customer_age_parsed.gt) // перевірка чи lt є більшим за gt
        {
         return res.status(404).send('lt повинне бути більшим за gt');
        }
        const sales = await Sales.find({"customer.age": {$gt: customer_age_parsed.gt, $lt: customer_age_parsed.lt}});
        queryDb['customer.age'] = {$gt: customer_age_parsed.gt, $lt: customer_age_parsed.lt};
      }
    }

     const sales = await Sales.find( queryDb );

     res.status(200).send(sales);

  } catch (error) {
    console.log('An error was occured: ', error);
  }
})

module.exports = { router }