import {addAnimationSpeed, removeAnimationSpeed, iterationAnimationSpeed} from "../aside/aside.js";


function startNodeAnimation(node) {
    node.style.animation = `addNodeAnimation ${addAnimationSpeed / 1000}s alternate`;
}

function startArrowAnimation(arrow) {
    arrow.style.animation = `addArrowAnimation ${
        addAnimationSpeed / 1000
    }s ease alternate`;
}

function changeNodeValueAnimation(value) {
    value.style.animation = "startChangeNodeValue .7s ease alternate";
    return new Promise((resolve) => {
        setTimeout(() => {
            value.style.animation = null;
            resolve("Setted!");
        }, 700);
    });
}

function startDeleteNodeAnimation(node, arrow) {
    return new Promise((resolve) => {
        node.style.animation = `DeleteNodeAnimation ${removeAnimationSpeed / 1000}s ease`;
        arrow.style.animation = `DeleteArrowAnimation ${
            removeAnimationSpeed / 1000
        }s ease`;

        setTimeout(() => {
            resolve("Animation done!");
            node.style.animation = null;
        }, removeAnimationSpeed);
    });
}

function startDeleteArrowAnimation(arrow) {
    return new Promise((resolve) => {
        arrow.style.animation = `DeleteNodeAnimation ${
            deleteAllAnimationSpeed / 1000
        }s ease`;

        setTimeout(() => {
            resolve("Animation done!");
            arrow.style.animation = null;
        }, deleteAllAnimationSpeed);
    });
}

function startiterationNodeAnimation(node) {
    return new Promise((resolve) => {
        node.style.animation = null;
        node.style.animation = `iterationNodeAnimation ${
            iterationAnimationSpeed / 1000
        }s ease alternate infinite`;
        setTimeout(() => {
            node.style.animation = null;
            resolve("Ok!");
        }, iterationAnimationSpeed);
    });
}

function startIterationArrowAnimation(arrow) {
    return new Promise((resolve) => {
        arrow.style.animation = null;
        arrow.style.animation = `shakeArrow ${
            iterationAnimationSpeed / 1000
        }s ease alternate infinite`;
        setTimeout(() => {
            arrow.style.animation = null;
            resolve("Ok!");
        }, iterationAnimationSpeed);
    });
}

export {
    startNodeAnimation,
    startArrowAnimation,
    changeNodeValueAnimation,
    startDeleteNodeAnimation,
    startDeleteArrowAnimation,
    startiterationNodeAnimation,
    startIterationArrowAnimation
};
