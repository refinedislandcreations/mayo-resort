document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dots");

  // Debug: Log if elements are found
  console.log("Slider:", slider);
  console.log("Prev Button:", prevBtn);
  console.log("Next Button:", nextBtn);
  console.log("Dots Container:", dotsContainer);

  // Exit if essential elements aren't found
  if (!slider || !prevBtn || !nextBtn || !dotsContainer) {
    console.error("Slider elements not found. Please check your HTML IDs.");
    return;
  }

  const slides = Array.from(slider.children);
  const totalSlides = slides.length;

  // Debug: Log number of slides
  console.log("Total Slides:", totalSlides);

  // Exit if there are no slides to display
  if (totalSlides === 0) {
    console.error("No slides found in the slider.");
    return;
  }

  // --- State ---
  let currentIndex = 1; // Start with the second slide

  // --- Create Dots ---
  function setupDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add(
        "w-4",
        "h-4",
        "rounded-full",
        "border-2",
        "border-raisin-black",
        "bg-transparent",
        "transition-colors",
        "duration-300",
        "cursor-pointer"
      );
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => {
        console.log(`Dot ${index + 1} clicked`);
        currentIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
      console.log(`Created dot ${index + 1} with classes:`, dot.className); // Debug dot creation
    });
  }

  // --- Main Update Function ---
  function updateSlider() {
    const sliderContainer = slider.parentElement;
    const containerWidth = sliderContainer.offsetWidth || window.innerWidth;
    const activeSlide = slides[currentIndex];
    const slideWidth = activeSlide.offsetWidth || 0;
    const slideOffsetLeft = activeSlide.offsetLeft || 0;

    console.log("Container Width:", containerWidth);
    console.log("Slide Width:", slideWidth);
    console.log("Slide Offset Left:", slideOffsetLeft);
    console.log("Current Index:", currentIndex);

    const targetPosition =
      containerWidth / 2 - (slideOffsetLeft + slideWidth / 2);
    slider.style.transform = `translateX(${targetPosition}px)`;

    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.remove("opacity-50", "scale-90");
        slide.classList.add("opacity-100", "scale-100");
      } else {
        slide.classList.remove("opacity-100", "scale-100");
        slide.classList.add("opacity-50", "scale-90");
      }
    });

    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove("bg-transparent", "border-raisin-black");
        dot.classList.add("bg-keppel", "border-keppel");
      } else {
        dot.classList.remove("bg-keppel", "border-keppel");
        dot.classList.add("bg-transparent", "border-raisin-black");
      }
      console.log(`Dot ${index + 1} classes:`, dot.className); // Debug dot styling
    });
  }

  // --- Event Listeners ---
  [prevBtn, nextBtn].forEach((btn) => {
    btn.disabled = false;
    btn.style.pointerEvents = "auto";
    btn.style.position = "relative"; // Ensure no overlap
    btn.style.zIndex = "10"; // Ensure buttons are on top
  });

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Previous button clicked, currentIndex before:", currentIndex);
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    console.log("Current Index after:", currentIndex);
    updateSlider();
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Next button clicked, currentIndex before:", currentIndex);
    currentIndex = (currentIndex + 1) % totalSlides;
    console.log("Current Index after:", currentIndex);
    updateSlider();
  });

  window.addEventListener("resize", () => {
    console.log("Window resized, updating slider");
    updateSlider();
  });

  // --- Initial Setup ---
  setupDots();
  setTimeout(updateSlider, 50);
});
