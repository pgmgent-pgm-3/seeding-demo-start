import Factory from "./Factory.js";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import DataSource from "../../lib/DataSource.js";

class CountryFactory extends Factory {
    constructor() {
        super();
        this.countries = [];
        this.inserted = [];
    }

    async scrape() {
        const r = await fetch("https://en.wikipedia.org/wiki/List_of_zoos_by_country");
        const html = await r.text();
        const $ = cheerio.load(html);	
        const titleTags = $('.mw-headline a');
        titleTags.each((index, titleTag) => {
            this.countries.push($(titleTag).text());
        })

    }

    async make() {
        if(this.countries <= 0){
            await this.scrape();
        }

        const randIndex = Math.floor(Math.random() * this.countries.length);

        const randomCountry = this.countries[randIndex];

        const record = await this.insert(randomCountry);

        this.inserted.push(record);
    }

    async insert(name) {
        const repo = DataSource.getRepository("countries");

        let record = await repo.findOne({where: {name: name}});

        if(!record){
            record = await repo.save({name: name});
        }

        return record;
    }
}

export default new CountryFactory();