define([], function () {
  let injectionCount = 8;
  const style = document.createElement("style");
  document.head.appendChild(style);
  let interval = setInterval(() => {
    const styles = document.querySelectorAll("style");
    let injected = false;
    for (const style of styles) {
      if (!style.textContent.includes("SF-Pro")) continue;

      console.log("Injecting SF Symbol icons... 💉");
      console.log("into:", style);
      injected = true;

      style.textContent = style.textContent
        .replace(/@font-face\s*\{[^}]+SF-Pro[^}]+\}$/m, "")
        .replace(/'pi-SF-Pro'/g, "SF Pro; font-feature-settings: 'ss15' on");

      if (style.className === "contributedFileIconTheme") {
        style.textContent = style.textContent
          .replace(
            /('?)SF-Pro\1/g,
            "SF Pro; font-feature-settings: 'ss15' on; font-size: 100%; text-align: right"
          )
          .replaceAll(
            "seti; background-image: unset;",
            "seti; background-image: unset; font-size: 150%"
          );
      } else {
        // close-dirty icon
        style.textContent += `.monaco-workbench .part.editor>.content .editor-group-container.active>.title .tabs-container>.tab.dirty>.tab-actions .action-label:not(:hover):before, .monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container>.tab.dirty>.tab-actions .action-label:not(:hover):before {
          content: "􀕩" !important;
          font-feature-settings: 'ss15' on !important;
        }`;
      }
    }

    if (injected) {
      injectionCount--;
      if (injectionCount) {
        console.log(
          "Performed replace for SF Symbols, retries left:",
          injectionCount
        );
      } else {
        clearInterval(interval);
        console.log("Successfully injected SF Symbol icons ✅");
      }
    }
  }, 30);
});
