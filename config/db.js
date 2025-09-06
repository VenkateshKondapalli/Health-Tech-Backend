const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: "HEALTHCARE",
  })
  .then(() => {
    console.log("----DB CONNECTED-----");
  })
  .catch((err) => {
    console.log("----DB CONNECTION ERROR----");
    console.log(err.message);
  });
