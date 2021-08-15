define([], function () {
  let steps = 2;
  let interval = setInterval(() => {
    const style = document.querySelector(".contributedProductIconTheme");
    if (style && style.textContent.includes("pi-SF-Pro")) {
      console.log("Injecting 💉");
      steps--;
      if (steps == 0) clearInterval(interval);
      style.textContent = style.textContent
        .replace(/@font-face\s*\{.+?\}$/m, "")
        .replace(
          /pi-SF-Pro/g,
          "SF Pro !important; font-feature-settings: 'ss15' on"
        );

      // close-dirty icon
      style.textContent += `.monaco-workbench .part.editor>.content .editor-group-container.active>.title .tabs-container>.tab.dirty>.tab-actions .action-label:not(:hover):before, .monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container>.tab.dirty>.tab-actions .action-label:not(:hover):before {
          content: "􀕩" !important;
          font-feature-settings: 'ss15' on !important;
        }`;
    }
  }, 100);
});
