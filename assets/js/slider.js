document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const cards = slider.querySelectorAll(":scope > div");
  const prevBtn = document.getElementById("prevBtnSlider");
  const nextBtn = document.getElementById("nextBtnSlider");
  const indicator = document.getElementById("indicator");

  if (!slider || cards.length === 0 || !prevBtn || !nextBtn) {
    console.warn("Missing essential elements, cannot initialize slider");
    return;
  }

  let currentIndex = 1; // Start from second card (index 1)
  const totalCards = cards.length;

  // Clear previous indicators if any (safe re-initialize)
  indicator.innerHTML = "";

  // Create indicators (dots with border)
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement("div");
    dot.className = "w-4 h-4 rounded-full transition-all duration-300";
    dot.style.border = `2px solid #5aaf9d`;
    dot.style.backgroundColor = i === currentIndex ? "#5aaf9d" : "transparent";
    indicator.appendChild(dot);
  }

  function updateIndicators() {
    Array.from(indicator.children).forEach((dot, i) => {
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
  }

  function updateSlider() {
    const card = cards[0];
    const cardStyle = getComputedStyle(card);
    const cardMarginRight = parseFloat(cardStyle.marginRight) || 0;
    const cardMarginLeft = parseFloat(cardStyle.marginLeft) || 0;
    const totalCardWidth = card.offsetWidth + cardMarginLeft + cardMarginRight;

    const containerWidth = slider.parentElement.offsetWidth;

    // Calculate offset so current card is centered:
    // Move slider so that current card's left edge aligns at (containerWidth/2 - cardWidth/2)
    let offset =
      totalCardWidth * currentIndex - (containerWidth / 2 - totalCardWidth / 2);

    const maxOffset = totalCardWidth * (totalCards - 1);
    if (offset < 0) offset = 0;
    if (offset > maxOffset) offset = maxOffset;

    gsap.to(slider, {
      x: -offset,
      duration: 0.6,
      ease: "power3.out",
    });

    cards.forEach((card, i) => {
      if (i === currentIndex) {
        gsap.to(card, { scale: 1, opacity: 1, zIndex: 10, duration: 0.6 });
      } else if (i === currentIndex - 1 || i === currentIndex + 1) {
        gsap.to(card, { scale: 1, opacity: 0.6, zIndex: 5, duration: 0.6 });
      } else {
        gsap.to(card, { scale: 1, opacity: 0.3, zIndex: 1, duration: 0.6 });
      }
    });

    updateIndicators();
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);

  updateSlider();
});
