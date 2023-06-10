const { createOrder } = require('./createOrder');

jest.mock('../../../models', () => {
  const mockDishes = {
    find: jest.fn()
  };

  return {
    Dishes: mockDishes,
    Orders: {}
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

  it('', () => {
    
  })
  

});
