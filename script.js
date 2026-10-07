const language = document.getElementById("dil-bar");
const html = document.documentElement;

const elements = document.querySelectorAll("[data-i18n], [data-i18n-title]");

function changeLanguage() {

    const currentLanguage = language ? language.value : (localStorage.getItem("language") || "tr");
    html.lang = currentLanguage;

    const currentTranslations = translations[currentLanguage];

    elements.forEach(function(element) {

        const key = element.getAttribute("data-i18n");

        if (key) {
            const translation = currentTranslations[key];
            element.textContent = translation;
        }

        const titleKey = element.getAttribute("data-i18n-title");

        if (titleKey) {
            element.setAttribute("title", currentTranslations[titleKey]);
        }

    });

}

if (language) {
    language.addEventListener("change", function() {
        localStorage.setItem("language", language.value);
        changeLanguage();
    });
}

const savedLanguage = localStorage.getItem("language");

if (language && savedLanguage) {
    language.value = savedLanguage;
}

changeLanguage();

document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

document.addEventListener("copy", function(event) {
    event.preventDefault();
});

document.addEventListener("cut", function(event) {
    event.preventDefault();
});

document.addEventListener("selectstart", function(event) {
    if (!event.target.closest("input, textarea, select, [contenteditable='true']")) {
        event.preventDefault();
    }
});

document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && ["a", "c", "x", "v"].includes(event.key.toLowerCase())) {
        event.preventDefault();
    }
});
