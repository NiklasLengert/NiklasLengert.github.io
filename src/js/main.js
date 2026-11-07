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
// Projects page: add new projects here, one object each.
const projects = [
    {
        name: "Niklas_Small_Java_Projects",
        description: "A collection of small Java mini games and tools: a calculator, a currency converter, a Pokémon guessing game, and Tic-Tac-Toe.",
        url: "https://github.com/NiklasLengert/Niklas_Small_Java_Projects",
        tags: ["Java", "Mini Games"],
    },
];

const projectGrid = document.querySelector(".project-grid");

if (projectGrid) {
    projectGrid.innerHTML = projects
        .map(
            (p) => `
            <a class="project-card" href="${p.url}" target="_blank" rel="noopener">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="project-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
            </a>`
        )
        .join("");
}
