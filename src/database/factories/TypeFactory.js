import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

export default class TypeFactory extends Factory {
  constructor() {
    // roep de constructor van de parent class aan
    super();

    this.types = [
      "zoogdieren",
      "reptielen",
      "vissen",
      "amfibieën",
      "insecten",
      "spinnen",
      "vogels",
    ];
  }

  // generate one type
  async make() {
    await this.makeMany();
  }

  // generate many types
  async makeMany() {
    this.types.forEach(async (type) => {
      const record = await this.insert(type);
      this.inserted.push(record);
    });
  }

  // insert in the database
  async insert(name) {
    console.log("This record will be inserted:", name);
  }
}
