document.addEventListener("DOMContentLoaded", () => {
  // CONFIG – change these to your actual details
  const DAY = "Saturday";
  const DATE = "November  29";
  const PLACE = "Cubao Expo";
  const MOVIE_DATE = "November  29";

  // DOM refs
  const landing = document.getElementById("landing");
  const bookView = document.getElementById("bookView");
  const bookCover = document.getElementById("bookCover");
  const bookFrame = document.getElementById("bookFrame");

  const inviteCard = document.getElementById("inviteCard");
  const nextTimeMessage = document.getElementById("nextTimeMessage");
  const inviteMainText = document.getElementById("inviteMainText");

  const inviteModal = document.getElementById("inviteModal");
  const modalCard = document.getElementById("modalCard");
  const modalClose = document.getElementById("modalClose");
  const questionText = document.getElementById("questionText");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  const downloadDateFlip = document.getElementById("downloadDateFlip");
  const downloadMovieTicket = document.getElementById("downloadMovieTicket");

  // steps:
  // 1 - "Are you free...?"
  // 2 - "Are you up to go to [place]...?"
  // 3 - "How about a Discord movie date?"
  let step = 1;

  function showBook() {
    // Add flip animation to the book frame
    bookFrame.classList.add("book-flip");

    // Wait for the flip animation to complete before showing the book view
    bookFrame.addEventListener(
      "animationend",
      () => {
        landing.classList.add("hidden");
        bookView.classList.remove("hidden");
      },
      { once: true },
    );
  }

  function openModal() {
    step = 1;
    nextTimeMessage.classList.add("hidden");
    setQuestionForStep();

    // 🔧 show modal
    inviteModal.classList.remove("hidden");
    inviteModal.classList.add("visible");
  }

  function closeModal() {
    // 🔧 hide modal
    inviteModal.classList.remove("visible");
    inviteModal.classList.add("hidden");
  }

  function flipAndSetStep(next) {
    step = next;
    modalCard.classList.add("flip");
    modalCard.addEventListener(
      "animationend",
      () => {
        modalCard.classList.remove("flip");
        setQuestionForStep();
      },
      { once: true },
    );
  }

  function setQuestionForStep() {
    if (step === 1) {
      questionText.textContent = `Are you free on ${DAY} - ${DATE}?`;
      yesBtn.textContent = "Yes";
      noBtn.textContent = "No";
      noBtn.style.display = "inline-block";
    } else if (step === 2) {
      questionText.textContent = `Are you up to go to ${PLACE} - ${DATE}?`;
      yesBtn.textContent = "Absolutely";
      noBtn.textContent = "I'm Busy :(";
      noBtn.style.display = "inline-block";
    } else if (step === 3) {
      questionText.textContent = "How about a Discord movie date?";
      yesBtn.textContent = "I'm down";
      noBtn.textContent = "I'm really busy";
      noBtn.style.display = "inline-block";
    }
  }

  // book cover click → open book
  bookCover.addEventListener("click", showBook);

  // click invite card → open modal
  inviteCard.addEventListener("click", openModal);

  // close button & clicking backdrop
  modalClose.addEventListener("click", closeModal);
  inviteModal.addEventListener("click", (e) => {
    if (
      e.target === inviteModal ||
      e.target.classList.contains("modal-backdrop")
    ) {
      closeModal();
    }
  });

  // NO button behaviour
  noBtn.addEventListener("click", () => {
    if (step === 1) {
      // first question: straight to "next time"
      closeModal();
      nextTimeMessage.classList.remove("hidden");
    } else if (step === 2) {
      // "I'm Busy :(" -> go to Discord movie question
      flipAndSetStep(3);
    } else if (step === 3) {
      // "I'm really busy" -> next time
      closeModal();
      nextTimeMessage.classList.remove("hidden");
    }
  });

  // YES button behaviour
  yesBtn.addEventListener("click", () => {
    if (step === 1) {
      // Yes I'm free -> ask about going out
      flipAndSetStep(2);
    } else if (step === 2) {
      // Absolutely -> go to invite card page
      closeModal();
      window.location.href = "card.html?type=date";
    } else if (step === 3) {
      // I'm down (Discord movie date) -> go to movie ticket page
      closeModal();
      window.location.href = "card.html?type=movie";
    }
  });
});
