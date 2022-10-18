const board = document.getElementById("puzzle");
const solveButton = document.getElementById("solve-button");
const clearButton = document.getElementById("clear-button");
const squares = 81;
let submission = [];

for(let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 1);
  inputElement.setAttribute("max", 9);
  if(((i%9 === 0 || i%9 === 1 || i%9 === 2 ) && i < 21) ||
     ((i%9 === 6 || i%9 === 7 || i%9 === 8 ) && i < 27) ||
     ((i%9 === 3 || i%9 === 4 || i%9 === 5 ) && i > 27 && i < 53) ||
     ((i%9 === 0 || i%9 === 1 || i%9 === 2 ) && i > 53) ||
     ((i%9 === 6 || i%9 === 7 || i%9 === 8 ) && i > 53)) {
    inputElement.classList.add("grey");
  } 

  board.appendChild(inputElement);
}
const inputs = document.querySelectorAll("input");

const joinValues = () => {
  submission = [];
  inputs.forEach(input => {
    if(input.value) {
      submission.push(parseInt(input.value));
    } else {
      submission.push(0);
    }
  })
}
const populateVals = (arr) => {
  inputs.forEach((input, i) => {
    input.value = arr.answer[i];
  })

}
const changeTextColor = () => {
  inputs.forEach(input => {
    if(input.value) {
      input.classList.add("highlight-text");
    }
  })
}
const handleError = (err) => {
  alert("No possible solution - " + err);
}
const solve = () => {
  joinValues();
  changeTextColor();

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '8e8cd9e0b5msh8013e732caa4f9bp19fb4djsn8c14c3d63a1e',
      'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
    },
    body: JSON.stringify({"input": submission})
  };

  fetch('https://sudoku-solver3.p.rapidapi.com/sudokusolver/', options)
    .then(response => response.json())
    .then(response => populateVals(response))
    .catch(err => handleError(err));
}

const clear = () => {
  inputs.forEach(input => {
    input.value = "";
    input.classList.remove("highlight-text");
  })
}

solveButton.addEventListener("click", solve);
clearButton.addEventListener("click", clear);