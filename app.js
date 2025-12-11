/* ============================================
   KEMI 1 - Shared JavaScript
   ============================================ */

// ============================================
// Settings Management
// ============================================

/**
 * Toggle theme between light and dark mode
 */
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeButton();
}

/**
 * Toggle focus mode for enhanced accessibility
 */
function toggleFocus() {
  document.body.classList.toggle("focus-mode");
  const isFocus = document.body.classList.contains("focus-mode");
  localStorage.setItem("focusMode", isFocus ? "on" : "off");
  updateFocusButton();
}

/**
 * Toggle dyslexia-friendly font
 */
function toggleFont() {
  document.body.classList.toggle("dyslexia-font");
  const isDyslexia = document.body.classList.contains("dyslexia-font");
  localStorage.setItem("dyslexiaFont", isDyslexia ? "on" : "off");
  updateFontButton();
}

/**
 * Update theme button icon based on current state
 */
function updateThemeButton() {
  const btn = document.getElementById("themeToggle");
  if (btn) {
    const isLight = document.body.classList.contains("light-mode");
    btn.textContent = isLight ? "🌙" : "☀️";
    btn.title = isLight ? "Byt till mörkt läge" : "Byt till ljust läge";
    btn.classList.toggle("active", isLight);
  }
}

/**
 * Update focus button icon based on current state
 */
function updateFocusButton() {
  const btn = document.getElementById("focusToggle");
  if (btn) {
    const isFocus = document.body.classList.contains("focus-mode");
    btn.textContent = isFocus ? "✨" : "🎯";
    btn.title = isFocus ? "Avaktivera fokusläge" : "Aktivera fokusläge";
    btn.classList.toggle("active", isFocus);
  }
}

/**
 * Update font button text based on current state
 */
function updateFontButton() {
  const btn = document.getElementById("fontToggle");
  if (btn) {
    const isDyslexia = document.body.classList.contains("dyslexia-font");
    btn.textContent = isDyslexia ? "Dy" : "Aa";
    btn.title = isDyslexia
      ? "Byt till standardteckensnitt"
      : "Byt till dyslexivänligt teckensnitt";
    btn.classList.toggle("active", isDyslexia);
  }
}

// ============================================
// Progress Bar
// ============================================

/**
 * Update reading progress bar (only visible in focus mode)
 */
function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  if (!progressBar) return;

  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = scrollPercent + "%";
}

// ============================================
// Facit (Answer Key) Toggle
// ============================================

/**
 * Toggle visibility of answer key section
 */
function toggleFacit(button) {
  const facitContent = button.nextElementSibling;
  if (facitContent) {
    facitContent.classList.toggle("show");
    const isShowing = facitContent.classList.contains("show");
    button.textContent = isShowing ? "🔒 Dölj facit" : "🔑 Visa facit";
  }
}

// ============================================
// Initialization
// ============================================

/**
 * Apply saved preferences from localStorage
 */
function applyPreferences() {
  // Theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  // Focus Mode
  if (localStorage.getItem("focusMode") === "on") {
    document.body.classList.add("focus-mode");
  }

  // Dyslexia Font
  if (localStorage.getItem("dyslexiaFont") === "on") {
    document.body.classList.add("dyslexia-font");
  }

  // Update button states
  updateThemeButton();
  updateFocusButton();
  updateFontButton();
}

/**
 * Initialize all event listeners
 */
function initEventListeners() {
  // Progress bar on scroll
  window.addEventListener("scroll", updateProgressBar);

  // Settings buttons
  const themeBtn = document.getElementById("themeToggle");
  const focusBtn = document.getElementById("focusToggle");
  const fontBtn = document.getElementById("fontToggle");

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  if (focusBtn) focusBtn.addEventListener("click", toggleFocus);
  if (fontBtn) fontBtn.addEventListener("click", toggleFont);

  // Facit toggle buttons
  document.querySelectorAll(".facit-toggle").forEach((button) => {
    button.addEventListener("click", function () {
      toggleFacit(this);
    });
  });
}

/**
 * Initialize KaTeX auto-render if available
 */
function initKaTeX() {
  if (typeof renderMathInElement !== "undefined") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
    });
  }
}

/**
 * Main initialization function
 */
function init() {
  applyPreferences();
  initEventListeners();

  // Initialize KaTeX after a short delay to ensure it's loaded
  setTimeout(initKaTeX, 100);

  // Initial progress bar update
  updateProgressBar();
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
