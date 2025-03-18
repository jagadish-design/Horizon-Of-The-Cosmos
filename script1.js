document.addEventListener("DOMContentLoaded", function () {
    let text = document.querySelector("h1");
    text.style.opacity = "0";

    setTimeout(() => {
        text.style.transition = "opacity 2s ease-in-out";
        text.style.opacity = "1";
    }, 500);
});
