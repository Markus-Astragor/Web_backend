const { createOrder } = require('./createOrder');
const { Dishes, Orders } = require('../../../models');
const { Types } = require('mongoose')

jest.mock('../../../models', () => {
  const mockDishes = {
    find: jest.fn()
  };

  const mockOrders = {
    save: jest.fn()
  };

  return {
    Dishes: mockDishes,
    Orders: jest.fn(() => mockOrders)  // Mock Orders as a constructor function
  };
});


describe('create order', () => {
  it('doesn`t create an order if dish.quantity <= 0', async () => {
    const req = {
      body: { dishes: [{ quantity: 0 }] }
    };

    const res = {
      status: jest.fn().mockImplementation(() => res),
      send: jest.fn()
    };

    await createOrder(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should return an error if dish is not found', async () => {
    const req = {
      body: {
        dishes: [{ dishId: '5b486d4057d0e42a3ca9c101' }, { dishId: '5b486d4057d0e42a3ca9c102'}]
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    const mockFind = jest.fn().mockResolvedValue([
      { _id: '5b486d4057d0e42a3ca9c101' },
      { _id: '5b486d4057d0e42a3ca9c103' }
    ]);
    Dishes.find.mockImplementation(mockFind);

    await createOrder(req, res);

    // Перевірити, що Dishes.find() було викликано з відповідними аргументами
    const expectedIds = [
      new Types.ObjectId('5b486d4057d0e42a3ca9c101'),
      new Types.ObjectId('5b486d4057d0e42a3ca9c102')
    ];

    expect(Dishes.find).toHaveBeenCalledWith({
      _id: { $in: expectedIds }
    });


    // Перевірити, що було викликано res.status(400).send() з відповідним повідомленням
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return an error if dish is not available', async () => {
    const req = {
      body: { dishes: [{ dishId: '5b486d4057d0e42a3ca9c101', isAvailable: true }, { dishId: '5b486d4057d0e42a3ca9c102', isAvailable: true}] }
    }

    const res = {
      status: jest.fn().mockImplementation(() => res),
      send: jest.fn()
    };


    const mockFind = jest.fn().mockResolvedValue([
      { _id: '5b486d4057d0e42a3ca9c101',  isAvailable: true},
      { _id: '5b486d4057d0e42a3ca9c102',  isAvailable: false}
    ]);

    Dishes.find.mockImplementation(mockFind);
    

    await createOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(400);


  })


  it('successfull', async () => {
    const req = {
      body: {
        dishes: [{ dishId: '5b486d4057d0e42a3ca9c101', isAvailable: true }, { dishId: '5b486d4057d0e42a3ca9c102', isAvailable: true}]
      }
    };
  
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  
    const mockDoc = [{ dishId: '5b486d4057d0e42a3ca9c101', isAvailable: true }, { dishId: '5b486d4057d0e42a3ca9c102', isAvailable: true}]
  
    const mockFind = jest.fn().mockResolvedValue([
      { _id: '5b486d4057d0e42a3ca9c101',  isAvailable: true},
      { _id: '5b486d4057d0e42a3ca9c102',  isAvailable: true}
    ]);
  
    Dishes.find.mockImplementation(mockFind);
    Orders.save = jest.fn().mockResolvedValue(mockDoc);
  
    await createOrder(req, res);
  
    expect(res.status).toHaveBeenCalledWith(200);
  });
  
});
