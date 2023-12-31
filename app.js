"use strict";
// THIS PROJECT HAS BEEN HOSTED, TO SEE LIVE DEMO VISIT -- https://hackathon-6b87f.web.app THANK YOU
// THIS PROJECT HAS BEEN HOSTED, TO SEE LIVE DEMO VISIT -- https://hackathon-6b87f.web.app THANK YOU
// THIS PROJECT HAS BEEN HOSTED, TO SEE LIVE DEMO VISIT -- https://hackathon-6b87f.web.app THANK YOU

// ALL ELEMENT NEEDED FOR DOM MANIPULATION
const selectPlanModal = document.querySelector(".select--plan");
const closeModal = document.querySelector(".close--btn");
const revealStepBtn = document.querySelector(".reveal--btn");
const stepSection = document.querySelector(".setup--guide__steps");
const stepTitles = document.querySelectorAll(".setup--guide__title");
const stepContainers = document.querySelectorAll(".step--container");
const stepDetails = document.querySelectorAll(".setup--details");
const spinners = document.querySelectorAll(".spinner");
const alerts = document.querySelector(".alerts");
const bell = document.querySelector(".bell");
const user = document.querySelector(".user");
const userDropdown = document.querySelector(".user--dropdown__menu");
const progressBar = document.querySelector(".progress--bar");
const counter = document.querySelector(".counter");
const selectBtn = document.querySelector(".select--btn");

//this function handles the prelaoding of images when it is called.
const loadImgSrc = (src) => {
  const setImage = new Image();
  return (setImage.src = src);
};

// I noticed that there was some lagging when trying to switch image sources,
// so to achieve a seamless switch between image sources, i had to preload the alternative images as soon as the page loads.
const spinnerDone = loadImgSrc(
  "https://raw.githubusercontent.com/Nueltek/levelup-hackathon/eab01c75e694baf8ca05bf46600e6c30a82c5833/spinnerDone.svg"
);
const unrevealImage = loadImgSrc(
  "https://crushingit.tech/hackathon-assets/icon-arrow-up.svg"
);
const spinnerFullImage = loadImgSrc(
  "https://raw.githubusercontent.com/Nueltek/levelup-hackathon/1ef79e0a47c48e115b33c143431144186ba2eb59/Property%201%3DFrame%201000003537.svg"
);

const spinnerHalfImage2 = loadImgSrc(
  "https://raw.githubusercontent.com/Nueltek/levelup-hackathon/b6718ba5865caa80fa6135394fa0ffe55089c369/Component%2012.svg"
);

// TO MANAGE THE DIFFERENT STATES SO THAT THEY WILL BE COMPLETELY INDEPENDENT OF EACH OTHER
const state = {
  isOpen: true,
  is0pen_: true, //for setup guide only
};

// adding functionality to the modal
closeModal.addEventListener("click", () => {
  selectPlanModal.style.display = "none";
});

// ALL FUNCTIONS- SEPERATRING CONCERNS:

//THIS FUNCTION HANDLES THE PROGRESS BAR AS EACH SPINNER IS CHECKED
const updateProgress = () => {
  const spinners = document.querySelectorAll(".spinner");

  const checkedSpinner = Array.from(spinners).filter(
    (spinner) => spinner.src === spinnerDone
  ).length;
  console.log(checkedSpinner);
  const totalCount = spinners.length;
  const progressPercentage = (checkedSpinner / totalCount) * 100;

  progressBar.style.width = `${progressPercentage}%`;
  counter.textContent = checkedSpinner;
};

// THIS IS CALLED WHEN THE USER CLICKS ON THE BELL OR USERNAME
const showTab = (el1, el2) => {
  if (state.isOpen) {
    el1.style.background = "#616161";
    el2.classList.remove("hide");
  } else {
    el2.classList.add("hide");
    el1.style.removeProperty("background");
  }
  state.isOpen = !state.isOpen;
};

//THIS FUNCTION HANDLES THE SETUP GUIDE TOGGLELE REVEAL
const revealSetupGuide = () => {
  if (state.is0pen_) {
    revealStepBtn.src = unrevealImage;
    stepSection.classList.remove("hide");
  } else {
    revealStepBtn.src =
      "https://crushingit.tech/hackathon-assets/icon-arrow-down.svg";
    stepSection.classList.add("hide");
  }
  state.is0pen_ = !state.is0pen_;
};

// THIS FUNCTION INITIALIZES THE SPINNING PROCESS DISPLAY
const initSpin = (element, id) => {
  if (element.src === spinnerDone) {
    element.src =
      "https://raw.githubusercontent.com/Nueltek/levelup-hackathon/648b7c9495d7fd1e40991383f4367511f49082e3/spinner.svg";
    updateProgress();
  } else {
    setTimeout(() => {
      element.src = spinnerHalfImage2;
      element.classList.add("rotating");
    }, 500);

    setTimeout(() => {
      element.src = spinnerDone;
      showContent(id);
      updateProgress();
      element.classList.remove("rotating");
    }, 1000);
  }
};

// THIS FUNCTION HANDLES THE STEPS CONTENT AND ITS CALLED WHEN THE TITLE IS CLICKED
const showContent = (id) => {
  stepContainers.forEach((container) => container.classList.remove("active"));
  stepDetails.forEach((detail) => detail.classList.add("hide"));

  document.getElementById(`step--container${id}`).classList.add("active");
  document.getElementById(`setup--details${id}`).classList.remove("hide");
};

// handling bell notification functionalities
bell.addEventListener("click", () => {
  showTab(bell, alerts, state);
});

//handlng user dropdown menu functionality
user.addEventListener("click", () => {
  showTab(user, userDropdown, state);
});

// Revealing steps details when title clicks.
stepTitles.forEach((title) => {
  title.addEventListener("click", () => {
    const currentClickedId = title.dataset.id;
    showContent(currentClickedId);
  });
});

revealStepBtn.addEventListener("click", () => {
  revealSetupGuide();
});

// handling spinner hover action and checked action
spinners.forEach((spinner) => {
  spinner.addEventListener("mouseover", () => {
    if (spinner.src === spinnerDone) return;
    spinner.src = spinnerFullImage;
  });

  spinner.addEventListener("mouseout", () => {
    if (spinner.src === spinnerDone) return;
    spinner.src =
      "https://raw.githubusercontent.com/Nueltek/levelup-hackathon/648b7c9495d7fd1e40991383f4367511f49082e3/spinner.svg";
  });

  spinner.addEventListener("click", () => {
    const spinnerId = spinner.dataset.id;
    initSpin(spinner, spinnerId);
  });
});

// HANDLING KEYBOARD INTERRACTION TO INCREASE WEBSITES ACCESSIBILITY

bell.addEventListener("keydown", (e) => {
  e.code == "Enter" ? showTab(bell, alerts, state) : "";
});

user.addEventListener("keydown", (e) => {
  e.code == "Enter" ? showTab(user, userDropdown, state) : "";
});

closeModal.addEventListener("keydown", (e) => {
  e.code == "Enter" ? (selectPlanModal.style.display = "none") : "";
});

revealStepBtn.addEventListener("keydown", (e) => {
  e.code == "Enter" ? revealSetupGuide() : "";
});

spinners.forEach((spinner) => {
  spinner.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
      const spinnerId = spinner.dataset.id;
      initSpin(spinner, spinnerId);
    }
  });
});

stepTitles.forEach((title) => {
  title.addEventListener("keydown", (e) => {
    if (e.code == "ArrowDown") {
      const currentClickedId = title.dataset.id;
      showContent(currentClickedId);
    }
  });
});

//ENHANCING INTERRACTIVITY FOR SCREEN READERS SO THEY DON'T HAVE TO GO BACK TO THE USERNAME TO  CLOSE THE MENU

document.getElementById("main--section").addEventListener("click", (e) => {
  if (state.isOpen) return;

  userDropdown.classList.add("hide");
  user.style.removeProperty("background");
  state.isOpen = true;
});

document.getElementById("main--section").addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    if (state.isOpen) return;

    userDropdown.classList.add("hide");
    user.style.removeProperty("background");
    state.isOpen = true;
  }
});
