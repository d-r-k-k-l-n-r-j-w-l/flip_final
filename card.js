document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("cardImage");
  const label = document.getElementById("cardLabel");
  const downloadBtn = document.getElementById("downloadBtn");

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "date";

  const config = {
    date: {
      label: "your invite!",
      src: "date-invite.png",
      downloadName: "date-invite.png",
    },
    movie: {
      label: "your movie pass!",
      src: "movie-ticket.png",
      downloadName: "movie-ticket.png",
    },
  };

  const chosen = config[type] || config.date;

  label.textContent = chosen.label;
  img.src = chosen.src;
  img.alt = chosen.label;

  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = chosen.src;
    a.download = chosen.downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
