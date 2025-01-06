// function to round result if decimal places are > 5

function roundResult(result) {
  // check if result is a decimal with more than 5 places
  if (result % 1 !== 0 && result.toString().split(".")[1]?.length > 5) {
    // round to 5 decimal places and return as a number
    return Number(result.toFixed(5));
  }
  // return the result directly if no rounding is needed
  return result;
}

// add

function add(num1, num2) {
  const result = num1 + num2;
  return roundResult(result);
}

// multiply

function multiply(num1, num2) {
  const result = num1 * num2;
  return roundResult(result);
}

// subtract

function subtract(num1, num2) {
  const result = num1 - num2;
  return roundResult(result);
}

// divide

function divide(num1, num2) {
  if (num2 == 0) {
    return "Infinity";
  }
  const result = num1 / num2;
  return roundResult(result);
}

// equals

function equals(operator, num1, num2) {
  if (operator == "+") {
    return add(num1, num2);
  } else if (operator == "-") {
    return subtract(num1, num2);
  } else if (operator == "×") {
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
let canStartWithMinus = true; // New flag to control when minus can be used as a negative sign

const operatorBtns = document.querySelectorAll(".operators");
const screen = document.querySelector(".screen");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const decimal = document.getElementById("decimal");
const numberBtns = document.querySelectorAll(".numbers");

function isOperator(char) {
  return ["+", "-", "×", "÷"].includes(char);
}

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lastChar = display.slice(-1);
    const secondLastChar = display.slice(-2, -1);

    // Check if there's already a complete operation (number operator number)
    const hasCompleteOperation = display.match(
      /(-?\d*\.?\d+)([+\-×÷])(-?\d*\.?\d+)/
    );
    if (hasCompleteOperation) {
      return; // Don't allow more operations
    }

    //if operator selected, don't allow another
    if (operatorSelected && btn.id !== "minus") {
      return;
    }

    if (btn.id === "minus") {
      // Case 1: Starting with minus (negative number)
      if (display === "" || display === "-") {  // Added check for "-"
        if (display === "") {  // Only add minus if display is empty
          display += "-";
          screen.textContent = display;
        }
        return;
      }
      // Case 2: Minus after other operators (for negative numbers)
      if (isOperator(lastChar) && !isOperator(secondLastChar)) {  // Removed !operatorSelected check
        display += "-";
        screen.textContent = display;
        return;
      }
      // Case 3: Double minus for subtraction
      if (lastChar === "-" && !isOperator(secondLastChar) && display !== "-") {  // Removed !operatorSelected check
        display += "-";
        screen.textContent = display;
        return;
      }
    }

    // Normal operator handling (including minus as a regular operator)
    if (display !== "" && display !== "-" && !isOperator(lastChar)) {
      operatorSelected = true;
      operator = btn.textContent;
      display += operator;
      screen.textContent = display;
      canStartWithMinus = true;
    }

    if (isDecimal) {
      isDecimal = false;
      decimal.disabled = false;
    }
  });
});

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    display += btn.id;
    screen.textContent = display;
    canStartWithMinus = false; // Disable minus as negative sign after a number
  });
});

// NEW EQUAL FUNCTION: handling negative numbers //

equal.addEventListener("click", () => {
  // extract num1, operator and num2 from string
  const operationStr = display.match(/(-?\d*\.?\d+)([+\-×÷])(-?\d*\.?\d+)/);

  if (!operationStr) return;

  num1 = Number(operationStr[1]); // num1 (including negative)
  operator = operationStr[2]; // operator
  num2 = Number(operationStr[3]); // num2 (including negative)

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
  canStartWithMinus = true;
});

// OLD EQUAL FUNCTION - not handling negative numbers //

//equal.addEventListener("click", () => {
//const result = display.split(/[+\-×÷\s]/);
//num1 = Number(result[0]);
//num2 = Number(result[1]);
//operator = display.match(/[+\-×÷\s]/)[0];

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
  canStartWithMinus = true;
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
      display[display.length - 1] == "×" ||
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
