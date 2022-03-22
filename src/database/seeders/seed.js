// imports
import DatabaseSeeder from "./DatabaseSeeder.js";
import { TypeFactory, AnimalFactory } from "../factories/index.js";
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

dbSeeder.run(AnimalFactory, 50).then((records) => {
  console.log(`${records.length} seeded in db`);
  console.log(records);
});
