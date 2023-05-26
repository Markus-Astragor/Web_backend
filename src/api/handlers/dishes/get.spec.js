const { getDishes } = require('./get');

const query = {};

describe('check query params', () => {
    it('should return error 400 if query is empty', () => {
        const req = { query: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

        getDishes(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalledWith({
            message: 'Parameter price has incorrect format'
        });
    })

    it('should not return 400 if query is not empty', () => {
        const req = { query: { price: '10' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
    
        checkQueryParams(req, res);
    
        expect(res.status).not.toBeCalled();
        expect(res.send).not.toBeCalled();
      });
})