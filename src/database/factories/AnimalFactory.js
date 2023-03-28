// import necessary factory and data source
import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";
import TypeFactory from "./TypeFactory.js";

// import faker thingz
import { faker } from "@faker-js/faker";
import animal from "@fakerjs/animal";

class AnimalFactory extends Factory {
  constructor() {
    super();
    this.types = TypeFactory.types;
  }

  async make() {
    // get a random type
    const randomIndex = Math.floor(Math.random() * this.types.length);
    const randomType = this.types[randomIndex];

    const beast = {
      name: animal({ type: randomType }),
      color: faker.color.human(),
      isFluffy: faker.datatype.boolean(),
      latinName: faker.lorem.word(),
    };

    const record = await this.insert(beast, randomType);
    this.inserted.push(record);
  }

  async insert(beast, type) {
    const repo = DataSource.getRepository("Animal");

    // check if animal not in database yet?
    let record = await repo.findOne({ where: { name: beast.name } });
    if (record) return record;

    // get or create the animal type
    const typeRecord = await TypeFactory.insert(type);

    // save the animal and link it to the type
    record = await repo.save({
      ...beast,
      type: typeRecord,
    });

    return record;
  }
}

export default new AnimalFactory();
