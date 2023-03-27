import "dotenv/config";
import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from "../../models/entities.js";
import minimist from "minimist";

const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_URL,
  entities
);
