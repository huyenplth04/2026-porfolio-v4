document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".subnav_button-item[data-filter]");
  const projectCards = document.querySelectorAll(".homepage_wrapper .article_container[data-category]");

  if (!filterButtons.length || !projectCards.length) {
    return;
  }

  const setActiveButton = (selectedButton) => {
    filterButtons.forEach((button) => {
      const isActive = button === selectedButton;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const filterProjects = (selectedFilter) => {
    projectCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" || card.dataset.category === selectedFilter;

      card.hidden = !shouldShow;
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveButton(button);
      filterProjects(button.dataset.filter);
    });
  });
});
