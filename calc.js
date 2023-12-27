let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '';
let equalsLastPressed = false;


const MAX_DISPLAY = 8;
const display = document.querySelector(".display");
const buttonsNotClear = document.querySelectorAll("button:not(.clear)");

const btnNumbers = document.querySelectorAll("button.number");
btnNumbers.forEach ((btn) => {
    btn.addEventListener('click', () => {
        // When a number is clicked, add it to the display variable and update the display.
        // If the displayValue string is already at maximum size, do nothing.
        if (equalsLastPressed == true) updateDisplay('', true);
        equalsLastPressed = false;
        console.log(typeof displayValue);
        console.log(displayValue);
        if (displayValue.replaceAll('.', '').length < MAX_DISPLAY) {
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
    // Operate on the numbers, update the display and store the result in firstNumber.
    // Toggle 'equalsLastPressed' to allow repeated presses of equals with repeated operation.
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
    // Reset all numbers and clear display
    firstNumber = '';
    secondNumber = '';
    operator = '';
    buttonsNotClear.forEach((button) => button.disabled = false);
    updateDisplay('', true);
})


const btnPercent = document.querySelector("button.percent");
btnPercent.addEventListener('click', () => {
    // Convert the number from a % to a decimal, i.e. divide by 100 and round to
    // 2 dp.
    // TODO: Change this to match the usual function on a calculator like this.
    updateDisplay((Math.round((parseFloat(displayValue) / 100) * 100) / 100), true);
})


const btnDecimal = document.querySelector("button.decimal");
btnDecimal.addEventListener('click', function() {
    // If the display doesn't already include a '.', and isn't too long, add a decimal point.
    if (!displayValue.includes(".") && displayValue.length < MAX_DISPLAY - 1) {
        updateDisplay(displayValue + this.value, true);
    }
})

function updateDisplay(newValue, updateText) {
    // TODO: implement length checking here.
    // Convert length value to a string of maximum MAX_LENGTH characters.
    // Cases to deal with: 100,000,000 or greater.
    // 
    if (parseFloat(newValue) > 10 ** MAX_DISPLAY - 1) {
        newValue = newValue.toExponential(MAX_DISPLAY - 5);
        buttonsNotClear.forEach((button) => button.disabled = true);
    }
    displayValue = '' + newValue;

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