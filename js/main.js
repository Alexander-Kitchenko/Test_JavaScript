



/*All answer options*/

const option1 = document.querySelector(`.option1`),
      option2 = document.querySelector(`.option2`),
      option3 = document.querySelector(`.option3`),
      option4 = document.querySelector(`.option4`);
      
/*All our options*/

const optionElements = document.querySelectorAll(`.option`);

const question = document.getElementById(`question`),
   numberOfQuestion = document.getElementById(`number-of-question`),
   numberOfAllQuestion = document.getElementById(`number-of-all-questions`);

let indexOfQuestion, //индекс текущего вопроса
   indexOfPage = 0; //индекс страниц


const answersTracker = document.getElementById(`answers-tracker`);
const btnNext = document.getElementById(`btn-next`);

let score = 0; //Итоговый результат викторины

const correctAnswer = document.getElementById(`correct-answer`),
   numberOfAllQuestion2 = document.getElementById(`number-of-all-questions-2`),
   btnTryAgain = document.getElementById(`btn-try-again`);


const questions = [
   {
      question: `Как в JavaScript вычислить процент от числа ?`,
      options: [
         `Так в JavaScript нельзя делать`,
         `Оператор : %`,
         `Умножить на кол-во процентов и разделить на 100`,
         `Вызвать метод findPrecent( )`,
      ],
      rightAnswer: 2
   },
   {
      question: `Результат выражения:"13" + 7`,
      options: [
         `20`,
         `137`,
         `undefined`,
         `error`,
      ],
      rightAnswer: 1
   },
   {
      question: `На JavaScript нельзя писать:`,
      options: [
         `Игры`,
         `Скрипты для сайта`,
         `Десктопные предложения`,
         `Плохо`,
      ],
      rightAnswer: 3
   },
   {
      question: `Чем метод отличается от функции`,
      options: [
         `Ничем`,
         `что такое функция ? `,
         `Что такое метод ?`,
         `Метод - это в обьекте`,
      ],
      rightAnswer: 3
   },
   {
      question: `Чему равно такое выражение ? [ ] + false - null + true`,
      options: [
         0,
         `NaN`,
         `undefined`,
         `1`,
      ],
      rightAnswer: 1
   },
      {
         question: `Чему равно  2 && 1 && null && 0 && undefined ?`,
      options: [
         2,
         1,
         `null`,
         `undefined`,
      ],
      rightAnswer: 2
   },
   {
      question: `Чему равно это выражение ? [ ].push(1,2).unshift(3).join()`,
      options: [
         `3,1`,
         `1,2,3`,
         `3,2,1`,
         `В коде ошибка`,
      ],
      rightAnswer: 3
   },
   {
      question: `Чему равно  2 && 1 && null && 0 && undefined ?`,
      options: [
         2,
         1,
         `null`,
         `undefined`,
      ],
      rightAnswer: 2
   },
   {
      question: `Что вывдет alert ? alert(str);
                 var str = "Hello";`,
      options: [
         `Hello`,
         `undefined`,
         `Будет ошибка`,
         `NaN`,
      ],
      rightAnswer: 1
   },
   {
      question: `Чему равна переменная name ? let name = "пупкин".replace("п", "д");`,
      options: [
         `дудкин`,
         `дупкин`,
         `пупкин`,
         `ляпкин-тяпкин`,
      ],
      rightAnswer: 1
   }
];

numberOfAllQuestion.innerHTML = questions.length //Вывводим количество всех вопросов


const load = () => {
   question.innerHTML = questions[indexOfQuestion].question; // сам Вопрос

   option1.innerHTML = questions[indexOfQuestion].options[0];
   option2.innerHTML = questions[indexOfQuestion].options[1];
   option3.innerHTML = questions[indexOfQuestion].options[2];
   option4.innerHTML = questions[indexOfQuestion].options[3];

   numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
   indexOfPage++;  // увеличение индекса страницы
};




let completedAnswers = [];

const randomQuestion = () => {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let hitDuplicate = false;

   if (indexOfPage == questions.length) {
      quizOver();
   } else {
      if (completedAnswers.length > 0) {
         completedAnswers.forEach(item => {
            if (item == randomNumber) {
               hitDuplicate = true;
            }
         });
         if (hitDuplicate) {
            randomQuestion();
         } else {
            indexOfQuestion = randomNumber;
            load();
         }
      };
      if (completedAnswers == 0) {
         indexOfQuestion = randomNumber;
         load();
      }
   };
   completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
   if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
      el.target.classList.add(`correct`);
      updateAnswerTracker(`correct`);
      score++;
   } else {
      el.target.classList.add(`wrong`);
      updateAnswerTracker(`wrong`);
   }
   disabledOptions();
}

const disabledOptions = () => {
   optionElements.forEach(item => {
      item.classList.add(`disabled`);
      if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
         item.classList.add(`correct`);
      }
   })
}

const enableOptions = () => {
   optionElements.forEach(item => {
      item.classList.remove(`disabled`, `correct`, `wrong`);
   })
};


const answerTracker = () => {
   questions.forEach(() => {
      const div = document.createElement(`div`);
      answersTracker.appendChild(div);
   })
}; 

const updateAnswerTracker = status => {
   answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};


const validate = () => {
   if (!optionElements[0].classList.contains(`disabled`)) {
      alert(`Вам нужно выбрать один из вариантов ответа`);
   } else {
      randomQuestion();
      enableOptions();
   }
};


btnNext.addEventListener(`click`, validate);

// optionElements.forEach(option => option.addEventListener(`click`, e => checkAnswer(e)))


for (option of optionElements) {
   option.addEventListener(`click`, e => checkAnswer(e));
}



const quizOver = () => {
   document.querySelector(`.quiz-over-modal`).classList.add(`active`);
   correctAnswer.innerHTML = score;
   numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
   window.location.reload();
};

btnTryAgain.addEventListener(`click`, tryAgain);


window.addEventListener(`load`, () => {
   randomQuestion();
   answerTracker();


})

