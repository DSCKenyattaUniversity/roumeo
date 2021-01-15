const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const letters = require("./src/routes");

(function server1() {
  // express instance
  const app = express();

  // connect to db
  (async function connect() {
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://localhost:27017/roumeo",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  })();

  // event listener for mongoose connection
  mongoose.connection
    .once("open", () => {
      console.log("connected to romeo db!");
    })
    .on("error", (error) => {
      console.log("connection error !! ", error);
    });

  // const httpPort = 8085;
  let port = process.env.PORT; // eslint-disable-next-line no-console
  if (port == null || port == "") {
    port = 8000;
  }

  // static folder
  app.use(express.static(path.join(__dirname, "public")));

  // body parser
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  // Logging for each request middle ware
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const pathto = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${pathto}`;
    console.log(m);
    next();
  });

  // routes
  app.use("/", letters);

  // app start
  app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
  });
})();
