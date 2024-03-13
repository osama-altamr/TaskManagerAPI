const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: `${__dirname}/config.env` });
const DB = process.env.DATABASE;

mongoose.connect(DB, {}).then(() => {
  console.log("DB connection succussesfull !");
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("App running...on port: " + port);
});
