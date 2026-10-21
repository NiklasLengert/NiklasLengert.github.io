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