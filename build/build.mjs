import { readFile, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import stripJsonComments from "strip-json-comments";
import fetch from "node-fetch";

const convertSymbols = (mapping) =>
  Object.entries(mapping).map(([name, symbol]) => {
    const match = /^\[(.+)\]$/.exec(symbol);
    return /** @type {const} */ ([
      name,
      { fontCharacter: match ? mapping[match[1]] : symbol },
    ]);
  });

const readJSONC = async (path) =>
  JSON.parse(
    stripJsonComments(await readFile(new URL(path, import.meta.url), "utf8"))
  );

const writeTheme = (path, theme) =>
  writeFile(
    new URL(path, import.meta.url),
    JSON.stringify(theme, null, 2).replace(
      /fontCharacter": "(..)"/g,
      (_, ch) =>
        String.raw`fontCharacter": "\\${ch
          .codePointAt()
          .toString(16)
          .padStart(4, "0")}"`
    ) + "\n"
  );

const sfPro = {
  id: "SF-Pro",
  src: [{ path: "SF-Pro.woff", format: "woff" }],
  weight: "normal",
  style: "normal",
};

await writeTheme("../theme/product-theme.json", {
  fonts: [sfPro],
  iconDefinitions: Object.fromEntries(
    convertSymbols(await readJSONC("./product-icon-mapping.jsonc"))
  ),
});

const fontResponse = await fetch(
  "https://raw.githubusercontent.com/microsoft/vscode/main/extensions/theme-seti/icons/seti.woff"
);
fontResponse.body.pipe(
  createWriteStream(new URL("../theme/seti.woff", import.meta.url))
);

const setiTheme = await fetch(
  "https://raw.githubusercontent.com/microsoft/vscode/main/extensions/theme-seti/icons/vs-seti-icon-theme.json"
).then((res) => res.json());

const fileIcons = await readJSONC("./file-icon-mapping.jsonc");

const makeIcon = (name, icon) => [
  name,
  {
    ...icon,
    fontId: "SF-Pro",
    fontColor: setiTheme.iconDefinitions[name]?.fontColor,
  },
];

await writeTheme("../theme/file-theme.json", {
  ...setiTheme,
  fonts: [
    {
      id: "seti",
      src: [
        {
          path: "./seti.woff",
          format: "woff",
        },
      ],
      weight: "normal",
      style: "normal",
      size: "150%",
    },
    { ...sfPro, fontSize: "90%" },
  ],
  iconDefinitions: {
    ...Object.fromEntries(
      Object.entries(setiTheme.iconDefinitions).map(([name, icon]) => [
        name,
        { ...icon, fontId: "seti" },
      ])
    ),
    ...Object.fromEntries(
      convertSymbols(fileIcons).flatMap(([name, icon]) => [
        makeIcon("_" + name + "_light", icon),
        makeIcon("_" + name, icon),
      ])
    ),
  },
  information_for_contributors: undefined,
});
