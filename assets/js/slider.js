document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dots");

  const slides = Array.from(slider.children);
  const totalSlides = slides.length;

  // Start with the second card (index 1) as the main show.
  let currentIndex = 1;

  // --- Create Dots ---
  function setupDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add(
        "w-3",
        "h-3",
        "rounded-full",
        "bg-gray-300",
        "transition-colors"
      );
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // --- Main Update Function ---
  function updateSlider() {
    const sliderContainer = slider.parentElement;
    const containerWidth = sliderContainer.offsetWidth;
    const activeSlide = slides[currentIndex];

    // Calculate the position needed to center the active slide
    const slideWidth = activeSlide.offsetWidth;
    const slideOffsetLeft = activeSlide.offsetLeft;

    // The goal is to move the slider track so that the center of the active slide
    // aligns with the center of the container.
    const targetPosition =
      containerWidth / 2 - (slideOffsetLeft + slideWidth / 2);

    slider.style.transform = `translateX(${targetPosition}px)`;

    // Update styles for all slides (active vs. inactive)
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        // Active slide
        slide.classList.remove("opacity-50", "scale-90");
        slide.classList.add("opacity-100", "scale-100");
      } else {
        // Inactive slides
        slide.classList.remove("opacity-100", "scale-100");
        slide.classList.add("opacity-50", "scale-90");
      }
    });

    // Update active dot
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-teal-500");
      } else {
        dot.classList.remove("bg-teal-500");
        dot.classList.add("bg-gray-300");
      }
    });
  }

  // --- Event Listeners ---
  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Recalculate on window resize for responsiveness
  window.addEventListener("resize", updateSlider);

  // --- Initial Setup ---
  setupDots();
  // Use a small timeout to ensure all elements are rendered before the first calculation
  setTimeout(updateSlider, 50);
});
