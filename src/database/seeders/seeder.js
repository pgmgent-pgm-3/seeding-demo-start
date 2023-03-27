import "dotenv/config";
import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from "../../models/index.js";
import minimist from "minimist";
import TypeFactory from "../factories/TypeFactory.js";

const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_URL,
  entities
);

dbSeeder.run(TypeFactory).then(() => {
  console.log("Done seeding!");
});
