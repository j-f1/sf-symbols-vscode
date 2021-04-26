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
    }
  }, 100);
});
