const prettier = require("prettier");
import jetpack from "fs-jetpack";
export const formatFile = async (p: string) => {
  const text = await jetpack.readAsync(p, "utf8");
  prettier.resolveConfigFile().then((filePath: string) => {
    prettier.resolveConfig(filePath).then((_options: any) => {
      const formatted = prettier.format(text, { parser: "babel-flow" });
      jetpack.write(p, formatted);
    });
  });
};
