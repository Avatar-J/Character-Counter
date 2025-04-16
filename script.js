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

  //text area and letter density section
  const textArea = document.getElementById("text-area");
  let textValue = textArea.value;
  const charCountContainer = document.getElementById("char-count");
  const wordCountContainer = document.getElementById("word-count");
  const sentenceCountContainer = document.getElementById("sentence-count");

  let letterDensitySection = document.querySelector(".not-empty-textarea");
  let emptyText = document.querySelector(".empty-textarea");

  //when you first load page and text area is empty
  letterDensitySection.classList.add("hidden");

  textArea.addEventListener("input", (event) => {
    textValue = event.target.value;

    const charCount = textValue.length;
    const wordCount = textValue
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const sentenceCount = textValue
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length;

    charCountContainer.textContent = charCount;
    wordCountContainer.textContent = wordCount;
    sentenceCountContainer.textContent = sentenceCount;

    //make letter density section visible if text area is not empty
    if (textValue.trim() === "") {
      if (emptyText.classList.contains("hidden")) {
        emptyText.classList.remove("hidden");
      }
      if (!letterDensitySection.classList.contains("hidden")) {
        letterDensitySection.classList.add("hidden");
      }
    }
  });

  //   //when you start typing in text area

  //   textArea.addEventListener("input", function (event) {
  //     textValue = event.target.value;
  //     console.log(textValue);

  //     //make letter density section visible if text area is not empty
  //     if (textValue.trim() === "") {
  //       if (emptyText.classList.contains("hidden")) {
  //         emptyText.classList.remove("hidden");
  //       }
  //       if (!letterDensitySection.classList.contains("hidden")) {
  //         letterDensitySection.classList.add("hidden");
  //       }
  //     } else {
  //       emptyText.classList.add("hidden");
  //       letterDensitySection.classList.remove("hidden");
  //     }
  //   });
});
