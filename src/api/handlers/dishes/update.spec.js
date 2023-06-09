const { updateDish } = require('./update');
const mongoose = require('mongoose')


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
            body: { price: 45, isAvailable: false }, params: { _id: new mongoose.Types.ObjectId('5b486d4057d0e42a3ca9c101') }
        };

        const res = {
            status: jest.fn().mockImplementation(() => res),
            send: jest.fn()
        };


        await updateDish(req, res);
        expect(DishesMock.findOneAndUpdate).toBeCalled();
        expect(res.status).toBeCalledWith(200);

    })
})

