import DataSource from "../../lib/DataSource.js";

export const deleteAnimal = async (req, res) => {
    try{
        const { id } = req.params;

        if(!id) throw new Error("Please specify an id to remove.");

        const animalsRepository = DataSource.getRepository("animals");

        const animal = await animalsRepository.findOne(id);

        if(!animal) throw new Error(`Animal with ${id} not found.`);

        await animalsRepository.remove(animal);

        res.redirect("/animals");
    }
    catch(error){
        console.log(error);
    }
    // const animalsRepository = DataSource.getRepository("animals");

    // const animal = await animalsRepository.findOne(req.params.id);
    // await animalsRepository.remove(animal);

    // res.redirect("/animals");
}