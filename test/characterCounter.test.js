"use strict";

const { setMaxLength } = require("../scripts/index.js");

// test for theme change
// describe("Switch the theme", () => {
//   beforeEach(() => {
//     document.body.innerHTML = `
//         <button id="theme-switch">Theme button</button>
//     `;
//     require("../scripts/index.js");
//   });

//   test("should add the dark theme when initially clicked", () => {
//     const themeSwitch = document.getElementById("theme-switch");
//     themeSwitch.click();
//     expect(document.body.classList.contains("dark-theme")).toBe(true);
//   });
// });

//test for setting maxlength of text area
describe("setting the maxlength attribute of text area", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <textarea id="text-area" ></textarea>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("sets the maxlength when setCharacterlimit is checked  ", () => {
    const textArea = document.getElementById("text-area");
    setMaxLength(textArea, 50, 0, true);
    expect(textArea.hasAttribute("maxlength")).toBeTruthy();
    expect(textArea.getAttribute("maxlength")).toBe("51");
  });
});
