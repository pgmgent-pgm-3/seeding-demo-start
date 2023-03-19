import "dotenv/config";
import { DataSource } from "typeorm";

// connect to database
class DatabaseSeeder {
  constructor(type, database, entities) {
    this.type = type;
    this.database = database;
    this.entities = entities;
  }

  async connect() {
    const connection = new DataSource({
      type: this.type,
      database: this.database,
      entities: this.entities,
      synchronize: true,
    });
  }
}
