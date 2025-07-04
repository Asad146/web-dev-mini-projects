document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const nextBtn = document.getElementById("next-btn");
  const questionContainer = document.getElementById("question-container");
  const quizContainer = document.getElementById("quiz-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the Capital of France?",
      choices: ["Paris", "London", "New York", "Islamabad"],
      answer: "Paris",
      marks: 2,
    },
    {
      question: "Which Planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
      marks: 3,
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      marks: 5,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false; // ✅ Prevent multiple scoring

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    answered = false; // ✅ Reset answer flag
    const currentQ = questions[currentQuestionIndex];
    questionText.textContent = currentQ.question;
    choicesList.innerHTML = "";

    currentQ.choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("choice-item");
      li.addEventListener("click", () => selectAnswer(choice, li, currentQ));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice, selectedLi, currentQ) {
    if (answered) return; // ✅ Prevent scoring again
    answered = true;

    const allChoices = document.querySelectorAll("#choices-list li");
    allChoices.forEach((li) => (li.style.pointerEvents = "none"));

    if (choice === currentQ.answer) {
      score += currentQ.marks; // ✅ Add correct marks
      selectedLi.classList.add("correct");
    } else {
      selectedLi.classList.add("wrong");
      allChoices.forEach((li) => {
        if (li.textContent === currentQ.answer) {
          li.classList.add("correct");
        }
      });
    }

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.reduce(
      (sum, q) => sum + q.marks,
      0
    )} points`;
  }
});
