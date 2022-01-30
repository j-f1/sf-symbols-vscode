const fs = require("fs");
const path = require("path");
const stripJsonComments = require("strip-json-comments");

/** @type {{ [key: string]: string }} */
const mapping = JSON.parse(
  stripJsonComments(
    fs.readFileSync(path.join(__dirname, "product-icon-mapping.jsonc"), "utf8")
  )
);

const theme = {
  fonts: [
    {
      id: "SF-Pro",
      src: [{ path: "SF-Pro.woff", format: "woff" }],
      weight: "normal",
      style: "normal",
    },
  ],
  iconDefinitions: Object.fromEntries(
    Object.entries(mapping).map(([name, symbol]) => {
      const match = /^\[(.+)\]$/.exec(symbol);
      return [name, { fontCharacter: match ? mapping[match[1]] : symbol }];
    })
  ),
};

fs.writeFileSync(
  path.join(path.dirname(__dirname), "theme", "product-theme.json"),
  JSON.stringify(theme, null, 2).replace(
    /fontCharacter": "(..)"/g,
    (_, ch) =>
      String.raw`fontCharacter": "\\${ch
        .codePointAt()
        .toString(16)
        .padStart(4, "0")}"`
  )
);
