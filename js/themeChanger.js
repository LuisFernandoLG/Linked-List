class Theme {
    constructor(document) {
        this.d = document;
        this.themes = [
            {
                name: "Dark theme",
                primaryColor: "#222831",
                secundaryColor: "#eeeeee",
                colorTwo: "#ffd369",
                colorThree: "#393e46",
            },
            {
                name: "Scarlett theme",
                primaryColor: "#db6400",
                secundaryColor: "#f8f1f1",
                colorTwo: "#272727",
                colorThree: "#ffa62b",
            },
            {
                name: "Pink theme",
                primaryColor: "#822659",
                secundaryColor: "#eeeeee",
                colorTwo: "#f8a1d1",
                colorThree: "#b34180",
            },
            {
                name: "Green theme",
                primaryColor: "#75cfb8",
                secundaryColor: "#eeeeee",
                colorTwo: "#f0e5d8",
                colorThree: "#bbdfc8",
            },
        ];
    }

    getThemeOption(name) {
        let themeOption = this.d.createElement("option");
        let themeName = this.d.createTextNode(name);
        themeOption.appendChild(themeName);
        return themeOption;
    }
}

export default class ThemeChanger extends Theme {
    constructor(themeComboBox, document) {
        super(document);
        this.comboBox = themeComboBox;
    }

    loadThemes() {
        for (let theme of this.themes) {
            let themeOption = this.getThemeOption(theme.name);
            this.comboBox.appendChild(themeOption);
        }
    }

    changeTheme() {
        let themeName = this.comboBox.value;
        let theme = this.findTheme(themeName);
        let rootStyles = this.d.documentElement;
        rootStyles.style.setProperty("--primary-color", theme.primaryColor);
        rootStyles.style.setProperty("--secundary-color", theme.secundaryColor);
        rootStyles.style.setProperty("--colorTwo", theme.colorTwo);
        rootStyles.style.setProperty("--colorThree", theme.colorThree);

        localStorage.setItem("theme", themeName);
    }

    findTheme(themeName) {
        let themeFound = this.themes.filter((theme) => theme.name === themeName);
        return themeFound[0];
    }
}
