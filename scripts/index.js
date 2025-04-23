"use strict";

//background theme change
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("click", () => {
  const isDarkActive = document.body.classList.contains("dark-theme");
  if (!isDarkActive) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
});
