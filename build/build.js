const fs = require("fs");
const path = require("path");
const stripJsonComments = require("strip-json-comments");

/** @type {{ [key: string]: string }} */
const mapping = JSON.parse(
  stripJsonComments(
    fs.readFileSync(path.join(__dirname, "icon-mapping.jsonc"), "utf8")
  )
);

const dealiased = Object.fromEntries(
  Object.entries(mapping).map(([name, symbol]) => {
    const match = /^\[(.+)\]$/.exec(symbol);
    return [name, match ? mapping[match[1]] : symbol];
  })
);

const theme = {
  fonts: [
    {
      id: "sf-pro",
      src: [{ path: "SF-Pro.ttf", format: "ttf" }],
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
  path.join(path.dirname(__dirname), "theme", "sf-symbols-theme.json"),
  JSON.stringify(theme, null, 2)
);
