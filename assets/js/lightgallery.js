// assets/js/lightgallery.js

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("lightgallery-desktop")) {
    lightGallery(document.getElementById("lightgallery-desktop"), {
      plugins: [lgThumbnail, lgZoom],
      speed: 500,
      licenseKey: "your_license_key_if_needed", // Optional
    });
  }

  if (document.getElementById("lightgallery-mobile")) {
    lightGallery(document.getElementById("lightgallery-mobile"), {
      plugins: [lgThumbnail, lgZoom],
      speed: 500,
      licenseKey: "your_license_key_if_needed",
    });
  }
});
