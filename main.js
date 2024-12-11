function add(num1, num2) {
    return num1 + num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function divide(num1, num2) {
    if (num2 == 0) {
        return "Infinity"
    }
    return num1 / num2
}

function equals(operator, num1, num2) {
    
    if (operator == "+") {
        return add(num1, num2)
    } else if (operator == "-") {
        return subtract(num1, num2) 
    } else if (operator == "*") {
        return multiply(num1, num2) 
    } else if (operator == "/") {
        return divide(num1, num2) 
    } else {
        return 'error'
    }
}

let display = ''
let num1 = null
let num2 = null
let operator = ''
let lastBtnPressed = ''

const operatorBtns = document.querySelectorAll('.operators')
const screen = document.querySelector('.screen')
const equal = document.querySelector('.equal')

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        
        if (operator == '') {

            operator = btn.textContent

            //if (num1 == null) {
                //num1 = parseInt(display)
            //} else {
               //num2 = parseInt(display)
            //}
            //display = ''
            
            screen.textContent = display
        } else {
            // execute current operation with equals() //
        } 
        operator = ''       
    })
})

const numberBtns = document.querySelectorAll('.numbers')

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        
        display += btn.id
        screen.textContent += btn.id
        
    })
})

equal.addEventListener('click', () => {
    console.log(num1)
    console.log(num2)
    screen.textContent = equals(operator, num1, num2)
})
