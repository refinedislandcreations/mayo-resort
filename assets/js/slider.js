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

  let currentIndex = 1; // Start dari card kedua
  const totalCards = cards.length;
  let animationInProgress = false;

  indicator.innerHTML = "";
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

  function calcOffset(index) {
    const card = cards[0];
    const cardStyle = getComputedStyle(card);
    const cardMarginRight = parseFloat(cardStyle.marginRight) || 0;
    const cardMarginLeft = parseFloat(cardStyle.marginLeft) || 0;
    const totalCardWidth = card.offsetWidth + cardMarginLeft + cardMarginRight;
    const containerWidth = slider.parentElement.offsetWidth;

    let offset =
      totalCardWidth * index - (containerWidth / 2 - totalCardWidth / 2);

    const maxOffset = totalCardWidth * (totalCards - 1);
    if (offset < 0) offset = 0;
    if (offset > maxOffset) offset = maxOffset;

    return offset;
  }

  // Quick setter untuk performa transform slider selama drag
  const setX = gsap.quickSetter(slider, "x", "px");

  // Update slider dengan animasi GSAP
  function updateSlider() {
    animationInProgress = true;
    const offset = calcOffset(currentIndex);

    gsap.to(slider, {
      x: -offset,
      duration: 0.6,
      ease: "power3.out",
      onComplete: () => {
        animationInProgress = false;
      },
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
    if (animationInProgress) return;
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    if (animationInProgress) return;
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  });

  // === touch swipe feature ===
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let dragOffset = 0;

  slider.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1 && !animationInProgress) {
      startX = e.touches[0].clientX;
      isDragging = true;
      dragOffset = 0;

      // Kill animasi GSAP yang sedang berjalan supaya drag responsif
      gsap.killTweensOf(slider);
    }
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    dragOffset = currentX - startX;

    if (Math.abs(dragOffset) > 10) {
      e.preventDefault();
    }

    const baseOffset = calcOffset(currentIndex);
    const card = cards[0];
    const cardStyle = getComputedStyle(card);
    const cardMarginRight = parseFloat(cardStyle.marginRight) || 0;
    const cardMarginLeft = parseFloat(cardStyle.marginLeft) || 0;
    const totalCardWidth = card.offsetWidth + cardMarginLeft + cardMarginRight;
    const maxOffset = totalCardWidth * (totalCards - 1);
    const minTranslateX = -maxOffset;
    const maxTranslateX = 0;

    let translateX = -baseOffset + dragOffset;

    if (translateX > maxTranslateX) translateX = maxTranslateX;
    if (translateX < minTranslateX) translateX = minTranslateX;

    setX(translateX);
  });

  slider.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const threshold = 50;

    if (dragOffset > threshold) {
      // Swipe right = prev slide
      if (!animationInProgress) {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      }
    } else if (dragOffset < -threshold) {
      // Swipe left = next slide
      if (!animationInProgress) {
        currentIndex = (currentIndex + 1) % totalCards;
      }
    }
    dragOffset = 0;

    updateSlider();
  });

  window.addEventListener("resize", () => {
    if (!isDragging && !animationInProgress) {
      updateSlider();
    }
  });

  // Inisialisasi slider
  updateSlider();
});
