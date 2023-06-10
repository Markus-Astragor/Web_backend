const { Types } = require('mongoose');
const { Orders, Dishes } = require('../../../models');
const { createOrder } = require('./createOrder');
const mongoose = require('mongoose');

describe('createOrder', () => {
  beforeAll(async () => {
    // Підключення до бази даних
    await mongoose.connect(process.env.MONGO_DB_URI, {
      auth: {
        username: process.env.MONGO_DB_LOGIN,
        password: process.env.MONGO_DB_PASSWORD
      }
    });

    await Dishes.insertMany([
        { price: 45, isAvailable: true, _id: '5b486d4057d0e42a3ca9c101', name: 'Mykola' },
        { price: 56, isAvailable: true, _id: '5b486d4057d0e42a3ca9c102', name: 'Orest' },
        { price: 465, isAvailable: true, _id: '5b486d4057d0e42a3ca9c103', name: 'Tolik' },
        { price: 56, isAvailable: true, _id: '5b486d4057d0e42a3ca9c107', name: 'Bodya' },
        { price: 45, isAvailable: false, _id: '5b486d4057d0e42a3ca9c106', name: 'Oastapchikk' },
        { price: 56, isAvailable: true, _id: '5b486d4057d0e42a3ca9c105', name: 'Markuss-Astragor' },
      ])
  });

  afterAll(async () => {
    // Очищення колекції Orders після завершення тестів
    await Orders.deleteMany();
    // Відключення від бази даних
    await mongoose.disconnect();
  });

  it('should save order to the Orders collection', async () => {
    // Підготовка тестових даних
    const req = {
      body: {
        dishes: [
          { dishId: '5b486d4057d0e42a3ca9c101', isAvailable: true, quantity: 2 },
          { dishId: '5b486d4057d0e42a3ca9c102', isAvailable: true, quantity: 2 }
        ]
      }
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    // Виклик функції createOrder
    await createOrder(req, res);

    // Перевірка статусу відповіді
    expect(res.status).toHaveBeenCalledWith(200);

    // Перевірка виклику методу save на моделі Orders
    // expect(Orders.prototype.save).toHaveBeenCalled();

    // Отримання збереженого документа з бази даних
    // const savedOrder = await Orders.findOne();

    // Перевірка наявності збереженого документа
    // expect(savedOrder).toBeDefined();

    // Перевірка вмісту збереженого документа
    // expect(savedOrder.dishes.length).toBe(2);
    // expect(savedOrder.dishes[0].dishId).toBe('5b486d4057d0e42a3ca9c101');
    // expect(savedOrder.dishes[1].dishId).toBe('5b486d4057d0e42a3ca9c102');
  });
});
