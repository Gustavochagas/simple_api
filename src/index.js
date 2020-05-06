const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const routes = require("./routes");
const env = require("../env");
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(
  `mongodb+srv://${env.USER_MONGO}:${env.PASSWORD_MONGO}@cluster0-ozbpa.mongodb.net/week10?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
