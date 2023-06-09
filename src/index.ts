import routes from "./routes";

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const MONGODB_URL = "mongodb://127.0.0.1:27017/rest-api-ts";

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`DataBase Connected !!!
  Db Name : ${mongoose.connection.name}`);
});
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});
server.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});

app.use("/", routes());
