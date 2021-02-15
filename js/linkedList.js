class Node {
    constructor() {}

    getNodeElement(valueToAdd) {
        let content = document.createElement("P");
        let value = document.createTextNode(valueToAdd);
        let node = document.createElement("DIV");

        node.classList.add("node");
        content.classList.add("node__value", "weight-500");

        content.appendChild(value);
        node.appendChild(content);

        return node;
    }
}

class Arrow {
    getArrowElement() {
        let arrowIcon = document.createElement("I");
        let arrow = document.createElement("DIV");

        arrowIcon.classList.add("arrow__i", "fas", "fa-long-arrow-alt-right");
        arrow.classList.add("arrow");

        arrow.appendChild(arrowIcon);

        return arrow;
    }
}

class AnimationSettings {
    constructor() {
        this.pushNodeSpeed = 1000;
        this.pushArrowSpeed = 1000;
        this.popNodeSpeed = 500;
        this.popArrowSpeed = 400;

        this.iterationNodeSpeed = 1000;
        this.iterationArrowSpeed = 1000;
        this.changeValueSpeed = 500;
    }

    // Setters
    setPushNodeSpeed(speed) {
        return (this.pushNodeSpeed = speed);
    }

    setPushArrowSpeed(speed) {
        return (this.pushArrowSpeed = speed);
    }

    setPopNodeSpeed(speed) {
        return (this.popNodeSpeed = speed);
    }

    setPopArrowSpeed(speed) {
        this.popArrowSpeed = speed;
    }

    setIterationNodeSpeed(speed) {
        this.iterationNodeSpeed = speed;
    }

    setIterationArrowSpeed(speed) {
        return (this.iterationArrowSpeed = speed);
    }

    // Getters
    getPushNodeSpeed() {
        return this.pushNodeSpeed;
    }

    getPushArrowSpeed() {
        return this.pushArrowSpeed;
    }

    getPopNodeSpeed() {
        return this.popNodeSpeed;
    }

    getPopArrowSpeed() {
        return this.popArrowSpeed;
    }

    getIterationNodeSpeed() {
        return this.iterationNodeSpeed;
    }

    get IterationArrowSpeed() {
        return this.iterationArrowSpeed;
    }
}

class ListAnimation extends AnimationSettings {
    constructor() {
        super();
    }

    startPushNodeAnimation(node) {
        node.style.animation = `addNodeAnimation ${this.pushNodeSpeed / 1000}s ease`;
    }

    startPushArrowAnimation(arrow) {
        arrow.style.animation = `addArrowAnimation ${this.pushArrowSpeed / 1000}s ease`;
    }

    startPopNodeAnimation(node) {
        return new Promise((resolve) => {
            node.style.animation = `DeleteNodeAnimation ${
                this.popNodeSpeed / 1000
            }s ease`;
            setTimeout(() => {
                resolve("Animation done!");
                node.style.animation = null;
            }, this.popNodeSpeed);
        });
    }

    startPopArrowAnimation(arrow) {
        return new Promise((resolve) => {
            arrow.style.animation = `DeleteArrowAnimation ${
                this.popArrowSpeed / 1000
            }s ease`;
            setTimeout(() => {
                resolve("Animation done!");
                arrow.style.animation = null;
            }, this.popArrowSpeed);
        });
    }

    startIterationNodeAnimation(node) {
        return new Promise((resolve) => {
            node.style.animation = `iterationNodeAnimation ${
                this.iterationNodeSpeed / 1000
            }s ease alternate`;
            setTimeout(() => {
                node.style.animation = null;
                resolve("Ok!");
            }, this.iterationNodeSpeed);
        });
    }

    startIterationArrowAnimation(arrow) {
        return new Promise((resolve) => {
            arrow.style.animation = `shakeArrow ${this.iterationArrowSpeed / 1000}s ease`;
            setTimeout(() => {
                arrow.style.animation = null;
                resolve("Ok!");
            }, this.iterationArrowSpeed);
        });
    }

    startChangeValueAnimation(value) {
        value.style.animation = `startChangeNodeValue ${
            this.changeValueSpeed / 1000
        }s ease`;
        return new Promise((resolve) => {
            setTimeout(() => {
                value.style.animation = null;
                resolve("Setted!");
            }, this.changeValueSpeed);
        });
    }
}

export default class LinkedList extends ListAnimation {
    constructor(listElement) {
        super();
        this.listElement = listElement;
    }

    pushFront(value) {
        const node = new Node().getNodeElement(value);
        this.listElement.append(node);
        this.startPushNodeAnimation(node);

        const arrow = new Arrow().getArrowElement();
        this.listElement.append(arrow);
        this.startPushArrowAnimation(arrow);
    }

    pushBack(value) {
        const arrow = new Arrow().getArrowElement();
        this.listElement.prepend(arrow);
        this.startPushArrowAnimation(arrow);

        const node = new Node().getNodeElement(value);
        this.listElement.prepend(node);
        this.startPushNodeAnimation(node);
    }

    async popFront() {
        let node = this.getFirstNode();
        let arrow = this.getFirstArrow();

        await this.startPopArrowAnimation(arrow);
        arrow.remove();

        await this.startPopNodeAnimation(node);
        node.remove();
    }
    async popBack() {
        let node = this.getLastNode();
        let arrow = this.getLastArrow();

        await this.startPopNodeAnimation(node);
        node.remove();

        await this.startPopArrowAnimation(arrow);
        arrow.remove();
    }

    async iterate() {
        let nodes = Array.from(this.listElement.querySelectorAll(".node"));
        let arrows = Array.from(this.listElement.querySelectorAll(".arrow"));
        let size = this.size;

        for (let i = 0; i < size; i++) {
            let node = nodes[i];
            let arrow = arrows[i];

            await this.startIterationNodeAnimation(node);
            await this.startIterationArrowAnimation(arrow);
        }
    }

    async clean() {
        let nodes = Array.from(this.listElement.querySelectorAll(".node"));
        let arrows = Array.from(this.listElement.querySelectorAll(".arrow"));
        let size = this.size;

        for (let i = 0; i < size; i++) {
            let node = nodes[i];
            let arrow = arrows[i];

            await this.startPopNodeAnimation(node);
            node.remove();
            await this.startPopArrowAnimation(arrow);
            arrow.remove();
        }
    }

    async set(newValue, index) {
        let nodes = Array.from(this.listElement.querySelectorAll(".node"));
        let arrows = Array.from(this.listElement.querySelectorAll(".arrow"));
        let node, arrow;

        for (let i = 0; i <= index; i++) {
            node = nodes[i];
            arrow = arrows[i];
            await this.startIterationNodeAnimation(node);
            await this.startIterationArrowAnimation(arrow);
        }

        let value = node.children[0];
        value.textContent = newValue;
    }

    getFirstNode() {
        let elements = Array.from(this.listElement.children);
        let lenght = elements.length;
        return elements[lenght - 2];
    }

    getFirstArrow() {
        let elements = Array.from(this.listElement.children);
        let lenght = elements.length;
        return elements[lenght - 1];
    }

    getLastNode() {
        let elements = this.listElement.children;
        return elements[0];
    }

    getLastArrow() {
        let elements = this.listElement.children;
        return elements[1];
    }

    isEmpty() {
        return this.size === 0 ? true : false;
    }

    get size() {
        return this.listElement.querySelectorAll(".node").length;
    }

    isOutOfRange(index) {
        return new Promise((resolve, reject) => {
            if (index <= this.size - 1) resolve("Ok!");
            else reject("Index is out of range");
        });
    }
}
