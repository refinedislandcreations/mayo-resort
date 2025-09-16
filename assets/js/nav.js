const initializeMobileMenu = () => {
  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  let isMenuOpen = false;

  if (!button || !menu) return;

  button.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    toggleMenu(menu, button, isMenuOpen);
  });
};

const toggleMenu = (menu, button, isOpen) => {
  const lines = button.querySelectorAll("span > span");
  if (isOpen) {
    menu.classList.remove("translate-x-full");
    menu.classList.add("translate-x-0");
    lines.forEach((line, index) => {
      if (index === 0) line.classList.add("rotate-45", "translate-y-2.5");
      if (index === 1) line.classList.add("opacity-0");
      if (index === 2) line.classList.add("-rotate-45", "-translate-y-2.5");
    });
  } else {
    menu.classList.add("translate-x-full");
    menu.classList.remove("translate-x-0");
    lines.forEach((line, index) => {
      if (index === 0) line.classList.remove("rotate-45", "translate-y-2.5");
      if (index === 1) line.classList.remove("opacity-0");
      if (index === 2) line.classList.remove("-rotate-45", "-translate-y-2.5");
    });
    closeAllDropdowns();
  }
};

const initializeDesktopDropdowns = () => {
  document.querySelectorAll(".xl\\:flex .group").forEach((dropdown) => {
    const menu = dropdown.querySelector("div.absolute");
    if (!menu) return;

    let timeout;

    dropdown.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
      toggleDropdown(menu, true);
    });

    dropdown.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => toggleDropdown(menu, false), 150);
    });

    menu.addEventListener("mouseenter", () => clearTimeout(timeout));
    menu.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => toggleDropdown(menu, false), 150);
    });

    dropdown.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      toggleDropdown(menu, !menu.classList.contains("opacity-100"));
    });
  });
};

const toggleDropdown = (menu, isOpen) => {
  if (isOpen) {
    menu.classList.add("opacity-100", "visible", "scale-100");
    menu.classList.remove("opacity-0", "invisible", "scale-95");
  } else {
    menu.classList.remove("opacity-100", "visible", "scale-100");
    menu.classList.add("opacity-0", "invisible", "scale-95");
  }
};

const closeAllDropdowns = () => {
  document.querySelectorAll("details.dropdown").forEach((el) => {
    const content = el.querySelector(".dropdown-content");
    const icon = el.querySelector("svg");
    el.open = false;
    content.style.maxHeight = "0px";
    content.style.opacity = "0";
    icon.classList.remove("rotate-180");
  });
};

const initializeMobileDropdowns = () => {
  document.querySelectorAll("details.dropdown").forEach((el) => {
    const summary = el.querySelector("summary");
    const content = el.querySelector(".dropdown-content");
    const icon = summary.querySelector("svg");

    summary.addEventListener("click", (e) => {
      e.preventDefault();

      const isOpen = el.open;

      // Close all first
      document.querySelectorAll("details.dropdown").forEach((otherEl) => {
        const otherContent = otherEl.querySelector(".dropdown-content");
        const otherIcon = otherEl.querySelector("svg");
        otherEl.open = false;
        otherContent.style.maxHeight = "0px";
        otherContent.style.opacity = "0";
        otherIcon.classList.remove("rotate-180");
      });

      if (!isOpen) {
        // Open only the clicked one
        el.open = true;
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
        icon.classList.add("rotate-180");
      }
    });

    content.addEventListener("transitionend", () => {
      if (el.open) {
        content.style.maxHeight = "none";
      }
    });

    content.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        const button = document.getElementById("mobile-menu-button");
        const menu = document.getElementById("mobile-menu");
        toggleMenu(menu, button, false);
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeMobileMenu();
  initializeDesktopDropdowns();
  initializeMobileDropdowns();
});
