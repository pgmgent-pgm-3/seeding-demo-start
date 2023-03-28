import "dotenv/config";
import minimist from "minimist";
import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from "../../models/index.js";
import { TypeFactory, CountryFactory, AnimalFactory, ZooFactory } from "../factories/index.js";


const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_URL,
  entities
);


const { factory, amount = 1 } = minimist(process.argv.slice(2));

const logResponse = (records) => {
  console.log(`${records.length} records inserted.`);
  console.log("Inserted records:", records);
}

switch (factory) {
  case "type":
    dbSeeder.run(TypeFactory).then(logResponse);
    break;
  case "animal":
    dbSeeder.run(AnimalFactory, amount).then(logResponse);
    break;
  case "country":
    dbSeeder.run(CountryFactory, amount).then(logResponse);
    break;
  case "zoo":
    dbSeeder.run(ZooFactory, amount).then(logResponse);
}



// dbSeeder.run(TypeFactory).then((records) => {
//   console.log("Inserted records:", records);
// });

// dbSeeder.run(AnimalFactory, 100).then((records) => {
//   console.log("Inserted these records: ", records);
// });

// dbSeeder.run(CountryFactory, 100).then((records) => {
//   console.log("Inserted these records: ", records);
// });
