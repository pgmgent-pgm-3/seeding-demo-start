import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class TypeFactory extends Factory {
  constructor() {
    // roep de constructor van de parent class aan
    super();

    // this.types = [
    //   "zoogdieren",
    //   "reptielen",
    //   "vissen",
    //   "amfibieën",
    //   "insecten",
    //   "spinnen",
    //   "vogels",
    // ];

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

  // generate one type
  async make() {
    await this.makeMany();
  }

  // generate many types
  async makeMany() {
    for (const type of this.types) {
      const record = await this.insert(type);
      this.inserted.push(record);
    }
  }

  // insert in the database
  async insert(name) {
    const typeRepo = DataSource.getRepository("Type");

    // check if record exists
    let record = await typeRepo.findOne({ where: { name } });
    if (record) return record;

    // it doesn't exist, so create it
    record = await typeRepo.save({ name });

    // return the record
    return record;
  }
}

export default new TypeFactory();
