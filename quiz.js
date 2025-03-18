document.addEventListener("DOMContentLoaded", function () {
    const enrollBtn = document.getElementById("enroll-btn");
    const quizSection = document.getElementById("quiz-section");
    const enrollmentForm = document.getElementById("enrollment-form");
    const quizForm = document.getElementById("quiz-form");
    const submitBtn = document.getElementById("submit-btn");
    const countdownEl = document.getElementById("countdown");
    const participantsTable = document.querySelector("#participants-table tbody");
    let timer;
    let timeLeft = 420; // 7 minutes in seconds
    let userName = "";
    let userSex = "";
    let userAge = "";

    // Questions Array
    const questions = [
        { question: "What is the closest star to Earth?", options: ["Sirius", "Alpha Centauri", "Proxima Centauri", "Betelgeuse"], answer: 2 },
        { question: "Which planet has the largest moon?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], answer: 2 },
        { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "500,000 km/s"], answer: 0 },
        { question: "Which gas is most abundant in the Sun?", options: ["Oxygen", "Hydrogen", "Carbon", "Helium"], answer: 1 }
    ];

    // Load Questions
    function loadQuestions() {
        const list = document.getElementById("questions-list");
        questions.forEach((q, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<p>${q.question}</p>`;
            q.options.forEach((option, optIndex) => {
                li.innerHTML += `<label><input type="radio" name="q${index}" value="${optIndex}"> ${option}</label><br>`;
            });
            list.appendChild(li);
        });
    }

    // Timer Function
    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up! You are blocked for today.");
                localStorage.setItem(userName, "blocked");
                location.reload();
            } else {
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                countdownEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }

    // Enrollment
    enrollBtn.addEventListener("click", function () {
        let name = document.getElementById("name").value;
        let sex = document.getElementById("sex").value;
        let age = parseInt(document.getElementById("age").value);

        if (name && age >= 14) {
            if (localStorage.getItem(name) === "blocked") {
                alert("You are blocked for today.");
                return;
            }

            userName = name;
            userSex = sex;
            userAge = age;

            enrollmentForm.style.display = "none";
            quizSection.style.display = "block";
            loadQuestions();
            startTimer();
        } else {
            alert("You must be 14 or older to participate.");
        }
    });

    // Ensure all questions are answered
    quizForm.addEventListener("change", function () {
        let allAnswered = true;
        questions.forEach((q, index) => {
            let radios = document.getElementsByName(`q${index}`);
            let answered = Array.from(radios).some(r => r.checked);
            if (!answered) allAnswered = false;
        });

        submitBtn.disabled = !allAnswered;
    });

    // Submit Quiz
    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearInterval(timer);

        let score = 0;
        questions.forEach((q, index) => {
            let selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected && parseInt(selected.value) === q.answer) {
                score++;
            }
        });

        alert(`You scored: ${score}/${questions.length}`);

        // Save participant details in localStorage
        let participants = JSON.parse(localStorage.getItem("participants")) || [];
        participants.push({ name: userName, sex: userSex, age: userAge, score: score });
        localStorage.setItem("participants", JSON.stringify(participants));
    });

    // Admin Login
    document.getElementById("admin-login-btn").addEventListener("click", function () {
        let adminName = document.getElementById("admin-name").value;
        let adminPass = document.getElementById("admin-pass").value;

        if (adminName === "Jagadish123" && adminPass === "31032010j") {
            document.getElementById("admin-dashboard").style.display = "block";
            document.getElementById("admin-login").style.display = "none";
            loadParticipants();
        } else {
            alert("Incorrect credentials!");
        }
    });

    // Load Participants in Admin Panel
    function loadParticipants() {
        let participants = JSON.parse(localStorage.getItem("participants")) || [];
        document.getElementById("total-participants").textContent = participants.length;
        participantsTable.innerHTML = ""; // Clear previous data

        participants.forEach((p, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${p.name}</td>
                <td>${p.sex}</td>
                <td>${p.age}</td>
                <td>${p.score}</td>
                <td><button class="delete-btn" data-index="${index}">❌ Delete</button></td>
            `;
            participantsTable.appendChild(row);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                deleteParticipant(index);
            });
        });
    }

    // Delete Participant
    function deleteParticipant(index) {
        let participants = JSON.parse(localStorage.getItem("participants")) || [];
        if (confirm(`Are you sure you want to delete ${participants[index].name}?`)) {
            participants.splice(index, 1);
            localStorage.setItem("participants", JSON.stringify(participants));
            loadParticipants();
        }
    }
});
