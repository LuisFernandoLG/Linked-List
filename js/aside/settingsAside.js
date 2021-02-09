import { cleanMessage, showErrorMessage, showSuccessMessage } from "./asideMessages.js";
import { isOnlyPositiveNumbers} from "../utils/validations.js";

import {
    addAnimationSpeed,
    removeAnimationSpeed,
    iterationAnimationSpeed,
} from "../animations.js";
import { startCloseSettingsAnimation } from "./asideAnimations.js";

let header = document.querySelector(".header");
let main = document.querySelector(".main");
let footer = document.querySelector(".footer");

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
    try {
        addAnimationSpeed = await isOnlyPositiveNumbers(addInputSpeed.value);
        removeAnimationSpeed = await isOnlyPositiveNumbers(removeInputSpeed.value);
        iterationAnimationSpeed = await isOnlyPositiveNumbers(iterationInputSpeed.value);
        showSuccessMessage("Saved!");
    } catch (error) {
        showSuccessMessage(error);
    }
}

export { openSettings, closeSettings, saveSettings };

const toggleOpacityElements = () => {
    header.classList.toggle("opacity");
    main.classList.toggle("opacity");
    footer.classList.toggle("opacity");
};
