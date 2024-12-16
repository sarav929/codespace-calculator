function add(num1, num2) {
  return (num1 + num2).toFixed(5);
}

function multiply(num1, num2) {
  return (num1 * num2).toFixed(5);
}

function subtract(num1, num2) {
  return (num1 - num2).toFixed(5);
}

function divide(num1, num2) {
  if (num2 == 0) {
    return "Infinity";
  }
  return (num1 / num2).toFixed(5);
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
let isDecimal = false;

const operatorBtns = document.querySelectorAll(".operators");
const screen = document.querySelector(".screen");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const decimal = document.getElementById("decimal");
const numberBtns = document.querySelectorAll(".numbers");

if (operatorSelected == true) {
  operatorBtns.forEach((btn) => {
    btn.disabled = true;
  });
}

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (display !== "") {
      if (operatorSelected == false) {
        operatorSelected = true;
        operator = btn.textContent;
        display += operator;
        screen.textContent = display;
      }
      if (isDecimal == true) {
        isDecimal = false;
        decimal.disabled = false;
      }
    }
  });
});

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    display += btn.id;
    screen.textContent += btn.id;
  });
});

// NEW EQUAL FUNCTION: handling negative numbers //

equal.addEventListener("click", () => {

    // extract num1, operator and num2 from string
    const operationStr = display.match(/(-?\d*\.?\d+)([+\-x÷])(-?\d*\.?\d+)/);
    
    num1 = Number(operationStr[1]);  // num1 (including negative)
    operator = operationStr[2];      // operator
    num2 = Number(operationStr[3]);  // num2 (including negative)

    // calculate
    const result = equals(operator, num1, num2);

    // display the result
    screen.textContent = result;
    display = result.toString();

    // reset variables and set result as num1 for next operation
    operatorSelected = false;
    num1 = result;
    num2 = null;
    operator = "";
    isDecimal = false;

});


// OLD EQUAL FUNCTION - not handling negative numbers //

//equal.addEventListener("click", () => {
  //const result = display.split(/[+\-x÷\s]/);
  //num1 = Number(result[0]);
  //num2 = Number(result[1]);
  //operator = display.match(/[+\-x÷\s]/)[0];

  //screen.textContent = equals(operator, num1, num2);
  //operatorSelected = false;

  //num1 = equals(operator, num1, num2);
  //operator = "";
  //num2 = null;
  //display = num1;
  //isDecimal = false;
//});

clear.addEventListener("click", () => {
  num1 = null;
  num2 = null;
  operator = "";
  display = "";
  screen.textContent = display;
  operatorSelected = false;
  isDecimal = false;
});

decimal.addEventListener("click", () => {
  //press once - disabled
  //press operator - enabled
  if (isDecimal == false) {
    isDecimal = true;

    if (
      display == "" ||
      display[display.length - 1] == "+" ||
      display[display.length - 1] == "-" ||
      display[display.length - 1] == "x" ||
      display[display.length - 1] == "÷"
    ) {
      screen.textContent += "0.";
      display += "0.";
    } else {
      screen.textContent += ".";
      display += ".";
    }
  }
});
