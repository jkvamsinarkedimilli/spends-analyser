const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/spendsanalyser"
    );
    console.log(`Connected on: ${connection.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectToDB;
