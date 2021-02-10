import { cleanMessage, showErrorMessage, showSuccessMessage } from "./asideMessages.js";
import { isOnlyPositiveNumbers } from "../utils/validations.js";
import { changeThemeComboBox } from "../themes.js";
import {
    startCloseSettingsAnimation,
} from "./asideAnimations.js";

// Animation speed
let addAnimationSpeed = 1000;
let removeAnimationSpeed = 500;
let iterationAnimationSpeed = 900;

let addInputSpeed = document.getElementById("input-add-speed");
let removeInputSpeed = document.getElementById("input-remove-speed");
let iterationInputSpeed = document.getElementById("input-iteration-speed");

let header = document.querySelector(".header");
let main = document.querySelector(".main");
let footer = document.querySelector(".footer");

const loadConfiguration = () => {
    addInputSpeed.value = addAnimationSpeed;
    removeInputSpeed.value = removeAnimationSpeed;
    iterationInputSpeed.value = iterationAnimationSpeed;

    changeThemeComboBox( localStorage.getItem("theme") );

};

function openSettings(settingsBar) {
    settingsBar.style.display = "flex";
    settingsBar.style.animation = "openSettingsAnimation .5s ease alternate";
    toggleOpacityElements();
}

async function closeSettings(settingsBar) {
    await startCloseSettingsAnimation(settingsBar);
    toggleOpacityElements();
}

async function saveSettings() {
    addAnimationSpeed = 10;
    try {
        addAnimationSpeed = await isOnlyPositiveNumbers(addInputSpeed.value);
        removeAnimationSpeed = await isOnlyPositiveNumbers(removeInputSpeed.value);
        iterationAnimationSpeed = await isOnlyPositiveNumbers(iterationInputSpeed.value);
        showSuccessMessage("Saved!");
    } catch (error) {
        showErrorMessage(error);
    }
}

export { openSettings, closeSettings, saveSettings, loadConfiguration, addAnimationSpeed, removeAnimationSpeed, iterationAnimationSpeed };


//Private

const toggleOpacityElements = () => {
    header.classList.toggle("opacity");
    main.classList.toggle("opacity");
    footer.classList.toggle("opacity");
};
