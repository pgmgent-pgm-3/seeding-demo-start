import "dotenv/config";
import { DataSource } from "typeorm";
import entities from "../../models/index.js";

// connect to database
export default class DatabaseSeeder {
  constructor(type, database, entities) {
    this.type = type;
    this.database = database;
    this.entities = entities;
    this.connection = null;
  }

  async connect() {
    this.connection = new DataSource({
      type: this.type,
      database: this.database,
      entities: this.entities,
      synchronize: true,
    });
  }
}
