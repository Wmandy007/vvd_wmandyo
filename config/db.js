const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('useFindAndModify', false);
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo db connected on ${conn.connection.host}`);
  } catch (error) {
    console.log('db error');
  }
};

module.exports = connectDB;
