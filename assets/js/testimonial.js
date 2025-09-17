document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-item");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((el, i) => {
      if (i === index) {
        el.classList.remove("opacity-0", "pointer-events-none");
      } else {
        el.classList.add("opacity-0", "pointer-events-none");
      }
    });
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });

  // Inisialisasi tampilkan testimonial pertama
  showTestimonial(currentIndex);
});
