function startCloseSettingsAnimation(settingsBar) {
    return new Promise((resolve) => {
        settingsBar.style.animation = "closeSettingsAnimation .5s ease alternate";
        setTimeout(() => {
            resolve("Ok!");
            settingsBar.style.display = "none";
        }, 500);
    });
}

export {startCloseSettingsAnimation};