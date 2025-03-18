document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search");
    const topics = document.querySelectorAll(".topic");

    searchBox.addEventListener("input", () => {
        const searchText = searchBox.value.toLowerCase();
        topics.forEach(topic => {
            const topicText = topic.textContent.toLowerCase();
            topic.style.display = topicText.includes(searchText) ? "block" : "none";
        });
    });

    // Confetti effect
    function createConfetti() {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        setTimeout(() => confetti.remove(), 5000);
    }

    setInterval(createConfetti, 500);
});
