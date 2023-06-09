const { updateDish } = require('./update');

const DishesMock = {};

jest.mock('../../../models', () => {
    DishesMock.findOneAndUpdate = jest.fn();
    return {
        Dishes: {
            findOneAndUpdate: DishesMock.findOneAndUpdate
        }
    };
});


describe('testing update method', () => {
    it('testing updating method working', async () => {
        const req = {
            body: { price: 45, isAvailable: false }
        };

        const res = {
            status: jest.fn().mockImplementation(() => res),
            send: jest.fn()
        };


        await updateDish(req, res);
        expect(DishesMock.findOneAndUpdate).toHaveBeenCalledWith({ price: 48 });
        expect(res.status).toBeCalledWith(200);

    })
})

