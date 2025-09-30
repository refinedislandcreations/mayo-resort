document.addEventListener("DOMContentLoaded", function () {
  const lazyBgSections = document.querySelectorAll(".lazy-bg");

  // Langsung set background image tanpa IntersectionObserver
  lazyBgSections.forEach((section) => {
    const bg = section.getAttribute("data-bg");
    if (bg) {
      section.style.backgroundImage = `url('${bg}')`;
      section.classList.remove("lazy-bg");
    }
  });
});
