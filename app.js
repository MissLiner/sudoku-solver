const board = document.getElementById("puzzle");
const solveButton = document.getElementById("solve-button");
const squares = 81;
let submission = [];

for(let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 1);
  inputElement.setAttribute("max", 9);
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
  console.log(submission);
}
const populateVals = (arr) => {
  console.log(arr);
  inputs.forEach((input, i) => {
    input.value = arr.answer[i];
  })

}
const solve = () => {
  joinValues();

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
    .catch(err => console.error(err));
}

solveButton.addEventListener("click", solve);