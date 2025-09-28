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
  const topLine = button.querySelector(".top");
  const middleLine = button.querySelector(".middle");
  const bottomLine = button.querySelector(".bottom");

  if (isOpen) {
    menu.classList.remove("translate-x-full");
    menu.classList.add("translate-x-0");

    // Fade out middle line
    middleLine.style.opacity = "0";

    // Transform top and bottom lines to form an "X"
    topLine.style.transform = "translateY(10px) rotate(45deg)";
    bottomLine.style.transform = "translateY(-10px) rotate(-45deg)";
  } else {
    menu.classList.add("translate-x-full");
    menu.classList.remove("translate-x-0");

    // Restore middle line
    middleLine.style.opacity = "1";

    // Reset transformations
    topLine.style.transform = "translateY(0) rotate(0deg)";
    bottomLine.style.transform = "translateY(0) rotate(0deg)";
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

      if (!isOpen) {
        // Close all other dropdowns smoothly first
        document.querySelectorAll("details.dropdown").forEach((otherEl) => {
          if (otherEl === el) return; // skip the one we want to open

          const otherContent = otherEl.querySelector(".dropdown-content");
          const otherIcon = otherEl.querySelector("svg");

          if (otherEl.open) {
            otherContent.style.maxHeight = otherContent.scrollHeight + "px"; // reset to full height before collapsing
            otherContent.offsetHeight; // force reflow

            otherContent.style.maxHeight = "0px";
            otherContent.style.opacity = "0";

            const closeHandler = () => {
              otherEl.open = false;
              otherIcon.classList.remove("rotate-180");
              otherContent.removeEventListener("transitionend", closeHandler);
            };
            otherContent.addEventListener("transitionend", closeHandler);
          }
        });

        // **Add this line before opening your clicked dropdown**
        content.style.maxHeight = "0px";
        content.offsetHeight; // force reflow

        // Open clicked dropdown
        el.open = true;
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
        icon.classList.add("rotate-180");
      } else {
        // Close clicked dropdown smoothly
        content.style.maxHeight = content.scrollHeight + "px"; // reset to full height before collapsing
        content.offsetHeight; // force reflow

        content.style.maxHeight = "0px";
        content.style.opacity = "0";

        const closeHandler = () => {
          el.open = false;
          icon.classList.remove("rotate-180");
          content.removeEventListener("transitionend", closeHandler);
        };
        content.addEventListener("transitionend", closeHandler);
      }
    });

    content.addEventListener("transitionend", () => {
      if (el.open) {
        content.style.maxHeight = "none"; // remove max-height limit after transition
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
