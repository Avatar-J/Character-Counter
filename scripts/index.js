"use strict";

const textArea = document.getElementById("text-area");
const charCountContainer = document.getElementById("char-count");
const wordCountContainer = document.getElementById("word-count");
const sentenceCountContainer = document.getElementById("sentence-count");

//background theme change
const themeSwitch = document.getElementById("theme-switch");

themeSwitch?.addEventListener("click", () => {
  const isDarkActive = document.body.classList.contains("dark-theme");
  if (!isDarkActive) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
});

//set max length of text area
function setMaxLength(textArea, limit, spacecount, isSetCharacterLimitChecked) {
  if (isSetCharacterLimitChecked) {
    if (limit == null) {
      textArea.removeAttribute("maxlength");
    } else {
      textArea.setAttribute("maxlength", Number(limit) + 1 + spacecount);
    }
  } else {
    textArea.removeAttribute("maxlength");
  }
}

//function to pad a number with zero if the digits are less than 2
function padZero(number) {
  return number.toString().padStart(2, "0");
}
//count words in text area
function countWords(textValue) {
  const wordCount = textValue
    .split(/\s+/)
    .filter((word) => word.trim().length > 0).length;
  return padZero(wordCount);
}

//count sentences in text area
function countSentences(textValue) {
  const sentenceCount = textValue
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0).length;
  return padZero(sentenceCount);
}

//count for characters in text area
function countCharacters(textValue, isSpaceExcluded, spaceCount) {
  let charCount = 0;

  if (textValue.trim().length !== 0) {
    charCount = isSpaceExcluded
      ? textValue.replace(/\s+/g, "").length
      : textValue.length;
    spaceCount = textValue.length - charCount;
  }

  return charCount;
}

//listen for input in text area
textArea?.addEventListener("input", (event) => {
  const textValue = event.target.value;
  const spaceCount = 0;
  const charCount = countCharacters(textValue, false, spaceCount);

  charCountContainer.textContent = padZero(charCount);
  wordCountContainer.textContent = countWords(textValue);
  sentenceCountContainer.textContent = countSentences(textValue);
});

module.exports = {
  setMaxLength,
  countWords,
  countSentences,
  countCharacters,
};
