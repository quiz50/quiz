// Element references
let question_number_element = document.getElementById("question-number");
let question_txt_element = document.getElementById("question-txt");
let option_1_element = document.getElementById("option1");
let option_2_element = document.getElementById("option2");
let option_3_element = document.getElementById("option3");
let option_4_element = document.getElementById("option4");
let next_button = document.getElementById("next-button");
let time_element = document.getElementById("timer");
let loader = document.querySelector(".loader");
let question_container = document.querySelector(".container");

// Variables
let current_question_number = 0;
let score = 0;
let time;
const total_time = 30;
let sec = total_time;

// Timer function
function timer() {
    time_element.innerHTML = sec;
    sec--;
    if (sec === 0) {
        sec = total_time;
        clearInterval(time);
        checkIfScore();
        current_question_number++;
        showQuestion();
    }
}

// Check if the selected option is correct
function checkIfScore() {
    let optionIdSelected = document.querySelector('input[name=opt]:checked');
    let correctOptionIndex = quizQuestions[current_question_number]?.correctOption.trim().charCodeAt(0) - 65;

    if (optionIdSelected != null && correctOptionIndex !== undefined) {
        let selectedOptionIndex = Array.from(document.querySelectorAll('input[name=opt]')).indexOf(optionIdSelected);
        if (selectedOptionIndex === correctOptionIndex) {
            score++;
        }
    }
}

// Show the current question
function showQuestion() {
    sec = total_time;
    clearInterval(time);
    timer();
    time = setInterval(timer, 1000);

    document.querySelectorAll("input[name=opt]").forEach(option => option.checked = false);

    if (current_question_number >= quizQuestions.length) {
        goToResultPage();
    } else {
        const question = quizQuestions[current_question_number];
        question_number_element.innerHTML = (current_question_number + 1) + ". ";
        question_txt_element.innerHTML = question.question;
        option_1_element.innerHTML = question.options[0];
        option_2_element.innerHTML = question.options[1];
        option_3_element.innerHTML = question.options[2];
        option_4_element.innerHTML = question.options[3];
    }
}

// Handle the next button click
next_button.addEventListener('click', () => {
    checkIfScore();
    current_question_number++;
    if (current_question_number >= quizQuestions.length) {
        goToResultPage();
    } else {
        showQuestion();
    }
});

// Redirect to result page
function goToResultPage() {
    current_question_number = 0;
    localStorage.setItem("score", score);
    location.href = "./resultPage.html";
}

// Fetch quiz data based on the subject parameter
let quizQuestions = [];
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get("subject");
    const URL = `https://script.google.com/macros/s/AKfycbydaQpa0aM0mXw3urWOd1wUVbq0s5jhwWAS58nPZklANGfoMFOqSe5O45UcZUXCZ3TM6g/exec?subject=${encodeURIComponent(subject)}`;
    console.log(URL);

    loader.style.display = 'flex';
    question_container.style.display = 'none';

    try {
        const response = await fetch(URL);
        const data = await response.json();
        
        if (data.error === "Sheet not found") {
            // Redirect to a new page with the message "Will be provided soon"
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

// Initialize data fetch
getData();
