let question_number_element = document.getElementById("question-number");
let question_txt_element = document.getElementById("question-txt");
let option_1_element = document.getElementById("option1");
let option_2_element = document.getElementById("option2");
let option_3_element = document.getElementById("option3");
let option_4_element = document.getElementById("option4");
let next_button = document.getElementById("next-button");
let back_button = document.getElementById("back-button");
let end_quiz_button = document.getElementById("end-quiz-button");
let total_question_element = document.getElementById('total-questions');
let loader = document.querySelector(".loader");
let question_container = document.querySelector(".container");

let current_question_number = 0;
let score = 0;
let quizQuestions = [];
let optionInputs = document.querySelectorAll("input[name=opt]");
let optionLabels = document.querySelectorAll("label");

// Show the current question
function showQuestion() {
    optionInputs.forEach(opt => {
        opt.checked = false;
        opt.disabled = false;
    });
    optionLabels.forEach(label => {
        label.classList.remove('correct-option', 'wrong-option');
    });

    if (current_question_number >= quizQuestions.length) {
        goToResultPage();
    } else {
        const question = quizQuestions[current_question_number];
        total_question_element.innerHTML = `Question ${current_question_number + 1} of ${quizQuestions.length}`;
        question_number_element.innerHTML = `${current_question_number + 1}. `;
        question_txt_element.innerHTML = question.question;
        option_1_element.innerHTML = question.options[0];
        option_2_element.innerHTML = question.options[1];
        option_3_element.innerHTML = question.options[2];
        option_4_element.innerHTML = question.options[3];
    }
}

// Show feedback immediately when user selects an option
optionInputs.forEach((input, index) => {
    input.addEventListener("change", () => {
        let correctIndex = quizQuestions[current_question_number].correctOption.trim().charCodeAt(0) - 65;

        optionLabels.forEach(label => {
            label.classList.remove("correct-option", "wrong-option");
        });

        optionInputs.forEach(opt => opt.disabled = true);

        if (index === correctIndex) {
            optionLabels[index].classList.add("correct-option");
            score++;
        } else {
            optionLabels[index].classList.add("wrong-option");
            optionLabels[correctIndex].classList.add("correct-option");
        }
    });
});

// Handle navigation buttons
back_button.addEventListener('click', () => {
    if (current_question_number > 0) {
        current_question_number--;
        showQuestion();
    }
});

next_button.addEventListener('click', () => {
    if (current_question_number < quizQuestions.length - 1) {
        current_question_number++;
        showQuestion();
    } else {
        goToResultPage();
    }
});

end_quiz_button.addEventListener('click', () => {
    goToResultPage();
});

function goToResultPage() {
    localStorage.setItem("score", score);
    location.href = "./resultPage.html";
}

// Fetch quiz data
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get("subject");
    const URL = `https://script.google.com/macros/s/AKfycbydaQpa0aM0mXw3urWOd1wUVbq0s5jhwWAS58nPZklANGfoMFOqSe5O45UcZUXCZ3TM6g/exec?subject=${encodeURIComponent(subject)}`;

    loader.style.display = 'flex';
    question_container.style.display = 'none';

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.error === "Sheet not found") {
            location.href = "./comingSoon.html";
        } else {
            quizQuestions = data;
            loader.style.display = 'none';
            question_container.style.display = 'block';
            showQuestion();
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

getData();
