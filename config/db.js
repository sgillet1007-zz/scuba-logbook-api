const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionString = process.env.MONGO_URI //|| 'mongodb+srv://boris123:boris123@gilletenterprises-v9xyo.mongodb.net/test?retryWrites=true&w=majority'
  console.log('Connection string = ',connectionString)
  const conn = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
