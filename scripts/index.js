"use strict";
//variable for text area section
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

//variables for letter density section
const fiveLetterDensityWrapper = document.getElementById("five-letter-density");
const restLetterDensityWrapper = document.getElementById("rest-letter-density");
const buttonContainer = document.querySelector(".sm-btn");
let isSeeMoreClicked = false;
let fiveLetterPercentages = {};
let restLetterPercentages = {};
const fiveLetterDensityHTML = {};
const restLetterDensityHTML = {};
let fiveLetterDensity = {};
let restLetterDensity = {};
let letterFrequencySorted = {};
let totalCharacters = 0;

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
function countSpaceExcluded(textValue, isExcludeSpaceChecked) {
  const spaceExcluded = isExcludeSpaceChecked
    ? textValue.length - textValue.replace(/\s+/g, "").length
    : 0;
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
  if (errorMessageContainer) {
    errorMessageContainer.innerHTML = "";
  }
  if (textArea) {
    textArea.classList.remove("error-state");
    textArea.classList.add("text-area");
  }
}
//function to display error message when limit is exceeded
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

//event handlers on checkboxes
excludeSpacesToggle?.addEventListener("change", (event) => {
  isExcludeSpaceChecked = event.target.checked;
  updateCharCounter(textValue, isExcludeSpaceChecked);
  setMaxLength(
    textArea,
    limit,
    isSetCharacterLimitChecked,
    isExcludeSpaceChecked
  );
  displayErrorMessage(
    textValue,
    isSetCharacterLimitChecked,
    isExcludeSpaceChecked,
    limit
  );
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
    setMaxLength(
      textArea,
      limit,
      isSetCharacterLimitChecked,
      isExcludeSpaceChecked
    );
    errorStyleRemove();
  }
});

characterLimitContainer?.addEventListener("input", (event) => {
  limit = event.target.value;
  setMaxLength(
    textArea,
    limit,
    isSetCharacterLimitChecked,
    isExcludeSpaceChecked
  );
  displayErrorMessage(
    textValue,
    isSetCharacterLimitChecked,
    isExcludeSpaceChecked,
    limit
  );
});

//listen for input in text area
textArea?.addEventListener("input", (event) => {
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

  //show letter density
  countLetters(textValue);

  //show letter density section when text area is not empty
  if (textValue.length > 0) {
    emptyText.innerHTML = "";
    buttonContainer.classList.remove("hidden");
  } else {
    emptyText.innerHTML = `<p>No characters found. Start typing to see letter density</p>`;
    buttonContainer.classList.add("hidden");
  }
});

//when you first load page and text area is empty
const emptyText = document.querySelector(".empty-textarea");

//function to sort letter count in descending order
function sortInDescendingOrder(obj) {
  let sortedObject = Object.fromEntries(
    Object.entries(obj).sort(([, a], [, b]) => b - a)
  );
  return sortedObject;
}

//function to separate the see more letter density section
function divideLetterFrequency(obj) {
  const entries = Object.entries(obj);
  fiveLetterDensity = Object.fromEntries(entries.slice(0, 5));
  restLetterDensity = Object.fromEntries(entries.slice(5));
}

//function to calculate the letter density percentage
function calcLetterDensityPercentage(halfdensity, halfPercentage) {
  for (const letter in halfdensity) {
    halfPercentage[letter] = (
      (halfdensity[letter] / totalCharacters) *
      100
    ).toFixed(2);
  }
}

//function to show letter density
function renderLetterDensity(htmlId, densityObj, densityHTML, percentageObj) {
  htmlId.innerHTML = ""; // Clear previous content
  for (const letter in densityObj) {
    densityHTML[letter] = `
            <div class="ld-letter">
              <span class="letter">${letter}</span>
              <div class="ld-percentage">
                <div class="percentage" style="width: ${percentageObj[letter]}%"></div>
              </div>
              <span class="value" style="text-align: right">${densityObj[letter]}(${percentageObj[letter]}%)</span>
            </div>
          `;
  }
  for (const letter in densityObj) {
    htmlId.innerHTML += densityHTML[letter];
  }
}

//function to count letters in the text
function countLetters(textValue) {
  if (textValue.trim() != "") {
    const converttoUpperCase = textValue.toUpperCase();
    let letterFrequency = {};
    totalCharacters = 0;

    for (let i = 0; i < converttoUpperCase.length; i++) {
      const letter = converttoUpperCase[i];
      if (letter >= "A" && letter <= "Z") {
        totalCharacters++;
        if (letterFrequency[letter]) {
          letterFrequency[letter]++;
        } else {
          letterFrequency[letter] = 1;
        }
      }
    }

    letterFrequencySorted = sortInDescendingOrder(letterFrequency);

    divideLetterFrequency(letterFrequencySorted);

    calcLetterDensityPercentage(fiveLetterDensity, fiveLetterPercentages);
    renderLetterDensity(
      fiveLetterDensityWrapper,
      fiveLetterDensity,
      fiveLetterDensityHTML,
      fiveLetterPercentages
    );
    if (isSeeMoreClicked) {
      calcLetterDensityPercentage(restLetterDensity, restLetterPercentages);
      renderLetterDensity(
        restLetterDensityWrapper,
        restLetterDensity,
        restLetterDensityHTML,
        restLetterPercentages
      );
    } else {
      restLetterDensityWrapper.innerHTML = "";
    }
  } else {
    //clear everything if textArea is empty
    fiveLetterDensity = {};
    restLetterDensity = {};
    letterFrequencySorted = {};
    totalCharacters = 0;

    fiveLetterDensityWrapper.innerHTML = "";
    restLetterDensityWrapper.innerHTML = "";

    fiveLetterPercentages = {};
    restLetterPercentages = {};
  }
}

document.querySelector(".sm-btn")?.addEventListener("click", () => {
  isSeeMoreClicked = !isSeeMoreClicked;

  //show the rest of the letter density
  if (isSeeMoreClicked) {
    document.getElementById("see").innerHTML = "See less";
    document.getElementById("up").style.display = "none";
    document.getElementById("down").style.display = "block";
    calcLetterDensityPercentage(restLetterDensity, restLetterPercentages);
    renderLetterDensity(
      restLetterDensityWrapper,
      restLetterDensity,
      restLetterDensityHTML,
      restLetterPercentages
    );
  } else {
    restLetterDensityWrapper.innerHTML = "";
    document.getElementById("see").innerHTML = "See more";
    document.getElementById("up").style.display = "block";
    document.getElementById("down").style.display = "none";
  }
});

module.exports = {
  setMaxLength,
  countWords,
  countSentences,
  countCharacters,
  calculateReadingTime,
  displayErrorMessage,
};
