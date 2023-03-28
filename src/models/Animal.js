import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Animal",
  tableName: "animals",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    color: {
      type: "varchar",
    },
    isFluffy: {
      type: "boolean",
    },
    latinName: {
      type: "varchar",
    },
  },
  relations: {
    type: {
      target: "Type",
      type: "many-to-one",
      joinColumn: true,
    },
    zoos: {
      target: "Zoo",
      type: "many-to-many",
      joinTable: {
        name: "animal_zoo",
      },
      cascade: true,
    },
  },
});
