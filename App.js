// getting all references
let sbtn = document.querySelector(".start-btn");
let ques = document.querySelector(".question");
let nxtbtn = document.querySelector(".nxt-btn");
let ansbtn = document.querySelectorAll(".ansbtn");
let quescontainer = document.querySelector(".question-container");
let container = document.querySelector(".container");
let heading = document.querySelector(".heading");
let anscontainer = document.querySelector(".answer-container");
let display = document.querySelector(".timer");
let res = 0;
let timerInterval;

sbtn.addEventListener("click", startFun);
function startFun() {
  sbtn.hidden = true;
  Instruction();
}
function chooseTopic() {
  anscontainer.hidden = false;
  ques.innerText = "Please select a topic";
  for (let i = 0; i < ansbtn.length; i++) {
    ansbtn[i].hidden = false;
    ansbtn[i].innerText = topics[i];
  }
  ansbtn[0].addEventListener("click", GeneralK);
  ansbtn[1].addEventListener("click", FilmsM);
  ansbtn[2].addEventListener("click", ScienceT);
  ansbtn[3].addEventListener("click", Sports);
}

function allbest() {
  alert("All The Best For your Quiz!!!");
}

function hide() {
  res = 0;
  for (let i = 0; i < ansbtn.length; i++) {
    ansbtn[i].hidden = true;
  }
}
function GeneralK() {
  allbest();

  hide();
  setQuestion(0, gk);
}

function FilmsM() {
  allbest();

  hide();
  setQuestion(0, pop);
}

function ScienceT() {
  allbest();

  hide();
  setQuestion(0, science);
}

function Sports() {
  allbest();

  hide();
  setQuestion(0, sports);
}

function setQuestion(i, arr) {
  nxtbtn.hidden = true;
  if (i >= arr.length) {
    Submit();
  }
  ques.innerText = arr[i].question;
  anscontainer.innerText = "";
  for (let j = 0; j < ansbtn.length; j++) {
    clearInterval(timerInterval);
    startTimer(10, i, arr);
    let btn = document.createElement("button");
    let btntext = document.createTextNode(arr[i].answers[j].text);
    btn.append(btntext);
    anscontainer.append(btn);
    btn.setAttribute("id", questionsarr[j]);
    btn.addEventListener("click", (e) => {
      for (let k = 0; k < 4; k++) {
        if (e.target.innerText == arr[i].answers[k].text) {
          if (arr[i].answers[k].correct) {
            e.target.classList.add("correct");
            setTimeout(() => {
              setQuestion(i + 1, arr);
            }, 700);
            res++;
          } else {
            e.target.classList.add("incorrect");
            for (let j = 0; j < ansbtn.length; j++) {
              if (arr[i].answers[j].correct) {
                anscontainer
                  .querySelector(`#${questionsarr[j]}`)
                  .classList.add("correct");
              }
            }
            setTimeout(() => {
              setQuestion(i + 1, arr);
            }, 700);
          }
        }
      }
    });
  }
}

function Submit() {
  anscontainer.innerText = "";
  display.hidden = true;
  nxtbtn.hidden = true;
  ques.style.fontSize = 200;
  ques.innerText = "You score is : " + res;
  if (res < 4) {
    anscontainer.innerHTML = "<p>" + "You Need To Study More 🤮" + "</p>";
  } else if (res >= 4 && res <= 8) {
    anscontainer.innerHTML = "<p>" + "You Can Do Better 👍" + "</p>";
  } else {
    anscontainer.innerHTML = "<p>" + "Well Done!!!! 🎉" + "</p>";
  }
  let btn = document.createElement("button");
  let btntext = document.createTextNode("Retake Quiz");
  btn.append(btntext);
  anscontainer.append(btn);
  btn.classList.add("retake");
  btn.addEventListener("click", () => {
    location.reload();
    anscontainer.innertext = "";
  });
}

function Instruction() {
  anscontainer.hidden = true;
  ques.innerText = "Instructions!!!!";
  let list = document.createElement("ul");
  let l1 = document.createElement("li");
  l1.appendChild(document.createTextNode("There are a total  10 questions."));

  let l2 = document.createElement("li");
  l2.appendChild(document.createTextNode("Each question carries equal marks."));

  let l3 = document.createElement("li");
  l3.appendChild(
    document.createTextNode("Out of 4 only one option is correct.")
  );

  let l4 = document.createElement("li");
  l4.appendChild(
    document.createTextNode("You will get 10 seconds for each question.")
  );

  list.appendChild(l1);
  list.appendChild(l2);
  list.appendChild(l3);
  list.appendChild(l4);
  container.appendChild(list);
  let btn = document.createElement("button");
  btn.innerText = "Start";
  container.appendChild(btn);
  btn.classList.add("start-btn");
  btn.addEventListener("click", () => {
    list.hidden = true;
    btn.hidden = true;
    chooseTopic();
  });
}

function startTimer(duration, i, arr) {
  let timer = duration;
  let minutes, seconds;
  function updateTimer() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.innerText = "Time Remaining: " + minutes + ":" + seconds;
    timer--;
    if (timer < 5 && timer >= 0) {
      display.classList.add("lesstime");
    } else {
      display.classList.remove("lesstime");
    }
    if (timer < 0) {
      clearInterval(timerInterval);
      if (i + 1 !== arr.length) {
        setQuestion(i + 1, arr);
      } else {
        Submit();
      }
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

//ARRAYS

let topics = ["General Knowledge", "Films & Music", "Science &Tech", "Sports"];

let questionsarr = ["q1", "q2", "q3", "q4"];

let gk = [
  {
    question: "What is the capital city of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Michelangelo", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Fe", correct: false },
      { text: "Pb", correct: false },
    ],
  },
  {
    question: "In which year did World War II end?",
    answers: [
      { text: "1942", correct: false },
      { text: "1945", correct: true },
      { text: "1950", correct: false },
      { text: "1939", correct: false },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "Mount Kilimanjaro", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Mount Fuji", correct: false },
      { text: "Mount McKinley", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Mercury", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "Charles Dickens", correct: false },
    ],
  },
  {
    question: "What is the largest ocean in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "Who invented the light bulb?",
    answers: [
      { text: "Thomas Edison", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Isaac Newton", correct: false },
      { text: "Benjamin Franklin", correct: false },
    ],
  },
  {
    question: "Which country is famous for the Great Barrier Reef?",
    answers: [
      { text: "Australia", correct: true },
      { text: "Brazil", correct: false },
      { text: "Canada", correct: false },
      { text: "China", correct: false },
    ],
  },
];

let pop = [
  {
    question:
      "Who played the character of Iron Man in the Marvel Cinematic Universe?",
    answers: [
      { text: "Robert Downey Jr.", correct: true },
      { text: "Chris Hemsworth", correct: false },
      { text: "Chris Evans", correct: false },
      { text: "Tom Holland", correct: false },
    ],
  },
  {
    question: "Which singer released the hit single 'Shape of You'?",
    answers: [
      { text: "Ed Sheeran", correct: true },
      { text: "Taylor Swift", correct: false },
      { text: "Ariana Grande", correct: false },
      { text: "Bruno Mars", correct: false },
    ],
  },
  {
    question: "Who won the Academy Award for Best Actor in 2020?",
    answers: [
      { text: "Joaquin Phoenix", correct: false },
      { text: "Brad Pitt", correct: false },
      { text: "Leonardo DiCaprio", correct: false },
      { text: "Joaquin Phoenix", correct: true },
    ],
  },
  {
    question: "Which band released the album 'Abbey Road'?",
    answers: [
      { text: "The Beatles", correct: true },
      { text: "The Rolling Stones", correct: false },
      { text: "Led Zeppelin", correct: false },
      { text: "Queen", correct: false },
    ],
  },
  {
    question: "Which TV show features dragons and the Seven Kingdoms?",
    answers: [
      { text: "Breaking Bad", correct: false },
      { text: "The Walking Dead", correct: false },
      { text: "Game of Thrones", correct: true },
      { text: "Stranger Things", correct: false },
    ],
  },
  {
    question: "Who is the author of the 'Harry Potter' book series?",
    answers: [
      { text: "J.K. Rowling", correct: true },
      { text: "Stephen King", correct: false },
      { text: "George R.R. Martin", correct: false },
      { text: "Suzanne Collins", correct: false },
    ],
  },
  {
    question: "Which actor portrayed James Bond in the movie 'Casino Royale'?",
    answers: [
      { text: "Daniel Craig", correct: true },
      { text: "Sean Connery", correct: false },
      { text: "Pierce Brosnan", correct: false },
      { text: "Roger Moore", correct: false },
    ],
  },
  {
    question: "Who played the character of Wolverine in the X-Men film series?",
    answers: [
      { text: "Hugh Jackman", correct: true },
      { text: "Ryan Reynolds", correct: false },
      { text: "Chris Evans", correct: false },
      { text: "Robert Downey Jr.", correct: false },
    ],
  },
  {
    question: "Which band released the hit song 'Bohemian Rhapsody'?",
    answers: [
      { text: "The Beatles", correct: false },
      { text: "Queen", correct: true },
      { text: "Led Zeppelin", correct: false },
      { text: "Pink Floyd", correct: false },
    ],
  },
  {
    question: "Which fictional character lives in a pineapple under the sea?",
    answers: [
      { text: "Mickey Mouse", correct: false },
      { text: "SpongeBob SquarePants", correct: true },
      { text: "Dora the Explorer", correct: false },
      { text: "Minnie Mouse", correct: false },
    ],
  },
];

let science = [
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Mars", correct: false },
      { text: "Earth", correct: false },
    ],
  },
  {
    question: "Who is credited with the invention of the telephone?",
    answers: [
      { text: "Alexander Graham Bell", correct: true },
      { text: "Thomas Edison", correct: false },
      { text: "Nikola Tesla", correct: false },
      { text: "Isaac Newton", correct: false },
    ],
  },
  {
    question: "What is the chemical formula for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false },
      { text: "O2", correct: false },
    ],
  },
  {
    question:
      "What is the process by which plants convert sunlight into energy called?",
    answers: [
      { text: "Photosynthesis", correct: true },
      { text: "Respiration", correct: false },
      { text: "Fermentation", correct: false },
      { text: "Transpiration", correct: false },
    ],
  },
  {
    question: "What is the unit of electric current?",
    answers: [
      { text: "Volt", correct: false },
      { text: "Ampere", correct: true },
      { text: "Ohm", correct: false },
      { text: "Watt", correct: false },
    ],
  },
  {
    question: "Who proposed the theory of general relativity?",
    answers: [
      { text: "Albert Einstein", correct: true },
      { text: "Isaac Newton", correct: false },
      { text: "Stephen Hawking", correct: false },
      { text: "Niels Bohr", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'Fe'?",
    answers: [
      { text: "Iron", correct: true },
      { text: "Silver", correct: false },
      { text: "Fluorine", correct: false },
      { text: "Gold", correct: false },
    ],
  },
  {
    question: "What is the smallest unit of matter?",
    answers: [
      { text: "Atom", correct: true },
      { text: "Molecule", correct: false },
      { text: "Cell", correct: false },
      { text: "Electron", correct: false },
    ],
  },
  {
    question: "Who discovered penicillin?",
    answers: [
      { text: "Alexander Fleming", correct: true },
      { text: "Marie Curie", correct: false },
      { text: "Louis Pasteur", correct: false },
      { text: "Gregor Mendel", correct: false },
    ],
  },
  {
    question: "What is the largest organ in the human body?",
    answers: [
      { text: "Liver", correct: false },
      { text: "Brain", correct: false },
      { text: "Heart", correct: false },
      { text: "Skin", correct: true },
    ],
  },
];

let sports = [
  {
    question: "Which country has won the most FIFA World Cup titles?",
    answers: [
      { text: "Brazil", correct: true },
      { text: "Germany", correct: false },
      { text: "Italy", correct: false },
      { text: "Argentina", correct: false },
    ],
  },
  {
    question:
      "Who holds the record for the most home runs in Major League Baseball?",
    answers: [
      { text: "Barry Bonds", correct: true },
      { text: "Babe Ruth", correct: false },
      { text: "Hank Aaron", correct: false },
      { text: "Alex Rodriguez", correct: false },
    ],
  },
  {
    question: "Which athlete has won the most Olympic gold medals?",
    answers: [
      { text: "Michael Phelps", correct: true },
      { text: "Usain Bolt", correct: false },
      { text: "Serena Williams", correct: false },
      { text: "Simone Biles", correct: false },
    ],
  },
  {
    question: "In which sport can you perform a 'slam dunk'?",
    answers: [
      { text: "Basketball", correct: true },
      { text: "Tennis", correct: false },
      { text: "Golf", correct: false },
      { text: "Swimming", correct: false },
    ],
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    answers: [
      { text: "China", correct: false },
      { text: "Brazil", correct: true },
      { text: "Russia", correct: false },
      { text: "United States", correct: false },
    ],
  },
  {
    question: "Who won the FIFA Women's World Cup in 2019?",
    answers: [
      { text: "United States", correct: true },
      { text: "Germany", correct: false },
      { text: "Brazil", correct: false },
      { text: "Japan", correct: false },
    ],
  },
  {
    question: "Which athlete is known as 'The GOAT' in tennis?",
    answers: [
      { text: "Roger Federer", correct: false },
      { text: "Rafael Nadal", correct: false },
      { text: "Serena Williams", correct: true },
      { text: "Novak Djokovic", correct: false },
    ],
  },
  {
    question:
      "Who holds the record for the most goals scored in FIFA World Cup tournaments?",
    answers: [
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Lionel Messi", correct: false },
      { text: "Marta", correct: false },
      { text: "Miroslav Klose", correct: true },
    ],
  },
  {
    question: "In which sport is the term 'home run' used?",
    answers: [
      { text: "Basketball", correct: false },
      { text: "Baseball", correct: true },
      { text: "Soccer", correct: false },
      { text: "Tennis", correct: false },
    ],
  },
  {
    question: "Which country won the most medals in the 2020 Tokyo Olympics?",
    answers: [
      { text: "United States", correct: true },
      { text: "China", correct: false },
      { text: "Russia", correct: false },
      { text: "Japan", correct: false },
    ],
  },
];
