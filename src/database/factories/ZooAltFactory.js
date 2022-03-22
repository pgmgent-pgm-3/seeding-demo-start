import Factory from "./Factory.js";
import CountryFactory from "./CountryFactory.js";

import fetch from "node-fetch";
import * as cheerio from "cheerio";

const { createConnection, getConnection } = typeorm;
import typeorm from "typeorm";

class ZooAltFactory extends Factory {
  constructor() {
    super();
    this.scrapeURL = "https://tourscanner.com/blog/best-zoos-in-the-world/";
    this.zoos = [];
  }

  // get free data from wikiyeah
  async scrape() {
    const r = await fetch(this.scrapeURL);
    const webpage = await r.text();
    const $ = cheerio.load(webpage);

    const titleTags = $("h2 strong");

    titleTags.each((ind, tag) => {
      const zooTag = $(tag).html();
      const zooAndCountry = zooTag.split(" – ").pop();
      const onlyZoo = zooAndCountry.split(",").shift();
      console.log(onlyZoo);
    });
  }

  async make() {
    if (this.zoos <= 0) {
      await this.scrape();
    }

    return;
    const randIndex = Math.floor(Math.random() * this.zoos.length);
    const randomZoo = this.zoos[randIndex];

    const record = await this.insert(randomZoo);

    this.inserted.push(record);
  }

  async insert({ name, country }) {
    const repo = getConnection().getRepository("Zoo");

    let record = await repo.findOne({
      where: { name },
    });
    if (!record) {
      const countryRecord = await CountryFactory.insert(country);

      record = await repo.save({
        name: name,
        country: {
          id: countryRecord.id,
        },
      });
    }

    return record;
  }
}

export default new ZooAltFactory();
