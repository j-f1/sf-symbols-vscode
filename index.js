const vscode = require("vscode");
const path = require("path");

exports.activate = (context) => {
  new Extension(context).start();
};

class Extension {
  constructor(context) {
    this.context = context;
  }
  start() {
    let monkeyPatch = vscode.extensions.getExtension("iocave.monkey-patch");
    (async () => {
      if (monkeyPatch !== undefined) {
        await monkeyPatch.activate();
        monkeyPatch.exports.contribute("jedfox.sf-symbols", {
          folderMap: {
            sfsymbols: path.join(this.context.extensionPath, "custom-modules"),
          },
          browserModules: ["sfsymbols/injector"],
          mainProcessModules: [],
        });
      } else {
        vscode.window.showWarningMessage(
          "Monkey Patch extension is not installed. This extension will not work."
        );
      }
    })().catch(console.error);
  }
}
