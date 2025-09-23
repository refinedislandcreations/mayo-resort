document.addEventListener("DOMContentLoaded", function () {
  const lazyBgSections = document.querySelectorAll(".lazy-bg");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const bg = section.getAttribute("data-bg");
          if (bg) {
            section.style.backgroundImage = `url('${bg}')`;
            section.classList.remove("lazy-bg");
            observer.unobserve(section);
          }
        }
      });
    });

    lazyBgSections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    // Fallback: load all backgrounds immediately
    lazyBgSections.forEach((section) => {
      const bg = section.getAttribute("data-bg");
      if (bg) {
        section.style.backgroundImage = `url('${bg}')`;
        section.classList.remove("lazy-bg");
      }
    });
  }
});
