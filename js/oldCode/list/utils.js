function getSize() {
    return document.getElementsByClassName("node").length;
}

function isEmpty(message) {
    return new Promise((resolve, reject) => {
        if (getSize() !== 0) resolve("Ok!");
        else reject(message);
    });
}

export {getSize, isEmpty};