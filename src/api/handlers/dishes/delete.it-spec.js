const mongoose = require('mongoose');
const { Dishes } = require('../../../models/dishes');
const { deleteDish } = require('./delete');
const { Types } = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
    auth: {
      username: process.env.MONGO_DB_LOGIN,
      password: process.env.MONGO_DB_PASSWORD
    }
  });
  console.log(`mongoose was connected`);
});


afterAll(async () => {
  await Dishes.deleteMany();
})


it('should be deleted from db ', async () => {


  const req = { params: { _id: Types.ObjectId().toHexString() } };
  const res = {
    send: jest.fn(),
    status: jest.fn().mockImplementation(() => res)
  };

  await deleteDish(req, res);
  const _id = res.send.mock.calls[0][0]._id;
  const doc = await Dishes.findById(_id);

  expect(doc).toBeNull();

})