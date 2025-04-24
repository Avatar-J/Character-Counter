"use strict";

const {
  setMaxLength,
  countWords,
  countSentences,
  countCharacters,
  calculateReadingTime,
} = require("../scripts/index.js");

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
    setMaxLength(textArea, 50, true, false);
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
    expect(countCharacters("I want to be a millonaire", false)).toBe(25);
  });

  //when space is excluded
  test("test for character count with space excluded", () => {
    expect(countCharacters("I want to be a millonaire", true)).toBe(20);
  });

  //test for empty input
  test("test for empty input", () => {
    expect(countCharacters("", false)).toBe(0);
  });

  //test for excessive white space
  test("test for excessive white space", () => {
    expect(countCharacters("     ", true)).toBe(0);
  });

  //test for special characters
  test("test for special characters", () => {
    expect(countCharacters("!@#$%^&*()_+", false)).toBe(12);
  });
});

describe("Test for approximate reading time", () => {
  test("test reading time when words are less than 200", () => {
    expect(calculateReadingTime("00")).toBe(0);
  });

  test("test reading time when words are more than 200", () => {
    expect(calculateReadingTime("50")).toBe(1);
  });

  test("test reading time when words are less than 200", () => {
    expect(calculateReadingTime("300")).toBe(2);
  });
});

describe("counters should update when event is triggered when user types", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <textarea id="text-area" ></textarea>
         <div id="char-count">00</div>
         <div id="word-count">00</div>
         <div id="sentence-count">00</div>
    `;
    require("../scripts/index.js");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("test character update", () => {
    const charCountContainer = document.getElementById("char-count");
    const textArea = document.getElementById("text-area");
    textArea.value = "I want to be a millonaire. I want to travel the world.";
    textArea.dispatchEvent(new Event("input"));
    charCountContainer.textContent = countCharacters(textArea.value, false);
    expect(charCountContainer.textContent).toBe("54");
  });

  test("test word update", () => {
    const wordCountContainer = document.getElementById("word-count");
    const textArea = document.getElementById("text-area");
    textArea.value = "I want to be a millonaire. I want to travel the world.";
    textArea.dispatchEvent(new Event("input"));
    wordCountContainer.textContent = countWords(textArea.value);
    expect(wordCountContainer.textContent).toBe("12");
  });

  test("test sentence update", () => {
    const sentenceCountContainer = document.getElementById("sentence-count");
    const textArea = document.getElementById("text-area");
    textArea.value = "I want to be a millonaire. I want to travel the world.";
    textArea.dispatchEvent(new Event("input"));
    sentenceCountContainer.textContent = countSentences(textArea.value);
    expect(sentenceCountContainer.textContent).toBe("02");
  });
});
