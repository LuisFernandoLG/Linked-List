//Buttons
const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");
const deleteAllButton = document.getElementById("deleteAllButton");
const iterationButton = document.getElementById("iterationButton");
const setButton = document.getElementById("set-button");


export function disableAllButtons(){
    setButton.setAttribute("disabled", "");
    setButton.classList.add("disable-btn");
    
    iterationButton.setAttribute("disabled", "");
    iterationButton.classList.add("disable-btn");
    
    deleteAllButton.setAttribute("disabled", "");
    deleteAllButton.classList.add("disable-btn");
  
    addButton.setAttribute("disabled", "");
    addButton.classList.add("disable-btn");
  
    deleteButton.setAttribute("disabled", "");
    deleteButton.classList.add("disable-btn");
  
    
    
  }
  
export function enableAllButtons(){
    setButton.removeAttribute("disabled", "");
    setButton.classList.remove("disable-btn");
    
    iterationButton.removeAttribute("disabled", "");
    iterationButton.classList.remove("disable-btn");
    
    addButton.removeAttribute("disabled", "");
    addButton.classList.remove("disable-btn");
    
    deleteAllButton.removeAttribute("disabled", "");
    deleteAllButton.classList.remove("disable-btn");
    
    deleteButton.removeAttribute("disabled", "");
    deleteButton.classList.remove("disable-btn");
    
  }