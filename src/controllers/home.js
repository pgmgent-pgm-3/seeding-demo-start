/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  // get repositories
  const navigationItemRepository = DataSource.getRepository("NavigationItem");

  // fetch the menu items
  const menuItems = await navigationItemRepository.find();

  res.render("home", {
    menuItems,
  });
};
