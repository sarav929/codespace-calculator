function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function divide(num1, num2) {
  if (num2 == 0) {
    return "Infinity";
  }
  return num1 / num2;
}

function equals(operator, num1, num2) {
  if (operator == "+") {
    return add(num1, num2);
  } else if (operator == "-") {
    return subtract(num1, num2);
  } else if (operator == "x") {
    return multiply(num1, num2);
  } else if (operator == "÷") {
    return divide(num1, num2);
  } else {
    return "error";
  }
}

let display = "";
let num1 = null;
let num2 = null;
let operator = "";
let operatorSelected = false;

const operatorBtns = document.querySelectorAll(".operators");
const screen = document.querySelector(".screen");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

if (operatorSelected == true) {
  operatorBtns.forEach((btn) => {
    btn.disabled = true;
  });
}

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (operatorSelected == false) {
      operatorSelected = true;
      operator = btn.textContent;
      display += operator;
      screen.textContent = display;
    }
  });
});

const numberBtns = document.querySelectorAll(".numbers");

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    display += btn.id;
    screen.textContent += btn.id;
  });
});

equal.addEventListener("click", () => {
  const result = display.split(/[+\-x÷\s]/);
  num1 = Number(result[0]);
  num2 = Number(result[1]);
  operator = display.match(/[+\-x÷\s]/)[0];

  screen.textContent = equals(operator, num1, num2);
  operatorSelected = false;

  num1 = equals(operator, num1, num2);
  operator = "";
  num2 = null;
  display = num1;
});
