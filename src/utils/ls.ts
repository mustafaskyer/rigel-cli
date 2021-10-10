import fs from "fs";
const { prompt } = require("./inqurier.util");
export const ls = async (path: string) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject("Unable to scan directory: " + err);
      }
      resolve(files);
    });
  });
};

export const getLsAnswers = async ({
  path,
  name,
  type,
}: {
  path: string;
  name: string;
  type: string;
}) => {
  return new Promise(async (resolve, _reject) => {
    const filesList: any = await ls(path);
    const filteredFiles = filesList?.map((f: string) =>
      f.replace(`.${type}`, "").replace(".js", "")
    );
    const answers = await prompt({
      options: filteredFiles,
      message: "select|search componets to import",
      name,
    });
    resolve(answers);
  });
};
