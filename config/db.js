const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
  });
  console.log(`MongoDB holbogdloo: ${connection.connection.host}`);
};

module.exports = connectDB;
