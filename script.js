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

  //text area section
  const textArea = document.getElementById("text-area");
  let textValue = textArea.value;
  const charCountContainer = document.getElementById("char-count");
  const wordCountContainer = document.getElementById("word-count");
  const sentenceCountContainer = document.getElementById("sentence-count");
  const excludeSpacesToggle = document.getElementById("spaces");
  const setCharacterLimitToggle = document.getElementById("limit");
  const characterLimitContainer = document.getElementById("limit-box");
  const errorMessageContainer = document.getElementById("error-message").style;
  const limitValueContainer = document.getElementById("limit-value");
  let limit = null;
  let isExcludeSpaceChecked = false;
  let isSetCharacterLimitChecked = false;
  let charCount = null;

  //when you first load page and text area is empty
  const letterDensitySection = document.querySelector(".not-empty-textarea");
  //letterDensitySection.classList.add("hidden");

  //function to pad a number with zero if the digits are less than 2
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }

  function errorStyleRemove() {
    errorMessageContainer.display = "none";
    textArea.classList.remove("error-state");
    textArea.classList.add("text-area");
  }

  //function to display error message when limit is exceeded
  function displayErrorMessage(count) {
    if (isSetCharacterLimitChecked) {
      if (limit != null) {
        if (count > limit) {
          limitValueContainer.textContent = limit;
          errorMessageContainer.display = "block";
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
  }

  function includeSpaces() {
    charCount = textValue.length;
    charCountContainer.textContent = padZero(charCount);
  }

  function countLetters() {
    if (textValue.trim() != "") {
      const converttoUpperCase = textValue.toUpperCase();
      const letterFrequency = {};
      const letterPercentages = {};
      // const letterDensityHTML = {};
      let totalCharacters = 0;

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
      for (const letter in letterFrequency) {
        letterPercentages[letter] = (
          (letterFrequency[letter] / totalCharacters) *
          100
        ).toFixed(2);
      }

      letterDensitySection.innerHTML = ""; // Clear previous content
      let letterDensityHTML = "";
      for (const letter in letterFrequency) {
        renderLetterDensity(
          letter,
          letterPercentages,
          letterFrequency,
          letterDensityHTML
        );
      }
      letterDensitySection.innerHTML = letterDensityHTML;
      console.log("letter freq", letterFrequency);
      console.log("percentages", letterPercentages);
    }
  }
  //function to render letter density percentage
  function renderLetterDensity(aletter, aletterPercentages, aletterFrequency) {
    letterDensityHTML += `
    <div class="ld-letter">
      <span class="letter">${aletter}</span>
      <div class="ld-percentage">
        <div class="percentage" style="width: ${aletterPercentages[aletter]}"></div>
      </div>
      <span class="value">${aletterFrequency[aletter]}(${aletterPercentages[aletter]})</span>
    </div>
   `;
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
      this.document.getElementById("limit-box").style.display = "none";
      isSetCharacterLimitChecked = false;
      limit = null;
      errorStyleRemove();
    }
  });

  characterLimitContainer.addEventListener("input", (event) => {
    limit = event.target.value;
    displayErrorMessage(charCount);
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
  });

  //letter density section

  const emptyText = document.querySelector(".empty-textarea");
  let isEmptyTextHidden = emptyText.classList.contains("hidden");
  let isLetterDensitySectionHidden =
    letterDensitySection.classList.contains("hidden");

  //display letter density percentage

  // if (charCount != null) {
  //   if (charCount.trim() === "") {
  //     if (isEmptyTextHidden) {
  //       emptyText.classList.remove("hidden");
  //     }
  //     if (!isLetterDensitySectionHidden) {
  //       letterDensitySection.classList.add("hidden");
  //     }
  //   }
  // }
});
