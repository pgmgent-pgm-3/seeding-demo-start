export default class Factory {
  constructor() {
    this.inserted = [];
  }

  async make() {
    throw new Error("Factory should contain a make method");
  }

  async makeMany(amount) {
    while (this.inserted.length < amount) {
      await this.make();
    }
  }
}
