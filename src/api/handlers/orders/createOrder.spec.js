const { createOrder } = require('./createOrder');

const OrdersMock = {};

jest.mock('../../../models', () => {
  OrdersMock.save = jest.fn();
  return {
    Dishes: jest.fn()
      .mockImplementation(() => {
        return { save: OrdersMock.save };
      }),
  };
});


describe('create order', () => {
  it('doesn`t create an order if dish.quatity <= 0', async () => {
      const req = {
        body: { dishes : [{quantity: 0}]}
      }

      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn()
       };


       await createOrder(req, res);
       expect(res.status).toBeCalledWith(400);
  })
})