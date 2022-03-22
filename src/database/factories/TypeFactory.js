import Factory from "./Factory.js";
import animal from "@fakerjs/animal";

const { createConnection, getConnection } = typeorm;
import typeorm from "typeorm";

class TypeFactory extends Factory {
  constructor() {
    super();
    this.types = [
      "ocean",
      "desert",
      "grassland",
      "forest",
      "farm",
      "pet",
      "zoo",
    ];
  }

  // make one record
  async make() {
    // make them all
    await this.makeMany();
  }

  // make many records
  async makeMany() {
    // for every type, do an insert
    for (const type of this.types) {
      const record = await this.insert(type);
      this.inserted.push(record);
    }
  }

  async insert(name) {
    const repo = getConnection().getRepository("Type");

    // record exists?
    let record = await repo.findOne({ where: { name } });
    if (record) return record;

    // create record
    record = await repo.save({ name });
    // return
    return record;
  }
}

export default new TypeFactory();
