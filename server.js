const express = require("express");
const argv = require("yargs").argv;
const { mongoConnection } = require("./mongo/config");
const cors = require("cors");
const rootRouter = require("./src/routers/rootRouter");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(cors());
app.use("/api/2023", rootRouter);

mongoConnection();

const host = process.env.PORT || 8080;
app.listen(host, () => {
  console.log(`Server run on local host : ${host}`);
});
