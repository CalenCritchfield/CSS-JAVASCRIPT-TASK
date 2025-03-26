class ReviewProgressSteps {
  constructor() {
    this.reviews = [
      {
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        text: "This product completely transformed my daily routine. I never thought I could be so productive and organized!",
        author: "- Sarah Johnson, Marketing Director",
      },
      {
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        text: "Incredible value for money. I've tried many similar products, but this one stands out in terms of quality and performance.",
        author: "- Michael Chen, Tech Entrepreneur",
      },
      {
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        text: "As a professional in my field, I need tools that are both efficient and reliable. This product exceeds all my expectations.",
        author: "- Emily Rodriguez, Business Consultant",
      },
      {
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        text: "Game-changer! I've recommended this to all my colleagues and friends. It's that good!",
        author: "- David Thompson, Creative Director",
      },
    ];

    this.currentStep = 1;
    this.progressBar = document.querySelector(".progress-bar");
    this.reviewContent = document.querySelector(".review-content");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");

    this.renderSteps();
    this.renderReview();
    this.bindEvents();
  }

  renderSteps() {
    const existingSteps = this.progressBar.querySelectorAll(".step");
    existingSteps.forEach((step) => step.remove());

    this.reviews.forEach((_, index) => {
      const step = document.createElement("div");
      step.classList.add("step");
      step.setAttribute("data-step", index + 1);
      step.textContent = index + 1;

      if (index < this.currentStep) {
        step.classList.add("active");
      }

      this.progressBar.insertBefore(
        step,
        this.progressBar.querySelector(".progress")
      );
    });

    this.updateProgressBar();
  }

  renderReview() {
    const review = this.reviews[this.currentStep - 1];
    this.reviewContent.innerHTML = `
                <img src="${review.image}" alt="Reviewer">
                <div class="review-text">${review.text}</div>
                <div class="review-author">${review.author}</div>
            `;
  }

  updateProgressBar() {
    const progress = this.progressBar.querySelector(".progress");
    const activeSteps = this.progressBar.querySelectorAll(".step.active");
    progress.style.width =
      ((activeSteps.length - 1) / (this.reviews.length - 1)) * 100 + "%";
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.previous());
    this.nextBtn.addEventListener("click", () => this.next());
  }

  next() {
    if (this.currentStep < this.reviews.length) {
      this.currentStep++;
      this.update();
    }
  }

  previous() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.update();
    }
  }

  update() {
    const steps = this.progressBar.querySelectorAll(".step");
    steps.forEach((step, index) => {
      step.classList.toggle("active", index < this.currentStep);
    });

    this.prevBtn.disabled = this.currentStep === 1;
    this.nextBtn.disabled = this.currentStep === this.reviews.length;

    this.updateProgressBar();

    this.renderReview();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ReviewProgressSteps();
});
