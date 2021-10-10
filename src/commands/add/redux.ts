const { findPath, prompt } = require("../../utils/index");
const _ = require("lodash");

const { addReducer } = require("./reducer");
const { addAction } = require("./action");
const { addSelector } = require("./selector");
const { addSaga } = require("./saga");
const { addTypes } = require("./types");

export const addRedux = async (name: string) => {
  const answers = await prompt({
    options: ["reducer", "action", "saga", "selector", "types", "all"],
    message: `select what would you like to add into ${name}`,
    name,
  });

  const { path } = findPath(`states/${name}`);
  const types = [
    String(name).toUpperCase(),
    String(name + "_success").toUpperCase(),
    String(name + "_failed").toUpperCase(),
  ];

  _.map(answers, async (option: string) => {
    if (option === "reducer" || option === "all") {
      addReducer(name, types, path);
    }

    if (option === "action" || option === "all") {
      addAction(name, types, path);
    }

    if (option === "selector" || option === "all") {
      addSelector(name, path);
    }

    if (option === "saga" || option === "all") {
      addSaga(name, types, path);
    }

    if (option === "types" || option === "all") {
      addTypes(name, types, path);
    }
  });
};
