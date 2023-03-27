import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class TypeFactory extends Factory {
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
    //  console.log("This record will be inserted:", name);
    const typeRepo = DataSource.getRepository("type");

    // check if record exists
    let record = await typeRepo.findOne({ where: { name } });
    if (record) return record;

    // it doesn't exist, so create it
    record = await typeRepo.create({ name });

    // return the record
    return record;
  }
}

export default new TypeFactory();
