/**
 * @jest-environment jsdom
 */

"use strict";

const {
  countWords,
  countSentences,
  countCharacters,
  calculateReadingTime,
  setMaxLength,
  displayErrorMessage,
  updateCharCounter,
} = require("../scripts/utils.js");

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

//update character counter
describe("Test for updating character counter when typing", () => {
  beforeEach(() => {
    document.body.innerHTML = `
              <div id="char-count">00</div>
          `;
  });

  test("update when excludeSpace is toggled", () => {
    const charCountContainer = document.getElementById("char-count");
    updateCharCounter("I want to be a millonaire", true);
    expect(charCountContainer.textContent).toBe("20");
  });
});

//test for reading time
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

//testing for warning message when limit is reached
describe("testing for warning message", () => {
  beforeEach(() => {
    document.body.innerHTML = `
          <textarea id="text-area" ></textarea>
           <div id="error-message">
             <img/>
             <p id="warning">Limit reached! Your text exceeds</p>
          </div>
      `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });
  test("show warning message when limit is exceeded  ", () => {
    const warningMessage = document.getElementById("warning");
    displayErrorMessage(
      "I want to be a millonaire. I want to travel the world.",
      true,
      false,
      40
    );

    expect(warningMessage.innerHTML).toContain("Limit reached!");
  });

  test("warning should not show if within range", () => {
    const errorMessageContainer = document.getElementById("error-message");
    const textArea = document.getElementById("text-area");
    displayErrorMessage(
      "I want to be a millonaire. I want to travel the world.",
      true,
      false,
      100
    );

    expect(errorMessageContainer.innerHTML).toContain("");
    expect(textArea.classList.contains("error-state")).toBeFalsy();
  });
});

//testing for updates in DOM when user types in text area
describe("counters should update when event is triggered when user types", () => {
  let textArea;
  let charCountContainer;
  let wordCountContainer;
  let sentenceCountContainer;

  beforeEach(() => {
    document.body.innerHTML = `
        <textarea id="text-area"></textarea>
        <span id="approx-time">0</span>
        <div id="char-count">00</div>
        <div id="word-count">00</div>
        <div id="sentence-count">00</div>
      `;

    require("../scripts/utils.js");

    textArea = document.getElementById("text-area");
    charCountContainer = document.getElementById("char-count");
    wordCountContainer = document.getElementById("word-count");
    sentenceCountContainer = document.getElementById("sentence-count");

    textArea.value = "I want to be a millonaire. I want to travel the world.";
    textArea.dispatchEvent(new Event("input"));
  });

  test("test character update", () => {
    charCountContainer.textContent = countCharacters(textArea.value, false);
    expect(charCountContainer.textContent).toBe("54");
  });

  test("test word update", () => {
    wordCountContainer.textContent = countWords(textArea.value);
    expect(wordCountContainer.textContent).toBe("12");
  });

  test("test sentence update", () => {
    sentenceCountContainer.textContent = countSentences(textArea.value);
    expect(sentenceCountContainer.textContent).toBe("02");
  });

  test("test reading time update", () => {
    const readingTimeContainer = document.getElementById("approx-time");
    readingTimeContainer.textContent = calculateReadingTime(
      countWords(textArea.value)
    );
    expect(readingTimeContainer.textContent).toBe("1");
  });
});
