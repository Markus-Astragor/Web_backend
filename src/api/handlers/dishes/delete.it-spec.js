const mongoose = require('mongoose');
const { Dishes } = require('../../../models/dishes');
const { deleteDish } = require('./delete');


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


// afterAll(async () => {
//   await Dishes.deleteMany();
// })


it('should be deleted from db ', async () => {


  const req = { params: { _id: '5b486d4057d0e42a3ca9c105' } };
  const res = {
    send: jest.fn(),
    status: jest.fn().mockImplementation(() => res)
  };

  await deleteDish(req, res);

  const count = await Dishes.estimatedDocumentCount();
  expect(count).toBe(5);
  // const _id = res.send.mock.calls[0][0]._id;
  // console.log(_id);
  // const doc = await Dishes.findById(_id);

  expect(res.status).toBeCalledWith(200);

})