"use strict";

const textArea = document.getElementById("text-area");
const charCountContainer = document.getElementById("char-count");
const wordCountContainer = document.getElementById("word-count");
const sentenceCountContainer = document.getElementById("sentence-count");
const excludeSpacesToggle = document.getElementById("spaces");
const setCharacterLimitToggle = document.getElementById("limit");
const characterLimitContainer = document.getElementById("limit-box");
const errorMessageContainer = document.getElementById("error-message");
const limitValueContainer = document.getElementById("limit-value");

let textValue = textArea?.value;
let isExcludeSpaceChecked = false;
let isSetCharacterLimitChecked = false;
let limit = "";

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
function setMaxLength(textArea, limit, isSetCharacterLimitChecked) {
  if (isSetCharacterLimitChecked) {
    if (limit === "") {
      textArea.removeAttribute("maxlength");
    } else {
      const spacecount = countSpaceExcluded(textArea.value);
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
function countCharacters(textValue, isSpaceExcluded) {
  let charCount = 0;

  if (textValue.trim().length !== 0) {
    charCount = isSpaceExcluded
      ? textValue.replace(/\s+/g, "").length
      : textValue.length;
  }

  return charCount;
}

//count space excluded
function countSpaceExcluded(textValue) {
  const spaceExcluded = textValue.split(" ").length - 1;
  return spaceExcluded;
}

//function to update the counter when events occur
function updateCharCounter(textValue, isExcludeSpaceChecked) {
  const charCount = countCharacters(textValue, isExcludeSpaceChecked);
  charCountContainer.textContent = padZero(charCount);
}

//Calculate approximaate reading time
function calculateReadingTime(words) {
  words = Number(words);
  const readingSpeed = 200;
  const time = words / readingSpeed;
  return Math.ceil(time);
}
//test area outline for error state
function errorStyleRemove() {
  errorMessageContainer.innerHTML = "";
  textArea.classList.remove("error-state");
  textArea.classList.add("text-area");
}
//event handlers on checkboxes
excludeSpacesToggle?.addEventListener("change", (event) => {
  isExcludeSpaceChecked = event.target.checked;
  updateCharCounter(textValue, isExcludeSpaceChecked);
});

setCharacterLimitToggle?.addEventListener("change", (event) => {
  if (event.target.checked) {
    document.getElementById("limit-box").style.display = "block";
    isSetCharacterLimitChecked = true;
  } else {
    limit = "";
    document.getElementById("limit-box").value = "";
    document.getElementById("limit-box").style.display = "none";
    isSetCharacterLimitChecked = false;
    setMaxLength(textArea, limit, isSetCharacterLimitChecked);
    errorStyleRemove();
  }
});

characterLimitContainer?.addEventListener("input", (event) => {
  limit = event.target.value;
  setMaxLength(textArea, limit, isSetCharacterLimitChecked);
  displayErrorMessage(charCount);
});

//listen for input in text area
textArea?.addEventListener("input", (event) => {
  textValue = event.target.value;

  //display the character count, word count and sentence count
  updateCharCounter(textValue, isExcludeSpaceChecked);
  wordCountContainer.textContent = countWords(textValue);
  sentenceCountContainer.textContent = countSentences(textValue);

  //display the reading time
  this.document.getElementById("approx-time").textContent =
    calculateReadingTime(countWords(textValue));
});

module.exports = {
  setMaxLength,
  countWords,
  countSentences,
  countCharacters,
};
