document.addEventListener("DOMContentLoaded", () => {
  // --- TAB SYSTEM INITIALIZATION ---
  const tabsContainer = document.querySelector(".tabs");

  if (tabsContainer) {
    tabsContainer.addEventListener("click", (e) => {
      const clickedTab = e.target.closest(".tab-btn");
      if (!clickedTab) return;

      // Remove active states from buttons
      document
        .querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      // Remove active states from columns
      document
        .querySelectorAll(".day-content")
        .forEach((content) => content.classList.remove("active"));

      // Apply active styles
      clickedTab.classList.add("active");
      const targetId = clickedTab.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      if (targetContent) {
        targetContent.classList.add("active");
      }

      // Smooth snapping shift to top on mobile tab swap
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- MODAL UTILITIES ---
  const flightBtn = document.getElementById("flightBtn");
  const opryBtn = document.getElementById("opryBtn");
  const blueBtn = document.getElementById("blueBtn");
  const flightModal = document.getElementById("flight-modal");
  const opryModal = document.getElementById("opry-modal");
  const blueModal = document.getElementById("blue-modal");

  // Open functions
  if (flightBtn && flightModal) {
    flightBtn.addEventListener("click", () => openModal(flightModal));
  }
  if (opryBtn && opryModal) {
    opryBtn.addEventListener("click", () => openModal(opryModal));
  }
  if (blueBtn && blueModal) {
    blueBtn.addEventListener("click", () => openModal(blueModal));
  }

  // Handle internal close clicks via elements containing data attributes
  document.querySelectorAll("[data-close]").forEach((closer) => {
    closer.addEventListener("click", () => {
      const targetModalId = closer.getAttribute("data-close");
      const modalInstance = document.getElementById(targetModalId);
      if (modalInstance) closeModal(modalInstance);
    });
  });

  // Dismiss interface frames when clicking out-of-bounds backgrounds
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  function openModal(modalElement) {
    modalElement.classList.add("open");
    document.body.style.overflow = "hidden"; // Lock context background scroll mechanics
  }

  function closeModal(modalElement) {
    modalElement.classList.remove("open");
    document.body.style.overflow = "";
  }
});
