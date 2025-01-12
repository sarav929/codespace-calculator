// function to round result if decimal places are > 5

function roundResult(result) {
  // check if result is a decimal with more than 5 places
  if (result % 1 !== 0 && result.toString().split('.')[1]?.length > 5) {
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
    return 'Infinity';
  }
  const result = num1 / num2;
  return roundResult(result);
}

// equals

function equals(operator, num1, num2) {
  if (operator == '+') {
    return add(num1, num2);
  } else if (operator == '-') {
    return subtract(num1, num2);
  } else if (operator == '×') {
    return multiply(num1, num2);
  } else if (operator == '÷') {
    return divide(num1, num2);
  } else {
    return 'error';
  }
}

let display = '';
let num1 = null;
let num2 = null;
let operator = '';
let operatorSelected = false;
let isDecimal = false;
let canStartWithMinus = true; // New flag to control when minus can be used as a negative sign
let waitingForSecondNumber = false;


const operatorBtns = document.querySelectorAll('.operators');
const screen = document.querySelector('.screen');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const decimal = document.getElementById('decimal');
const numberBtns = document.querySelectorAll('.numbers');

function isOperator(char) {
  return ['+', '-', '×', '÷'].includes(char);
}

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const lastChar = display.slice(-1);
    const secondLastChar = display.slice(-2, -1);

    // Handle minus sign for negative numbers
    if (btn.id === 'minus') {
      // Case 1: Starting with minus (negative number)
      if (display === '' || display === '-') {
        if (display === '') {
          display += '-';
          screen.textContent = display;
        }
        return;
      }
      // Case 2: Minus after other operators (for negative numbers)
      if (isOperator(lastChar) && !isOperator(secondLastChar)) {
        display += '-';
        screen.textContent = display;
        return;
      }
      // Case 3: Double minus for subtraction
      if (lastChar === '-' && !isOperator(secondLastChar) && display !== '-') {
        display += '-';
        screen.textContent = display;
        return;
      }
    }

    // If we're waiting for a second number and have one, evaluate the expression
    if (waitingForSecondNumber && !isOperator(lastChar)) {
      const numbers = display.split(/[+\-×÷]/);
      num1 = Number(numbers[0]);
      num2 = Number(numbers[1]);
      
      const result = equals(operator, num1, num2);
      display = result.toString();
      num1 = result;
    }

    // Add the new operator if we have a number
    if (display !== '' && display !== '-' && !isOperator(lastChar)) {
      operator = btn.textContent;
      display += operator;
      waitingForSecondNumber = true;
    }

    screen.textContent = display;

    if (isDecimal) {
      isDecimal = false;
      decimal.disabled = false;
    }
  });
});

numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // If display is just '0' and we're typing another number, replace the 0
    if (display === '0' && btn.id !== '.') {
      display = btn.id;
    }
    // If we have an operator, check if the current number being typed starts with 0
    else if (isOperator(display.slice(-2, -1))) {
      if (display.slice(-1) === '0' && btn.id !== '.') {
        // Remove the leading 0 and add the new number
        display = display.slice(0, -1) + btn.id;
      } else {
        display += btn.id;
      }
    } 
    // Normal case: just add the number
    else {
      display += btn.id;
    }
    
    screen.textContent = display;
    canStartWithMinus = false;
  });
});

// Update equals handler
equal.addEventListener('click', () => {
  if (!display || isOperator(display.slice(-1))) return;

  const numbers = display.split(/[+\-×÷]/);
  if (numbers.length < 2) return;

  num1 = Number(numbers[0]);
  num2 = Number(numbers[1]);
  
  const result = equals(operator, num1, num2);
  screen.textContent = result;
  display = result.toString();
  waitingForSecondNumber = false;
  num1 = result;
  num2 = null;
  operator = '';
  isDecimal = false;
});

clear.addEventListener('click', () => {
  num1 = null;
  num2 = null;
  operator = '';
  display = '';
  screen.textContent = display;
  operatorSelected = false;
  isDecimal = false;
  canStartWithMinus = true;
  waitingForSecondNumber = false;
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

decimal.addEventListener('click', () => {
  //press once - disabled
  //press operator - enabled
  if (isDecimal == false) {
    isDecimal = true;

    if (
      display == '' ||
      display[display.length - 1] == '+' ||
      display[display.length - 1] == '-' ||
      display[display.length - 1] == '×' ||
      display[display.length - 1] == '÷'
    ) {
      screen.textContent += '0.';
      display += '0.';
    } else {
      screen.textContent += '.';
      display += '.';
    }
  }
});
