"use strict";

window.addEventListener("DOMContentLoaded", function () {
  //background theme change
  const themeSwitch = document.getElementById("theme-switch");

  let isDarkActive = document.body.classList.contains("dark-theme");

  themeSwitch.addEventListener("click", () => {
    if (!isDarkActive) {
      document.body.classList.add("dark-theme");
      console.log("theme switched");
    } else {
      document.body.classList.remove("dark-theme");
      console.log("theme switched");
    }
    isDarkActive = !isDarkActive;
  });

  //variables for text area section
  const textArea = document.getElementById("text-area");
  let textValue = textArea.value;
  const charCountContainer = document.getElementById("char-count");
  const wordCountContainer = document.getElementById("word-count");
  const sentenceCountContainer = document.getElementById("sentence-count");
  const excludeSpacesToggle = document.getElementById("spaces");
  const setCharacterLimitToggle = document.getElementById("limit");
  const characterLimitContainer = document.getElementById("limit-box");
  const errorMessageContainer = document.getElementById("error-message");
  const limitValueContainer = document.getElementById("limit-value");
  let limit = null;
  let isExcludeSpaceChecked = false;
  let isSetCharacterLimitChecked = false;
  let charCount = null;
  let isLimitSet = false;
  let spacecount = 0;

  //variables for letter density section
  const fiveLetterDensityWrapper = this.document.getElementById(
    "five-letter-density"
  );
  const restLetterDensityWrapper = this.document.getElementById(
    "rest-letter-density"
  );
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

  //when you first load page and text area is empty
  const letterDensitySection = document.querySelector(".not-empty-textarea");
  const emptyText = document.querySelector(".empty-textarea");

  //letterDensitySection.classList.add("hidden");

  //function to pad a number with zero if the digits are less than 2
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }

  function errorStyleRemove() {
    errorMessageContainer.innerHTML = "";
    textArea.classList.remove("error-state");
    textArea.classList.add("text-area");
  }

  //function to display error message when limit is exceeded
  function displayErrorMessage(count) {
    if (isSetCharacterLimitChecked) {
      if (limit != null) {
        if (count > limit) {
          // limitValueContainer.textContent = limit;
          errorMessageContainer.innerHTML = `<img src="./assets/images/icon-info.svg" alt="info icon" width="14px" height="18px" />
          <p>Limit reached! Your text exceeds <span id="limit-value">${limit}</span> characters</p>`;
          textArea.classList.add("error-state");
          textArea.classList.remove("text-area");
        } else {
          errorStyleRemove();
        }
      }
    }
  }
  //function to exclude and include spaces in text
  function excludeSpaces() {
    charCount = textValue.replace(/\s+/g, "").length;
    charCountContainer.textContent = padZero(charCount);
    spacecount = textValue.length - charCount;
    setMaxLength();
  }

  function includeSpaces() {
    spacecount = 0;
    charCount = textValue.length;
    charCountContainer.textContent = padZero(charCount);
    setMaxLength();
  }
  //set a maxlength for the text area and allows user to exceed by 1 letters
  function setMaxLength() {
    if (isSetCharacterLimitChecked) {
      if (limit == null) {
        textArea.removeAttribute("maxlength");
      } else {
        console.log("maxlength", Number(limit) + 1 + spacecount);
        textArea.setAttribute("maxlength", Number(limit) + 1 + spacecount);
      }
    } else {
      console.log("char limt", isSetCharacterLimitChecked);
      textArea.removeAttribute("maxlength");
    }
  }
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

  //function to calculate the letter density
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
                <span class="value">${densityObj[letter]}(${percentageObj[letter]}%)</span>
              </div>
            `;
    }
    for (const letter in densityObj) {
      htmlId.innerHTML += densityHTML[letter];
    }
  }

  //function to count letters in the text
  function countLetters() {
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

  function calculateReadingTime(words) {
    const readingSpeed = 200;
    const time = words / readingSpeed;
    return Math.ceil(time);
  }

  //event handlers
  excludeSpacesToggle.addEventListener("change", (event) => {
    if (event.target.checked) {
      excludeSpaces();
      isExcludeSpaceChecked = true;
    } else {
      includeSpaces();
      isExcludeSpaceChecked = false;
    }
    displayErrorMessage(charCount);
  });

  setCharacterLimitToggle.addEventListener("change", (event) => {
    if (event.target.checked) {
      this.document.getElementById("limit-box").style.display = "block";
      isSetCharacterLimitChecked = true;
    } else {
      limit = null;
      console.log("limit", limit);
      this.document.getElementById("limit-box").value = "";
      this.document.getElementById("limit-box").style.display = "none";
      isSetCharacterLimitChecked = false;
      setMaxLength();
      errorStyleRemove();
    }
  });

  characterLimitContainer.addEventListener("input", (event) => {
    limit = event.target.value;
    console.log("limit", limit);
    setMaxLength();
    displayErrorMessage(charCount);
  });

  this.document.querySelector(".sm-btn").addEventListener("click", () => {
    isSeeMoreClicked = !isSeeMoreClicked;
    console.log("btn is clicked");
    if (isSeeMoreClicked) {
      this.document.getElementById("see").innerHTML = "See less";
      this.document.getElementById("up").style.display = "none";
      this.document.getElementById("down").style.display = "block";
      calcLetterDensityPercentage(restLetterDensity, restLetterPercentages);
      renderLetterDensity(
        restLetterDensityWrapper,
        restLetterDensity,
        restLetterDensityHTML,
        restLetterPercentages
      );
    } else {
      restLetterDensityWrapper.innerHTML = "";
      this.document.getElementById("see").innerHTML = "See more";
      this.document.getElementById("up").style.display = "block";
      this.document.getElementById("down").style.display = "none";
    }
  });

  //listen for input in text area
  textArea.addEventListener("input", (event) => {
    textValue = event.target.value;

    if (isExcludeSpaceChecked) {
      excludeSpaces();
    } else {
      includeSpaces();
    }

    displayErrorMessage(charCount);

    const wordCount = textValue
      .split(/\s+/)
      .filter((word) => word.trim().length > 0).length;
    const sentenceCount = textValue
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length;

    wordCountContainer.textContent = padZero(wordCount);
    sentenceCountContainer.textContent = padZero(sentenceCount);

    countLetters();

    setMaxLength();

    //calulate reading time in real time
    const approxReadingTime = calculateReadingTime(wordCount);
    this.document.getElementById("approx-time").textContent = approxReadingTime;

    //show letter density section when text area is not empty
    if (charCount > 0) {
      emptyText.innerHTML = "";
      buttonContainer.classList.remove("hidden");
    } else {
      emptyText.innerHTML = `<p>No characters found. Start typing to see letter density</p>`;
      buttonContainer.classList.add("hidden");
    }
  });
});
