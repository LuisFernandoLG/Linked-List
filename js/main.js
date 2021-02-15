import LinkedList from "./linkedList.js";
import Validator from "./validator.js";
import { ListMessage, SettingsMessage } from "./message.js";
import ThemeChanger from "./themeChanger.js";
import SettingsBar from "./settingsBar.js";

let list = document.getElementById("list");
let settingsBarElement = document.querySelector(".settings");

//MessageContainers
let listMessageContainer = document.getElementById("message");
let settingsMessageContainer = document.getElementById("settings-message");

//Combo Box
const addComboBox = document.getElementById("add-comboBox");
const deleteComboBox = document.getElementById("delete-comboBox");
const themeComboBox = document.getElementById("themes-comboBox");

//Buttons
const addBtn = document.getElementById("add-button");
const deleteBtn = document.getElementById("delete-button");
const cleanListBtn = document.getElementById("deleteAllButton");
const iterationBtn = document.getElementById("iterationButton");
const setBtn = document.getElementById("set-button");

const settingsSavedBtn = document.getElementById("settings-saved-button");
const openSettingsBtn = document.getElementById("open-settings");
const closeSettingsBtn = document.getElementById("close-settings");

//Inputs
const addInput = document.getElementById("add-input");
const setInputIndex = document.getElementById("set-input-index");
const setInputValue = document.getElementById("set-input");

const addInputSpeed = document.getElementById("input-add-speed");
const removeInputSpeed = document.getElementById("input-remove-speed");
const iterationInputSpeed = document.getElementById("input-iteration-speed");

//Objects
const linkedList = new LinkedList(list);
const validador = new Validator();
const listMessage = new ListMessage(listMessageContainer);
const themeChanger = new ThemeChanger(themeComboBox, document);
const settingsBar = new SettingsBar(
    settingsBarElement,
    addInputSpeed,
    removeInputSpeed,
    iterationInputSpeed
);
const settingMessage = new SettingsMessage(settingsMessageContainer);

// Events

addBtn.addEventListener("click", function () {
    listMessage.cleanMessage();
    let side = addComboBox.value;
    let value = addInput.value;
    validador
        .isNumber(value)
        .then(() => {
            if (side === "Front") linkedList.pushFront(value);
            else linkedList.pushBack(value);
        })
        .catch((e) => listMessage.showErrorMessage(e));
});

deleteBtn.addEventListener("click", () => {
    listMessage.cleanMessage();
    let side = deleteComboBox.value;
    if (!linkedList.isEmpty()) {
        if (side === "Front") linkedList.popFront();
        else linkedList.popBack();
    } else listMessage.showErrorMessage("There's not nodes to remove");
});

iterationBtn.addEventListener("click", () => {
    listMessage.cleanMessage();
    if (!linkedList.isEmpty()) linkedList.iterate();
    else listMessage.showErrorMessage("There's not nodes to iterate");
});

cleanListBtn.addEventListener("click", () => {
    listMessage.cleanMessage();
    if (!linkedList.isEmpty()) linkedList.clean();
    else listMessage.showErrorMessage("There's not nodes to remove");
});

setBtn.addEventListener("click", () => {
    listMessage.cleanMessage();
    let value = setInputValue.value;
    let index = setInputIndex.value;
    if (!linkedList.isEmpty()) {
        validateSetValues(value, index).then((result) => {
            if (result) linkedList.set(value, index);
        });
    } else listMessage.showErrorMessage("Empty List");
});

// Themes

themeComboBox.addEventListener("change", () => {
    themeChanger.changeTheme();
});

addEventListener("DOMContentLoaded", () => {
    themeChanger.loadThemes();
    loadTheme();
    loadSpeedSettings();
});

// SettingBar
openSettingsBtn.addEventListener("click", () => {
    settingMessage.cleanMessage();
    settingsBar.open();
});

closeSettingsBtn.addEventListener("click", () => {
    settingMessage.cleanMessage();
    settingsBar.close();
});

const inputs = [addInputSpeed, removeInputSpeed, iterationInputSpeed];

settingsSavedBtn.addEventListener("click", () => {
    validateInputSettings(inputs).then((result) => {
        if (result) {
            saveSettings(...inputs);
            settingMessage.showSuccessMessage("Saved!");
        }
    });
});

const validateInputSettings = async (inputs) => {
    try {
        for (let input of inputs) {
            await validador.isPositiveNumber(input.value);
        }
        return true;
    } catch (e) {
        settingMessage.showErrorMessage(e);
    }
};

const validateSetValues = async (value, index) => {
    try {
        await validador.isPositiveNumber(index);
        await validador.isNumber(value);
        await linkedList.isOutOfRange(index);
        return true;
    } catch (e) {
        listMessage.showErrorMessage(e);
    }
};

const saveSettings = (addInputSpeed, removeInputSpeed, iterationInputSpeed) => {
    linkedList.setPushNodeSpeed(addInputSpeed.value);
    linkedList.setPushArrowSpeed(addInputSpeed.value);

    linkedList.setPopNodeSpeed(removeInputSpeed.value);
    linkedList.setPopArrowSpeed(removeInputSpeed.value);

    linkedList.setIterationNodeSpeed(iterationInputSpeed.value);
    linkedList.setIterationArrowSpeed(iterationInputSpeed.value);

    localStorage.setItem("pushSpeed", addInputSpeed.value);
    localStorage.setItem("popSpeed", removeInputSpeed.value);
    localStorage.setItem("iterationSpeed", iterationInputSpeed.value);
};

const loadSpeedSettings = () => {
    if (localStorage.getItem("pushSpeed")) {
        linkedList.setPushNodeSpeed(localStorage.getItem("pushSpeed"));
        linkedList.setPushArrowSpeed(localStorage.getItem("pushSpeed"));

        linkedList.setPopNodeSpeed(localStorage.getItem("popSpeed"));
        linkedList.setPopArrowSpeed(localStorage.getItem("popSpeed"));

        linkedList.setIterationNodeSpeed(localStorage.getItem("iterationSpeed"));
        linkedList.setIterationArrowSpeed(localStorage.getItem("iterationSpeed"));

        addInputSpeed.value = localStorage.getItem("pushSpeed");
        removeInputSpeed.value = localStorage.getItem("popSpeed");
        iterationInputSpeed.value = localStorage.getItem("iterationSpeed");
    } else {
        // En caso de que no exita. estarán los valores por default
        addInputSpeed.value = linkedList.getPushNodeSpeed();
        removeInputSpeed.value = linkedList.getPopNodeSpeed();
        iterationInputSpeed.value = linkedList.getIterationNodeSpeed();
    }
};

const loadTheme = () => {
    themeComboBox.value = localStorage.getItem("theme");
    themeChanger.changeTheme(localStorage.getItem("theme"));
};
