class animationSettingsBar {
    constructor() {
        this.openSpeed = 500;
        this.closeSpeed = 500;
    }

    startCloseAnimation() {
        this.settingElement.style.animation = `closeSettingsAnimation ${
            this.closeSpeed / 1000
        }s ease alternate`;
        return new Promise((resolve) => {
            setInterval(() => {
                resolve("Ok!");
            }, this.closeSpeed);
        });
    }

    startOpenAnimation() {
        this.settingElement.style.animation = `openSettingsAnimation ${
            this.openSpeed / 1000
        }s ease alternate`;
    }
}

export default class SettingsBar extends animationSettingsBar {
    constructor(settingElement, speedPushField, speedPopField, speedIterationField) {
        super();
        this.settingElement = settingElement;
        this.speedPushField = speedPushField;
        this.speedPopField = speedPopField;
        this.speedIterationField = speedIterationField;
    }

    open() {
        this.settingElement.style.display = "flex";
        this.startOpenAnimation();
    }

    async close() {
        await this.startCloseAnimation();
        this.settingElement.style.display = "none";
    }

    saveSettings(list) {}
}
