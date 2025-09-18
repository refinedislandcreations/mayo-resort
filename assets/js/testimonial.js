document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  let autoSlideInterval;

  function showTestimonial(index) {
    testimonials.forEach((el, i) => {
      if (i === index) {
        el.classList.remove("opacity-0", "pointer-events-none");
      } else {
        el.classList.add("opacity-0", "pointer-events-none");
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
    // Jika auto slide aktif, restart interval
    if (window.innerWidth < 768) {
      autoSlideInterval = setInterval(nextTestimonial, 3000);
    }
  }

  // Inisialisasi tampilkan testimonial pertama
  showTestimonial(currentIndex);

  // Auto slide hanya di bawah md (768px)
  function setupAutoSlide() {
    if (window.innerWidth < 768) {
      // Start auto slide
      autoSlideInterval = setInterval(nextTestimonial, 3000);
    } else {
      // Clear auto slide kalau di atas md
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    }
  }

  setupAutoSlide();

  // Cek saat resize layar
  window.addEventListener("resize", () => {
    setupAutoSlide();
  });
});
