import { openSettings, closeSettings, saveSettings, loadConfiguration } from "./aside/settingsAside.js";
import {
    insertNode,
    deleteNode,
    cleanList,
    iterationList,
    setData,
} from "./list/methods.js";
import { changeThemeComboBox } from "./themes.js";

const settingsSavedButton = document.getElementById("settings-saved-button");

const openSettingsBtn = document.getElementById("open-settings");
const closeSettingsBtn = document.getElementById("close-settings");

//Combo Box
const addComboBox = document.getElementById("add-comboBox");
const deleteComboBox = document.getElementById("delete-comboBox");
const ThemeComboBox = document.getElementById("themes-comboBox");

let settingsBar = document.querySelector(".settings");

//Buttons
const addBtn = document.getElementById("add-button");
const deleteBtn = document.getElementById("delete-button");
const cleanListBtn = document.getElementById("deleteAllButton");
const iterationBtn = document.getElementById("iterationButton");
const setBtn = document.getElementById("set-button");

//Inputs
const addInput = document.getElementById("add-input");
const setInputIndex = document.getElementById("set-input-index");
const setInputValue = document.getElementById("set-input");

//Events
addBtn.addEventListener("click", () => {
    insertNode(addInput, addComboBox);
});

addInput.addEventListener("keydown", (key) => {
    if (key.key === "Enter") insertNode(addInput, addComboBox);
});

deleteBtn.addEventListener("click", () => {
    deleteNode(deleteComboBox);
});

cleanListBtn.addEventListener("click", cleanList);

iterationBtn.addEventListener("click", iterationList);

ThemeComboBox.addEventListener("change", function(){
    changeThemeComboBox(this.value);
});

openSettingsBtn.addEventListener("click", () => {
    openSettings(settingsBar);
});

closeSettingsBtn.addEventListener("click", () => {
    closeSettings(settingsBar);
});

setBtn.addEventListener("click", () => {
    setData(setInputIndex, setInputValue);
});

settingsSavedButton.addEventListener("click", saveSettings);

addEventListener("DOMContentLoaded", ()=>{
    loadConfiguration();
})

