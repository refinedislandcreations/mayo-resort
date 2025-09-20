(() => {
  const testimonials = document.querySelectorAll(".testimonial-item");
  let currentIndex = 0;
  const total = testimonials.length;

  // Buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const mobilePrevBtn = document.getElementById("mobilePrevBtn");
  const mobileNextBtn = document.getElementById("mobileNextBtn");
  const mobileArrows = document.getElementById("mobileArrows");

  // Show testimonial at index
  function showTestimonial(newIndex) {
    if (newIndex === currentIndex) return;

    // Wrap index
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;

    const current = testimonials[currentIndex];
    const next = testimonials[newIndex];

    // Fade out current fully
    gsap.to(current, {
      duration: 0.25,
      opacity: 0,
      onComplete: () => {
        current.style.display = "none";

        // Prepare next testimonial
        next.style.display = "block";
        next.style.opacity = 0;

        // Fade in next testimonial
        gsap.to(next, {
          duration: 0.25,
          opacity: 1,
        });

        currentIndex = newIndex;
      },
    });
  }

  // Event handlers for buttons
  function prev() {
    showTestimonial(currentIndex - 1);
  }
  function next() {
    showTestimonial(currentIndex + 1);
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  mobilePrevBtn.addEventListener("click", prev);
  mobileNextBtn.addEventListener("click", next);

  // Responsive handling: toggle button visibility & position
  function updateLayout() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Hide desktop buttons
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";

      // Show mobile arrows container below testimonial
      mobileArrows.style.display = "flex";
    } else {
      // Show desktop buttons
      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";

      // Hide mobile arrows
      mobileArrows.style.display = "none";
    }
  }

  // Initialize layout on load and resize
  window.addEventListener("resize", updateLayout);
  updateLayout();

  // Initially show first testimonial (already visible via markup)
  // But ensure all others are hidden
  testimonials.forEach((item, i) => {
    if (i !== currentIndex) item.style.display = "none";
  });
})();
