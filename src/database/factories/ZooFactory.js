import Factory from "./Factory.js";
import CountryFactory from "./CountryFactory.js";

import fetch from "node-fetch";
import * as cheerio from "cheerio";

import DataSource from "../../lib/DataSource.js";

class ZooFactory extends Factory {
    constructor() {
        super();
        this.zoos = [];
        this.inserted = [];
    }

    async scrape() {
        const r = await fetch("https://en.wikipedia.org/wiki/List_of_zoos_by_country");
        const html = await r.text();
        const $ = cheerio.load(html);	
        const titleTags = $("h3");

        titleTags.each((index, titleTag) => {
            const link = $(titleTag).next().find("li > a");
            link.each((index, link) => {
                this.zoos.push({
                    country: $(titleTag).find(".mw-headline a").text(),
                    name: $(link).html(),
                })
            });
        });
    }

    async make() {
        if(this.zoos <= 0){
            await this.scrape();
        }

        const randIndex = Math.floor(Math.random() * this.zoos.length);
        const randomZoo = this.zoos[randIndex];

        const record = await this.insert(randomZoo);

        this.inserted.push(record);
    }

    async insert({name, country}) {
        const repo = DataSource.getRepository("zoos");

        let record = await repo.findOne({where: {name: name}});

        if(!record){
            const countryRecord = await CountryFactory.insert(country);
            record = await repo.save({
                name: name,
                country:{
                    id: countryRecord.id
                }
            })
        }
        return record;
    }

}

export default new ZooFactory();