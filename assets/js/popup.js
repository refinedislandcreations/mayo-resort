document.addEventListener("DOMContentLoaded", () => {
  const popupModal = document.getElementById("popupModal");
  const popupCards = document.querySelectorAll(".popup-card");
  const indicators = document.querySelectorAll("#popupIndicators > div");
  const prevBtn = document.getElementById("prevBtnPopup");
  const nextBtn = document.getElementById("nextBtnPopup");

  let currentIndex = 0;

  function updatePopup(index) {
    popupCards.forEach((card, i) => {
      card.classList.toggle("hidden", i !== index);
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle("bg-[#5aaf9d]", i === index);
      dot.classList.toggle("bg-transparent", i !== index);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % popupCards.length;
    updatePopup(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + popupCards.length) % popupCards.length;
    updatePopup(currentIndex);
  });

  // Show modal on load
  popupModal.classList.remove("hidden");

  // Close modal on click outside
  popupModal.addEventListener("click", (e) => {
    if (e.target === popupModal) {
      popupModal.classList.add("hidden");
    }
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupModal.classList.add("hidden");
    }
  });
});
