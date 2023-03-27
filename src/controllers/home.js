/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  res.render("home", {
    menuItems: [
      { name: "Animals", url: "/animals" },
      { name: "Types", url: "/types" },
      { name: "Countries", url: "/countries" },
      { name: "Zoos", url: "/zoos" },
    ],
  });
};
