"use strict";
//variable for text area section
const textArea = document.getElementById("text-area");

const errorMessageContainer = document.getElementById("error-message");

function padZero(number) {
  return number.toString().padStart(2, "0");
}

//set max length of text area
function setMaxLength(
  textArea,
  limit,
  isSetCharacterLimitChecked,
  isExcludeSpaceChecked
) {
  if (isSetCharacterLimitChecked) {
    if (limit === "") {
      textArea.removeAttribute("maxlength");
    } else {
      const spacecount = countSpaceExcluded(
        textArea.value,
        isExcludeSpaceChecked
      );
      textArea.setAttribute("maxlength", Number(limit) + 1 + spacecount);
    }
  } else {
    textArea.removeAttribute("maxlength");
  }
}

//count space excluded
function countSpaceExcluded(textValue, isExcludeSpaceChecked) {
  const spaceExcluded = isExcludeSpaceChecked
    ? textValue.length - textValue.replace(/\s+/g, "").length
    : 0;
  return spaceExcluded;
}

function countWords(textValue) {
  const wordCount = textValue
    .split(/\s+/)
    .filter((word) => word.trim().length > 0).length;
  return padZero(wordCount);
}

function countSentences(textValue) {
  const sentenceCount = textValue
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0).length;
  return padZero(sentenceCount);
}

function countCharacters(textValue, isSpaceExcluded) {
  let charCount = 0;

  if (textValue.trim().length !== 0) {
    charCount = isSpaceExcluded
      ? textValue.replace(/\s+/g, "").length
      : textValue.length;
  }

  return charCount;
}

//function to update the counter when events occur
function updateCharCounter(textValue, isExcludeSpaceChecked) {
  const charCountContainer = document.getElementById("char-count");
  const charCount = countCharacters(textValue, isExcludeSpaceChecked);
  if (charCountContainer) {
    charCountContainer.textContent = padZero(charCount);
  }
}

//Calculate approximaate reading time
function calculateReadingTime(words) {
  words = Number(words);
  const readingSpeed = 200;
  const time = words / readingSpeed;
  return Math.ceil(time);
}

//function to show warning on text area when limit is reached
function errorStyleRemove() {
  if (errorMessageContainer) {
    errorMessageContainer.innerHTML = "";
  }
  if (textArea) {
    textArea.classList.remove("error-state");
    textArea.classList.add("text-area");
  }
}

//function to display warning when limit is exceeded
function displayErrorMessage(
  textValue,
  isSetCharacterLimitChecked,
  isSpaceExcluded,
  limit
) {
  const count = countCharacters(textValue, isSpaceExcluded);

  if (isSetCharacterLimitChecked) {
    if (limit !== "") {
      if (count > limit) {
        if (errorMessageContainer) {
          errorMessageContainer.innerHTML = `<img src="../assets/images/icon-info.svg" alt="info icon" width="14px" height="18px" style="min-height: 21px; line-height: 21px"/>
          <p>Limit reached! Your text exceeds <span id="limit-value">${limit}</span> characters</p>`;
        }

        if (textArea) {
          textArea.classList.add("error-state");
          textArea.classList.remove("text-area");
        }
      } else {
        errorStyleRemove();
      }
    } else {
      errorStyleRemove();
    }
  }
}

//listen for input in text area
textArea?.addEventListener("input", (event) => {
  const wordCountContainer = document.getElementById("word-count");
  const sentenceCountContainer = document.getElementById("sentence-count");
  textValue = event.target.value;

  //display the character count, word count and sentence count
  updateCharCounter(textValue, isExcludeSpaceChecked);
  wordCountContainer.textContent = countWords(textValue);
  sentenceCountContainer.textContent = countSentences(textValue);

  //display the reading time
  document.getElementById("approx-time").textContent = calculateReadingTime(
    countWords(textValue)
  );

  //check if limit is exceeded and display warning message
  displayErrorMessage(
    textValue,
    isSetCharacterLimitChecked,
    isExcludeSpaceChecked,
    limit
  );
});

module.exports = {
  countCharacters,
  countWords,
  countSentences,
  padZero,
  calculateReadingTime,
  setMaxLength,
  displayErrorMessage,
  updateCharCounter,
  errorStyleRemove,
};
