import express from "express";
import "dotenv/config";
import { create } from "express-handlebars";
import bodyParser from "body-parser";

import DataSource from "./lib/DataSource.js";
import { VIEWS_PATH } from "./consts.js";
import { home } from "./controllers/home.js";

const app = express();
app.use(express.static("public"));

/**
 * Handlebars Init
 */
const hbs = create({
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

// When sending data via a body (e.g. POSTing a form)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * App Routing
 */
app.get("/", home);

/**
 * Init TypeORM
 */
// start the server
DataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });

export default app;
