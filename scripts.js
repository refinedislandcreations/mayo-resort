document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.getElementById('hamburger-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeButton = document.getElementById('close-menu');

  // Open mobile menu
  hamburgerButton?.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.add('show'); // Show the mobile menu
      mobileMenu.classList.remove('hidden'); // Ensure it's visible
    }
  });

  // Close mobile menu
  closeButton?.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.remove('show'); // Hide the mobile menu
      mobileMenu.classList.add('hidden'); // Ensure it's hidden
    }
  });

  // Optional: Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      mobileMenu &&
      !mobileMenu.contains(event.target) && // Click outside menu
      !hamburgerButton.contains(event.target) && // Click outside hamburger button
      !event.target.id.includes("close-menu") // Exclude click on close button
    ) {
      mobileMenu.classList.remove('show');
      mobileMenu.classList.add('hidden');
    }
  });
});



// Gallery
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    loop: true, // Infinite loop
    autoplay: {
      delay: 2000, // Autoplay delay
      disableOnInteraction: false, // Continue autoplay after user interaction
    },
    speed: 500, // Transition speed
    slidesPerView: 1, // Show one slide at a time
    spaceBetween: 10, // Space between slides
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Enable clickable dots
    },
    grabCursor: true, // Show grab cursor for better UX
  });
});



// Accordion meals
// Add event listeners to tab buttons for week switching
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove the 'active' class from all tab buttons
    document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));

    // Remove the 'active' class from all meal plan tables
    document.querySelectorAll(".meal-plan-table").forEach((table) => table.classList.remove("active"));

    // Add the 'active' class to the clicked button
    button.classList.add("active");

    // Get the corresponding week ID from the button's data attribute
    const weekId = button.getAttribute("data-week");

    // Add the 'active' class to the matching meal plan table
    const activeTable = document.getElementById(weekId);
    if (activeTable) {
      activeTable.classList.add("active");
    }
  });
});

// Add functionality for folder toggling
document.querySelectorAll(".folder-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const folderContent = tab.nextElementSibling;
    folderContent.style.display = folderContent.style.display === "block" ? "none" : "block";
  });
});

// Restaurant menu with loightbox

function openLightbox(imageUrl, captionText) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");

    lightboxImage.src = imageUrl;
    lightboxCaption.textContent = captionText;
    lightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.add("hidden");
  }

  function filterMenu(category) {
    const allItems = document.querySelectorAll(".restaurant-menu-item");
    const allButtons = document.querySelectorAll(".restaurant-menu-filter-button");

    // Update active button
    allButtons.forEach(button => button.classList.remove("active"));
    document.querySelector(`[data-filter="${category}"]`).classList.add("active");

    // Show/Hide Items
    allItems.forEach(item => {
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Show all items by default
  document.addEventListener("DOMContentLoaded", () => {
    filterMenu("all");
  });


// google form 

document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.querySelector(".google-form");
  iframe.addEventListener("load", function () {
    iframe.style.opacity = "1"; // Make the iframe visible after it loads
  });
});


 // Dynamically update the year
  document.getElementById("current-year").textContent = new Date().getFullYear();