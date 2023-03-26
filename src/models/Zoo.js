import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Zoo",
  tableName: "zoos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    country: {
      target: "Country",
      type: "many-to-one",
      joinColumn: true,
    },
    animals: {
      target: "Animal",
      type: "many-to-many",
      joinTable: {
        name: "animal_zoo",
      },
    },
  },
});
