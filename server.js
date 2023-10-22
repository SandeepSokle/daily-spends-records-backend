const express = require("express");
const argv = require("yargs").argv;
const { mongoConnection } = require("./mongo/config");
const cors = require("cors");
const https = require("https")
const fs = require("fs")

const rootRouter = require("./src/routers/rootRouter");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(cors());
app.get("/",()=>{
  res.status(200).send("Hi User, Welcome")
})
app.use("/api/2023", rootRouter);

const base = "/etc/letsencrypt/live/moneyserver.webtechbharat.com/"
const PEM = `${base}/privkey.pem`
const CERT = `${base}/fullchain.pem`
const CHAIN = `${base}/chain.pem`

const options = {
  key: fs.readFileSync(PEM),
  cert: fs.readFileSync(CERT),
  ca: fs.readFileSync(CHAIN),
};

https.createServer(options, app).listen(443, () => {
  console.log("Listening securely on", 443);
});

mongoConnection();

const host = process.env.PORT || 8080;
app.listen(host, () => {
  console.log(`Server run on local host : ${host}`);
});
