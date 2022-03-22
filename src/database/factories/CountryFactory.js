import Factory from "./Factory.js";
import { faker } from "@faker-js/faker";

const { createConnection, getConnection } = typeorm;
import typeorm from "typeorm";

class CountryFactory extends Factory {
  constructor() {
    super();
  }

  async make() {
    const randomCountry = faker.address.country();

    const record = await this.insert(randomCountry);
    this.inserted.push(record);
  }

  async insert(name) {
    const repo = getConnection().getRepository("Country");

    // record exists?
    let record = await repo.findOne({ where: { name } });
    if (record) return record;

    // create record
    record = await repo.save({ name });

    // return
    return record;
  }
}

export default new CountryFactory();
