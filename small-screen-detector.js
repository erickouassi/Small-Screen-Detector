class SmallScreenDetector {
  constructor(options = {}) {
    this.breakpoint = options.breakpoint || 768;
    this.message = options.message || 
      "📱 This tool works best on a larger screen. Please switch to a computer or tablet for the full experience.";

    this.container = document.getElementById("small-screen-detector");

    this.injectStyles();
    this.render();
    this.check();

    window.addEventListener("resize", () => this.check());
  }

  injectStyles() {
    const widgetStyle = `
      #small-screen-detector {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 92%;
        max-width: 420px;
        background: #fff4c2;
        color: #333;
        padding: 18px 20px;
        border-radius: 14px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        font-size: 0.95rem;
        font-weight: 600;
        text-align: center;
        z-index: 99999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.35s ease;
      }

      #small-screen-detector.show {
        opacity: 1;
        pointer-events: auto;
      }

      #small-screen-detector .close-btn {
        margin-top: 12px;
        display: inline-block;
        padding: 7px 14px;
        background: #333;
        color: #fff;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;
      }
    `;

    const styleTag = document.createElement("style");
    styleTag.textContent = widgetStyle;
    document.head.appendChild(styleTag);
  }

  render() {
    this.container.innerHTML = `
      <div class="msg">${this.message}</div>
      <div class="close-btn">OK</div>
    `;

    this.container.querySelector(".close-btn").addEventListener("click", () => {
      this.hide();
    });
  }

  check() {
    if (window.innerWidth < this.breakpoint) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.container.classList.add("show");
  }

  hide() {
    this.container.classList.remove("show");
  }
}

// Initialize Small‑Screen Detector
new SmallScreenDetector({
  breakpoint: 768
});
