import Factory from "./Factory.js";
import CountryFactory from "./CountryFactory.js";

import fetch from "node-fetch";
import * as cheerio from "cheerio";

const { createConnection, getConnection } = typeorm;
import typeorm from "typeorm";

class ZooFactory extends Factory {
  constructor() {
    super();
    this.scrapeURL = "https://en.wikipedia.org/wiki/List_of_zoos_by_country";
    this.zoos = [];
  }

  // get free data from wikiyeah
  async scrape() {
    const r = await fetch(this.scrapeURL);
    const webpage = await r.text();
    const $ = cheerio.load(webpage);

    const titleTags = $("h3");

    titleTags.each((ind, titleTag) => {
      const a = $(titleTag).next().find("li > a");
      a.each((ind, aTag) => {
        this.zoos.push({
          country: $(titleTag).find(".mw-headline a").text(),
          name: $(aTag).html(),
        });
      });
    });
  }

  async make() {
    if (this.zoos <= 0) {
      await this.scrape();
    }

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

export default new ZooFactory();
