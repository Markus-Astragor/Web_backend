const { deleteDish } = require('./delete');
const { Types } = require('mongoose');

const DishesMock = {};

jest.mock('../../../models', () => {
    DishesMock.deleteOne = jest.fn();
    return {
        Dishes: {
            deleteOne: DishesMock.deleteOne
        }
    };
});

describe('method delete is working', () => {
    it('deleteOne is working', async () => {
        const req = {
            params: { _id: Types.ObjectId().toHexString() }
        }

        const res = {
            status: jest.fn().mockImplementation(() => res),
            send: jest.fn()
        }

        await deleteDish(req, res);

        expect(DishesMock.deleteOne).toHaveBeenCalledWith({ _id: expect.any(Object) });
        expect(res.status).toBeCalledWith(200);
    })
})
