document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
    const searchBox = document.getElementById("search-box");
  
    // Load site-links.html
    fetch("site-links.html")
      .then(r => r.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const cardGrid = doc.querySelector(".card-grid");
  
        if (cardGrid) {
          postsContainer.appendChild(cardGrid);
  
          // Enable search filtering
          searchBox.addEventListener("input", () => {
            const query = searchBox.value.toLowerCase();
            const cards = postsContainer.querySelectorAll(".card");
  
            cards.forEach(card => {
              const text = card.innerText.toLowerCase();
              card.style.display = text.includes(query) ? "" : "none";
            });
          });
        }
      });
  });
  