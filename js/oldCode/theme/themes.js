export function changeThemeComboBox(theme) {
    let rootStyles = document.documentElement;

    switch (theme) {
        case "Scartlett Theme":
            rootStyles.style.setProperty("--primary-color", "#db6400");
            rootStyles.style.setProperty("--secundary-color", "#f8f1f1");
            rootStyles.style.setProperty("--colorTwo", "#272727");
            rootStyles.style.setProperty("--colorThree", "#ffa62b");

            break;

        case "Dark Theme":
            rootStyles.style.setProperty("--primary-color", "#222831");
            rootStyles.style.setProperty("--secundary-color", "#eeeeee");
            rootStyles.style.setProperty("--colorTwo", "#ffd369");
            rootStyles.style.setProperty("--colorThree", "#393e46");

            break;
    }
    
    saveThemeStorage(theme);
}


const saveThemeStorage = (theme)=>{
    localStorage.setItem("theme", theme);
}