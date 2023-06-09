const mongoose = require('mongoose');
const { Dishes } = require('../../../models/dishes');
const { updateDish } = require('./update');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URI, {
        auth: {
            username: process.env.MONGO_DB_LOGIN,
            password: process.env.MONGO_DB_PASSWORD
        }
    });
    console.log(`mongoose was connected`);
    await Dishes.deleteMany();
    await Dishes.insertMany([
        { price: 45, isAvailable: true, _id: '5b486d4057d0e42a3ca9c101', name: 'Mykola' },
        { price: 56, isAvailable: false, _id: '5b486d4057d0e42a3ca9c102', name: 'Orest' },
        { price: 465, isAvailable: true, _id: '5b486d4057d0e42a3ca9c103', name: 'Tolik' },
        { price: 56, isAvailable: true, _id: '5b486d4057d0e42a3ca9c107', name: 'Bodya' },
        { price: 45, isAvailable: false, _id: '5b486d4057d0e42a3ca9c106', name: 'Oastapchikk' },
        { price: 56, isAvailable: true, _id: '5b486d4057d0e42a3ca9c105', name: 'Markuss-Astragor' },
    ])
});


afterAll(async () => {
    await Dishes.deleteMany();
})


it('should update the data in db', async () => {
    const req = {
        body: { price: 46, isAvailable: true },
        params: { _id: '5b486d4057d0e42a3ca9c101' }
    };

    const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn()
    };

    jest.spyOn(Dishes, 'findOneAndUpdate');

    await updateDish(req, res);

    expect(Dishes.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mongoose.Types.ObjectId(req.params._id) },
        expect.objectContaining({
            "$set": {"isAvailable": true, "price": 46}
        }),
        { new: true }
    );
});

