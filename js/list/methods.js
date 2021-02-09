import { getSize, isEmpty } from "./utils.js";
import { isOnlyPositiveNumbers, isNumber } from "../utils/validations.js";
import { disableAllButtons, enableAllButtons } from "../utils/ui.js";
import {
    cleanMessage,
    showErrorMessage,
    showSuccessMessage,
} from "./listMessages.js";

import {
    startNodeAnimation,
    startArrowAnimation,
    changeNodeValueAnimation,
    startDeleteNodeAnimation,
    startDeleteArrowAnimation,
    startiterationNodeAnimation,
    startIterationArrowAnimation,
} from "../animations.js";

let list = document.getElementById("list");




//list

function createNode(valueToAdd) {
    //El uso de un fragment mejora el rendimiento
    let nodeFragment = document.createDocumentFragment();
    let content = document.createElement("P");
    let value = document.createTextNode(valueToAdd);
    let node = document.createElement("DIV");

    node.classList.add("node");
    content.classList.add("node__value", "weight-500");

    content.appendChild(value);
    node.appendChild(content);
    nodeFragment.appendChild(node);

    //retorna un diccionario

    return { node: node, nodeFragment: nodeFragment };
}

function createArrow() {
    let arrowFragment = document.createDocumentFragment();
    let arrowI = document.createElement("I");
    let arrowContainer = document.createElement("DIV");

    arrowI.classList.add("arrow__i", "fas", "fa-long-arrow-alt-right");
    arrowContainer.classList.add("arrow");

    arrowContainer.appendChild(arrowI);
    arrowFragment.appendChild(arrowContainer);

    return { arrow: arrowContainer, arrowFragment: arrowFragment };
}





//_------------------------------

async function insertNode(addInput, addComboBox) {
    cleanMessage();
    try {
        let value = await isNumber(addInput.value);

        let objectNode = createNode(value);
        let objectArrow = createArrow();

        if (addComboBox.value === "Front") {
            list.appendChild(objectNode.nodeFragment);
            list.appendChild(objectArrow.arrowFragment);
        } else {
            list.prepend(objectArrow.arrowFragment);
            list.prepend(objectNode.nodeFragment);
        }

        startNodeAnimation(objectNode.node);
        startArrowAnimation(objectArrow.arrow);
    } catch (error) {
        showErrorMessage(error);
    }
}

async function deleteNode(deleteComboBox) {
    cleanMessage();
    try {
        await isEmpty("There's not nodes to remove");

        let node, arrow;

        let allNodes = document.getElementsByClassName("node");

        if (deleteComboBox.value === "Back") {
            node = document.getElementsByClassName("node")[0];
            arrow = document.getElementsByClassName("arrow")[0];
        } else {
            node = document.getElementsByClassName("node")[allNodes.length - 1];
            arrow = document.getElementsByClassName("arrow")[allNodes.length - 1];
        }

        await startDeleteNodeAnimation(node, arrow);
        node.remove();
        arrow.remove();
    } catch (error) {
        showErrorMessage(error);
    }
}

async function cleanList() {
    try {
        await isEmpty("There's nothing to remove");
        let size = getSize();

        disableAllButtons();

        for (let i = 0; i < size; i++) {
            let node;
            let arrow;

            node = document.getElementsByClassName("node")[0];
            arrow = document.getElementsByClassName("arrow")[0];

            await startDeleteNodeAnimation(node, arrow);
            node.remove();
            arrow.remove();
        }
    } catch (error) {
        showErrorMessage(error);
    }finally{
      enableAllButtons();
    }
}

async function iterationList() {
    try {
        await isEmpty("There's not nodes to iteration!");
        let size = getSize();

        disableAllButtons();

        for (let i = 0; i < size; i++) {
            let node;
            let arrow;

            node = document.getElementsByClassName("node")[i];
            arrow = document.getElementsByClassName("arrow")[i];

            await startiterationNodeAnimation(node);
            await startIterationArrowAnimation(arrow);
        }
    } catch (error) {
        showErrorMessage(error);
    }
    finally{
      enableAllButtons();
    }
}

async function setData(setInputIndex, setInput) {
    try {
        cleanMessage();
        await isEmpty("There's not nodes");
        let size = getSize() - 1;
        let to = await isOnlyPositiveNumbers(setInputIndex.value);
        const newValue = await isNumber(setInput.value);

        if (to > size) return showErrorMessage("Invalid Index");

        ///DISABLE BTN
        disableAllButtons();

        let value;
        let node;
        let arrow;

        for (let i = 0; i <= to; i++) {
            node = document.getElementsByClassName("node")[i];
            arrow = document.getElementsByClassName("arrow")[i];

            await startiterationNodeAnimation(node);

            //Para que la última flecha no se mueva c:
            if (i !== to) await startIterationArrowAnimation(arrow);
        }

        console.log(node.children[0]);
        value = node.children[0];
        value.textContent = newValue;

        await changeNodeValueAnimation(value);
    } catch (error) {
        showErrorMessage(error);
    } finally {
        //Enable btn
        enableAllButtons();
    }
}


export {
    insertNode,
    deleteNode,
    cleanList,
    iterationList,
    setData,
}