import "dotenv/config";
import minimist from "minimist";
import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from "../../models/index.js";
import TypeFactory from "../factories/TypeFactory.js";
import AnimalFactory from "../factories/AnimalFactory.js";
import CountryFactory from "../factories/CountryFactory.js";

const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_URL,
  entities
);

// dbSeeder.run(TypeFactory).then((records) => {
//   console.log("Inserted records:", records);
// });

// dbSeeder.run(AnimalFactory, 100).then((records) => {
//   console.log("Inserted these records: ", records);
// });

dbSeeder.run(CountryFactory, 100).then((records) => {
  console.log("Inserted these records: ", records);
});
