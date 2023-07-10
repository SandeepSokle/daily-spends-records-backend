const { mongoose } = require("mongoose");


const mongoConnection = () => {
  const url =
    "mongodb+srv://sandeepsokle12:1f4zT3nPakLDsEh7@cluster0.3gcwidb.mongodb.net/?retryWrites=true&w=majority";

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection established!!");
    })
    .catch((err) => {
      console.log("Connection to DB failed");
      console.log(err.message);
    });
  
};

module.exports = { mongoConnection };
