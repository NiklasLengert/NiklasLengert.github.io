const { translations, pageMetadata } = window.siteI18n;

const careerTabs = document.querySelectorAll(".career-tab");

careerTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        careerTabs.forEach((item) => {
            const isSelected = item === tab;
            item.setAttribute("aria-selected", isSelected);
            item.tabIndex = isSelected ? 0 : -1;

            const panel = document.getElementById(item.getAttribute("aria-controls"));
            panel.hidden = !isSelected;
        });
    });

    tab.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            const nextIndex = (index + (event.key === "ArrowRight" ? 1 : -1) + careerTabs.length) % careerTabs.length;
            careerTabs[nextIndex].focus();
            careerTabs[nextIndex].click();
        }
    });
});
const projectGrid = document.querySelector(".project-grid");

// Projects page: add new projects here, one object each.
const projects = [
    {
        name: "Niklas_Small_Java_Projects",
        description: {
            en: "A collection of small Java mini games and tools: a calculator, a currency converter, a Pokémon guessing game, and Tic-Tac-Toe.",
            de: "Eine Sammlung kleiner Java-Spiele und Werkzeuge: ein Taschenrechner, ein Währungsrechner, ein Pokémon-Ratespiel und Tic-Tac-Toe.",
        },
        url: "https://github.com/NiklasLengert/Niklas_Small_Java_Projects",
        tags: {
            en: ["Java", "Mini Games"],
            de: ["Java", "Minispiele"],
        },
    },
];

function renderProjects(language) {
    if (!projectGrid) {
        return;
    }

    projectGrid.innerHTML = projects
        .map(
            (project) => `
            <a class="project-card" href="${project.url}" target="_blank" rel="noopener">
                <h3>${project.name}</h3>
                <p>${project.description[language]}</p>
                <div class="project-tags">${project.tags[language].map((tag) => `<span>${tag}</span>`).join("")}</div>
            </a>`
        )
        .join("");
}

function setLanguage(language) {
    const page = document.body.dataset.page;
    const metadata = pageMetadata[page][language];

    document.documentElement.lang = language;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').content = metadata.description;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = translations[language][element.dataset.i18n];
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        element.alt = translations[language][element.dataset.i18nAlt];
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        element.setAttribute("aria-label", translations[language][element.dataset.i18nAriaLabel]);
    });

    document.querySelectorAll("[data-i18n-email-subject]").forEach((element) => {
        const subject = translations[language][element.dataset.i18nEmailSubject];
        element.href = `mailto:${element.dataset.emailAddress}?subject=${encodeURIComponent(subject)}`;
    });

    document.querySelectorAll(".language-button").forEach((button) => {
        button.setAttribute("aria-pressed", button.dataset.language === language);
    });

    window.localStorage.setItem("preferred-language", language);
    renderProjects(language);
}

document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const savedLanguage = window.localStorage.getItem("preferred-language");
setLanguage(savedLanguage === "de" ? "de" : "en");
