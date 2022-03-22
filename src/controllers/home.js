/**
 * A Home Controller
 */

const { createConnection, getConnection } = typeorm;
import typeorm from "typeorm";

export const home = async (req, res) => {
  res.render("home", {
    // menuItems,
  });
};
