document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  let autoSlideInterval;

  function showTestimonial(index) {
    testimonials.forEach((el, i) => {
      if (i === index) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
    resetAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    nextTestimonial();
    resetAutoSlide();
  });

  function resetAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    if (window.innerWidth < 768) {
      autoSlideInterval = setInterval(nextTestimonial, 3000);
    }
  }

  showTestimonial(currentIndex);

  function setupAutoSlide() {
    if (window.innerWidth < 768) {
      autoSlideInterval = setInterval(nextTestimonial, 3000);
    } else {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    }
  }

  setupAutoSlide();

  window.addEventListener("resize", () => {
    setupAutoSlide();
  });
});
