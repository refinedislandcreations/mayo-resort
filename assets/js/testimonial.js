(() => {
  const testimonials = document.querySelectorAll(".testimonial-item");
  const container = document.getElementById("testimonialContainer");
  let currentIndex = 0;
  const total = testimonials.length;

  // Buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const mobilePrevBtn = document.getElementById("mobilePrevBtn");
  const mobileNextBtn = document.getElementById("mobileNextBtn");
  const mobileArrows = document.getElementById("mobileArrows");

  // Indicator containers (desktop and mobile)
  const indicatorDesktop = document.getElementById(
    "testimonialIndicatorDesktop"
  );
  const indicatorMobile = document.getElementById("testimonialIndicatorMobile");

  // Helper: create indicator dots inside a container
  function createIndicatorDots(container) {
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("div");
      dot.className =
        "w-4 h-4 rounded-full cursor-pointer transition-all duration-300";
      dot.style.border = "2px solid #5aaf9d";
      dot.style.backgroundColor =
        i === currentIndex ? "#5aaf9d" : "transparent";
      dot.style.opacity = i === currentIndex ? "1" : "0.6";
      dot.dataset.index = i;
      container.appendChild(dot);
    }
  }

  // Update indicator dots style based on current index
  function updateIndicators() {
    [indicatorDesktop, indicatorMobile].forEach((container) => {
      if (!container) return;
      Array.from(container.children).forEach((dot, i) => {
        if (i === currentIndex) {
          dot.style.backgroundColor = "#5aaf9d";
          dot.style.borderColor = "#5aaf9d";
          dot.style.opacity = "1";
        } else {
          dot.style.backgroundColor = "transparent";
          dot.style.borderColor = "#5aaf9d";
          dot.style.opacity = "0.6";
        }
      });
    });
  }

  // Fix container height based on tallest testimonial
  function fixContainerHeight() {
    let maxHeight = 0;
    testimonials.forEach((item) => {
      // Save current styles
      const prevDisplay = item.style.display;
      const prevPosition = item.style.position;
      const prevOpacity = item.style.opacity;

      // Temporarily show the testimonial to measure height
      item.style.position = "relative";
      item.style.display = "block";
      item.style.opacity = "1";

      // Measure height
      const height = item.offsetHeight;

      if (height > maxHeight) maxHeight = height;

      // Revert styles
      item.style.display = prevDisplay;
      item.style.position = prevPosition;
      item.style.opacity = prevOpacity;
    });

    if (container) {
      container.style.minHeight = maxHeight + "px";
    }
  }

  // Show testimonial at the given index
  function showTestimonial(newIndex) {
    if (newIndex === currentIndex) return;

    // Wrap index around
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;

    const current = testimonials[currentIndex];
    const next = testimonials[newIndex];

    // Fade out current testimonial
    gsap.to(current, {
      duration: 0.25,
      opacity: 0,
      onComplete: () => {
        // Hide current testimonial and reset styles
        current.style.display = "none";
        current.style.position = "absolute";
        current.style.pointerEvents = "none";

        // Show next testimonial and set styles for visibility
        next.style.display = "block";
        next.style.position = "relative";
        next.style.pointerEvents = "auto";
        next.style.opacity = 0;

        // Fade in next testimonial
        gsap.to(next, {
          duration: 0.25,
          opacity: 1,
        });

        currentIndex = newIndex;
        updateIndicators();
      },
    });
  }

  // Button event handlers
  function prev() {
    showTestimonial(currentIndex - 1);
  }
  function next() {
    showTestimonial(currentIndex + 1);
  }

  // Attach event listeners with null checks
  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (mobilePrevBtn) mobilePrevBtn.addEventListener("click", prev);
  if (mobileNextBtn) mobileNextBtn.addEventListener("click", next);

  // Click on indicator dots to navigate
  [indicatorDesktop, indicatorMobile].forEach((container) => {
    if (!container) return;
    container.addEventListener("click", (e) => {
      if (e.target && e.target.dataset.index !== undefined) {
        const idx = parseInt(e.target.dataset.index, 10);
        if (!isNaN(idx)) {
          showTestimonial(idx);
        }
      }
    });
  });

  // Responsive layout handling
  function updateLayout() {
    const isMobile = window.innerWidth < 1024;

    if (prevBtn) prevBtn.style.display = isMobile ? "none" : "flex";
    if (nextBtn) nextBtn.style.display = isMobile ? "none" : "flex";
    if (mobileArrows) mobileArrows.style.display = isMobile ? "flex" : "none";
  }

  // Initialize indicators
  createIndicatorDots(indicatorDesktop);
  createIndicatorDots(indicatorMobile);

  // Initialize layout and testimonials
  window.addEventListener("resize", () => {
    updateLayout();
    fixContainerHeight();
  });
  window.addEventListener("load", () => {
    updateLayout();
    fixContainerHeight();
  });

  // Hide all testimonials except the first, and set positions correctly
  testimonials.forEach((item, i) => {
    if (i !== currentIndex) {
      item.style.display = "none";
      item.style.position = "absolute";
      item.style.pointerEvents = "none";
      item.style.opacity = 0;
    } else {
      item.style.display = "block";
      item.style.position = "relative";
      item.style.pointerEvents = "auto";
      item.style.opacity = 1;
    }
  });

  updateIndicators();
})();
