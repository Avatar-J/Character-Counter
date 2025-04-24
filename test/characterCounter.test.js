"use strict";

const {
  setMaxLength,
  countWords,
  countSentences,
  countCharacters,
} = require("../scripts/index.js");

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

describe("Test should correctly count words, characters and sentences", () => {
  //test for word count
  test("test for word count", () => {
    expect(countWords("I want to be a millonaire")).toBe("06");
  });

  //test for sentence count
  test("test for sentence count", () => {
    expect(
      countSentences("I want to be a millonaire. I want to trave the world.")
    ).toBe("02");
    expect(
      countSentences("I want to be a millonaire! I want to trave the world.")
    ).toBe("02");
    expect(
      countSentences("I want to be a millonaire? I want to trave the world.")
    ).toBe("02");
  });

  //test for character count

  //when space is included
  test("test for character count with space included", () => {
    expect(countCharacters("I want to be a millonaire", false, 0)).toBe(25);
  });

  //when space is excluded
  test("test for character count with space excluded", () => {
    expect(countCharacters("I want to be a millonaire", true, 0)).toBe(20);
  });

  //test for empty input
  test("test for empty input", () => {
    expect(countCharacters("", false, 0)).toBe(0);
  });

  //test for excessive white space
  test("test for excessive white space", () => {
    expect(countCharacters("     ", true, 0)).toBe(0);
  });

  //test for special characters
  test("test for special characters", () => {
    expect(countCharacters("!@#$%^&*()_+", false, 0)).toBe(12);
  });
});
