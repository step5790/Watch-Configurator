"use strict";

// The model of all features

// let SVG;

let selectedGroups = [];
let selectedColor;

window.addEventListener("DOMContentLoaded", start);

async function start() {
  console.log("start");

  let basicAll = await fetch("../assets/svg/basicAll-01.svg");
  let allSVG = await basicAll.text();
  let strapOne = await fetch("../assets/svg/strapOne-01.svg");
  let strapOneSVG = await strapOne.text();
  let strapTwo = await fetch("../assets/svg/test-strapTwo-01.svg");
  let strapTwoSVG = await strapTwo.text();
  let strapThree = await fetch("../assets/svg/strapThree-01.svg");
  let strapThreeSVG = await strapThree.text();
  let bodyOne = await fetch("../assets/svg/bodyOne-01.svg");
  let bodyOneSVG = await bodyOne.text();
  let bodyTwo = await fetch("../assets/svg/bodyTwo-01.svg");
  let bodyTwoSVG = await bodyTwo.text();
  let bodyThree = await fetch("../assets/svg/bodyThree-01.svg");
  let bodyThreeSVG = await bodyThree.text();
  let insideOne = await fetch("../assets/svg/insideOne-01.svg");
  let insideOneSVG = await insideOne.text();
  let insideTwo = await fetch("../assets/svg/insideTwo-01.svg");
  let insidTwoSVG = await insideTwo.text();
  let insideThree = await fetch("../assets/svg/insideThree-01.svg");
  let insidThreeSVG = await insideThree.text();
  let handOne = await fetch("../assets/svg/handOne-01.svg");
  let handOneSVG = await handOne.text();
  let handTwo = await fetch("../assets/svg/handTwo-01.svg");
  let handTwoSVG = await handTwo.text();
  let handThree = await fetch("../assets/svg/handThree-01.svg");
  let handThreeSVG = await handThree.text();

  document.querySelector(".mainWatch").innerHTML = allSVG;
  document.querySelector(".strapOne").innerHTML = strapOneSVG;
  document.querySelector(".strapTwo").innerHTML = strapTwoSVG;
  document.querySelector(".strapThree").innerHTML = strapThreeSVG;
  document.querySelector(".bodyOne").innerHTML = bodyOneSVG;
  document.querySelector(".bodyTwo").innerHTML = bodyTwoSVG;
  document.querySelector(".bodyThree").innerHTML = bodyThreeSVG;
  document.querySelector(".insideOne").innerHTML = insideOneSVG;
  document.querySelector(".insideTwo").innerHTML = insidTwoSVG;
  document.querySelector(".insideThree").innerHTML = insidThreeSVG;
  document.querySelector(".handOne").innerHTML = handOneSVG;
  document.querySelector(".handTwo").innerHTML = handTwoSVG;
  document.querySelector(".handThree").innerHTML = handThreeSVG;

  // ****add hide all option modals except 1st modal****
  document.querySelector("#optionStrap").classList.add("hide");
  document.querySelector("#optionFace").classList.add("hide");
  document.querySelector("#optionDial").classList.add("hide");

  buttonEvents();
  document.querySelector(".case").style.backgroundColor = "#a09b9b2b";
  registerToggleClicks();
  makeColorsInactive();
}

// register toggle-clicks
function registerToggleClicks() {
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

// ****adding eventlistners to buttons*********
function buttonEvents() {
  // **for option modal***
  document.querySelectorAll("#optionSelect li").forEach((optionFeature) => {
    const optionFeatureDataset = optionFeature.dataset.feature;
    optionFeature.addEventListener("click", function () {
      // ** reset selectedGroups
      selectedGroups.length = 0;
      console.log(selectedGroups);
      makeColorsInactive();
      //** decide which options to open */
      console.log(optionFeatureDataset);

      // ***removed color to default selection***

      document.querySelectorAll(".options").forEach((optionWrapper) => {
        if (optionWrapper.id === optionFeatureDataset) {
          console.log("match:" + optionWrapper.id);

          // ***adding colors to selection***
          document.querySelector(`[data-feature=${optionWrapper.id}]`).style.backgroundColor = "#a09b9b2b";

          document.getElementById(`${optionWrapper.id}`).classList.remove("hide");
          document.getElementById(`${optionWrapper.id}`).classList.remove("hide");
          document.getElementById(`${optionWrapper.id}`).classList.add("moveDown");
        } else if (optionWrapper.id !== optionFeatureDataset) {
          console.log("not match:" + optionWrapper.id);

          // ***removing colors to selection***
          document.querySelector(`[data-feature=${optionWrapper.id}]`).style.backgroundColor = "";

          document.getElementById(`${optionWrapper.id}`).classList.add("hide");
          document.getElementById(`${optionWrapper.id}`).classList.remove("moveDown");
        }
      });
    });
  });
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  const part = target.dataset.part;

  console.log(target);

  getGroupOfSelectedOptionInPreview(part);

  trackColorSelector();

  // document.querySelectorAll(".image").forEach((image) => {
  //   console.log(image.dataset.feature);
  //   if (image.dataset.feature === feature) {
  //     if (image.classList.contains("hide")) {
  //       image.classList.remove("hide");
  //       features[feature] = true;
  //     } else if (image.classList.contains("hide") === false) {
  //       image.classList.add("hide");
  //       features[feature] = false;
  //     }
  //   }
  // });

  document.querySelectorAll(`[data-part=${part}]`).forEach((element) => {
    //turn off any element that has status "on"
    if (element.dataset.status === "on") {
      element.dataset.status = "off";
    }

    //turn on selected option
    target.dataset.status = "on";
  });
  unhighlightOptions(part);
  highlightSelectedOption(target);
  hideElementsInPreview(part);
  unhideElementsInPreview(feature);

  // if (features[feature]) {
  //   // feature added

  //   console.log(`Feature ${feature} is turned off!`);

  //   // TODO: More code
  // } else {
  //   console.log(`Feature ${feature} is turned on!`);
  // }
}

function unhighlightOptions(part) {
  document.querySelectorAll(`[data-part=${part}]`).forEach((element) => {
    element.style.backgroundColor = "";
    element.style.pointerEvents = "auto";
  });
}

function highlightSelectedOption(element) {
  // ***adding colors to selection***
  element.style.backgroundColor = "#a09b9b2b";
  element.style.pointerEvents = "none";
}

function hideElementsInPreview(part) {
  document.querySelectorAll(`#product-preview > [data-part=${part}]`).forEach((element) => {
    element.classList.add("hide");
  });
}

function unhideElementsInPreview(feature) {
  document.querySelector(`#product-preview > .${feature}`).classList.remove("hide");
}

function hideAndUnhideOptionsInPreview() {
  document.querySelectorAll("#product-preview > *").forEach((element) => {
    if (element.dataset.status === "on") {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}

function getGroupOfSelectedOptionInPreview(part) {
  //reset array
  selectedGroups.length = [];
  console.log(part);
  document.querySelectorAll(`#product-preview > [data-part=${part}] g.cls-1`).forEach((group) => {
    selectedGroups.push(group);
  });
  console.log(selectedGroups);
  makeColorsActive();
}

function makeColorsActive() {
  document.querySelectorAll(".color-btn").forEach((element) => {
    element.style.cursor = "pointer";
  });
}

function makeColorsInactive() {
  document.querySelectorAll(".color-btn").forEach((element) => {
    element.style.cursor = "default";
  });
}

function trackColorSelector() {
  document.querySelectorAll(".color-btn").forEach((button) => {
    button.addEventListener("click", getColor);
  });
}

function getColor() {
  const clickColorButton = this;
  selectedColor = this.attributes.fill.textContent;
  changeColorOfGroup();
  unhiglightColor();
  higlightColor(clickColorButton);
}

function changeColorOfGroup() {
  if (selectedGroups !== null) {
    selectedGroups.forEach((group) => (group.style.fill = selectedColor));
  }
}

function higlightColor(clickColorButton) {
  console.log(clickColorButton);
  if (selectedGroups !== null) {
    clickColorButton.style.stroke = "white";
    clickColorButton.style.strokeWidth = 1.5;
  } else {
  }
}

function unhiglightColor() {
  document.querySelectorAll(".color-btn").forEach((element) => {
    element.style.stroke = "";
    element.style.strokeWidth = 0;
  });
}
