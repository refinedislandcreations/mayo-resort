document.addEventListener("DOMContentLoaded", () => {
  const popupModal = document.getElementById("popupModal");
  const popupCards = document.querySelectorAll(".popup-card");
  const indicators = document.querySelectorAll("#popupIndicators > div");
  const prevBtn = document.getElementById("prevBtnPopup");
  const nextBtn = document.getElementById("nextBtnPopup");
  const closeBtn = document.getElementById("closePopupBtn");

  let currentIndex = 0;

  function updatePopup(index) {
    popupCards.forEach((card, i) => {
      card.classList.toggle("hidden", i !== index);
    });
    indicators?.forEach((dot, i) => {
      dot.classList.toggle("bg-[#5aaf9d]", i === index);
      dot.classList.toggle("bg-transparent", i !== index);
    });
  }

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % popupCards.length;
    updatePopup(currentIndex);
  });

  prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + popupCards.length) % popupCards.length;
    updatePopup(currentIndex);
  });

  closeBtn?.addEventListener("click", () => {
    popupModal.classList.add("hidden");
  });

  // Show modal on load
  popupModal.classList.remove("hidden");

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupModal.classList.add("hidden");
    }
  });
});
