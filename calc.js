let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '';
let equalsLastPressed = false;

const MAX_DISPLAY = 8;
const display = document.querySelector(".display")

const btnNumbers = document.querySelectorAll("button.number");
btnNumbers.forEach ((btn) => {
    btn.addEventListener('click', () => {
        // When a number is clicked, add it to the display variable and update the display.
        // If the displayValue string is already at maximum size, do nothing.
        equalsLastPressed = false;
        if (displayValue.length < MAX_DISPLAY) {
            updateDisplay(displayValue + btn.value, true);
        }
    });
});


const btnOperators = document.querySelectorAll("button.operator");
btnOperators.forEach ((btn) => {
    btn.addEventListener('click', () => {
        // When an operator is clicked, store the display in firstNumber and store the operator.
        // Clear the displayValue string but do not update the display itself yet, so the
        // user can see what value is being used for firstNumber.
        equalsLastPressed = false;
        firstNumber = displayValue;
        operator = btn.value;
        updateDisplay('', false);
    });
});


const btnEquals = document.querySelector("button.equals");
btnEquals.addEventListener('click', () => {
    // When equals is clicked, store the current display as secondNumber.
    // Operate on the numbers and store the result in firstNumber.
    // Toggle 'equalsLastPressed' to allow repeated presses of equals.
    if (!equalsLastPressed) {
        secondNumber = displayValue;
        firstNumber = updateDisplay(operate(firstNumber, operator, secondNumber), true);
        equalsCacheSecondNumber = secondNumber;
        equalsCacheOperator = operator;
        secondNumber = '';
        operator = '';
    } else {
        firstNumber = updateDisplay(operate(firstNumber, equalsCacheOperator, equalsCacheSecondNumber), true);
    }
    equalsLastPressed = true;
    
    
});


const btnClear = document.querySelector("button.clear");
btnClear.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    updateDisplay('', true);
})


const btnPercent = document.querySelector("button.percent");
btnPercent.addEventListener('click', () => {
    updateDisplay(Math.floor((parseFloat(displayValue) / 100)), true);
})


function updateDisplay(newValue, updateText) {
    // TODO: implement length checking here.
    displayValue = newValue;
    if (updateText == true) {
        display.innerText = (displayValue == '' ? 0 : displayValue);
    }
    return displayValue;
}


function operate(a, op, b) {
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '':
            return a;
        default:
            return a;
    }
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}


function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}


function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}


function divide(a, b) {
    return (b !== 0) ? parseFloat(a) / parseFloat(b) : "DIV 0!";
}