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

    const beast = animal({ type: randomType });
    console.log(beast);
  }

  async insert() {}
}

export default new AnimalFactory();
