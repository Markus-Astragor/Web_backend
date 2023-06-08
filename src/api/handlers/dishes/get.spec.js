const { getDishes } = require('./get');

const query = {};

describe('check query params', () => {
    it('should return error 400 if query is empty', async() => {

        const req = { query: {price: '{}'} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

      await getDishes(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalledWith({
            message: 'Parameter price has incorrect format'
        });
    })

    it('should return 400 if query price is without gt or lt', async() => {

        const req = { query: { price: '10' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
    
      await getDishes(req, res);
        expect(res.status).toBeCalledWith(400);

      });

      it('should return error if we give incorrect data in isAvailable', async() => {

        const req = { query: { isAvailable: 'blabla' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
    
        await getDishes(req, res);
        expect(res.status).toBeCalledWith(400);
      })
})