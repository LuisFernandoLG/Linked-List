import {getErrorMessage, getSuccessMessage} from "../messages/messages.js";

let messageContainer = document.getElementById("message");

const cleanMessage = ()=>{
    messageContainer.innerHTML = null;
}

const showErrorMessage = (message)=>{
    messageContainer.innerHTML = getErrorMessage(message);
}

const showSuccessMessage = (message)=>{
    messageContainer.innerHTML = getSuccessMessage(message);
}

export {showErrorMessage, showSuccessMessage, cleanMessage};