import { getErrorMessage, getSuccessMessage } from "../messages/messages.js";

let settingsMessageContainer = document.getElementById("settings-message");

const cleanMessage = () => {
    settingsMessageContainer.innerHTML = null;
};

const showErrorMessage = (message) => {
    settingsMessageContainer.innerHTML = getErrorMessage(message);
};

const showSuccessMessage = (message) => {
    settingsMessageContainer.innerHTML = getSuccessMessage(message);
};

export { showErrorMessage, showSuccessMessage, cleanMessage };
