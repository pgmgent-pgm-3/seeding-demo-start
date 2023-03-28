import DataSource from "../lib/DataSource.js";

export const animals = async (req, res) => {
    const animalsRepository = DataSource.getRepository("animals");

    const animals = await animalsRepository.find();
    
    res.render("animals", {
        // data om mee te geven
        animals: animals,
    });   
};