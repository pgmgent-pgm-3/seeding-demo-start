// imports
import DatabaseSeeder from "./DatabaseSeeder.js";
import {
  TypeFactory,
  AnimalFactory,
  CountryFactory,
  ZooFactory,
  ZooAltFactory,
} from "../factories/index.js";
import entities from "../../models/index.js";

// new instance of db seeder
const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_NAME,
  entities
);

// seed with the type factory
// dbSeeder.run(TypeFactory).then((records) => {
//   console.log(`${records.length} seeded in db`);
//   console.log(records);
// });

// dbSeeder.run(AnimalFactory, 50).then((records) => {
//   console.log(`${records.length} seeded in db`);
//   console.log(records);
// });

// dbSeeder.run(CountryFactory, 200).then((records) => {
//   console.log(`${records.length} seeded in db`);
//   console.log(records);
// });

// dbSeeder.run(ZooFactory, 10).then((records) => {
//   //   console.log(`${records.length} seeded in db`);
//   //   console.log(records);
// });

dbSeeder.run(ZooAltFactory, 60).then((records) => {
  console.log(records);
});
