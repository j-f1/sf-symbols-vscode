define([], function () {
  let interval = setInterval(() => {
    const styles = document.querySelectorAll("style");
    for (const style of styles) {
      if (!style.textContent.includes("pi-SF-Pro")) continue;

      console.log("Injecting SF Symbol icons... 💉");

      style.textContent = style.textContent
        .replace(/@font-face\s*\{.+?\}$/m, "")
        .replace(
          /('?)pi-SF-Pro\1/g,
          "SF Pro !important; font-feature-settings: 'ss15' on"
        );

      // close-dirty icon
      style.textContent += `.monaco-workbench .part.editor>.content .editor-group-container.active>.title .tabs-container>.tab.dirty>.tab-actions .action-label:not(:hover):before, .monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container>.tab.dirty>.tab-actions .action-label:not(:hover):before {
          content: "􀕩" !important;
          font-feature-settings: 'ss15' on !important;
        }`;

      clearInterval(interval);
      console.log("Successfully injected SF Symbol icons ✅");
    }
  }, 100);
});
