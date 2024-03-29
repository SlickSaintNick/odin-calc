// Initialize variables and constants
let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '';
let signValue = '';
let equalsLastPressed = false;
let keyboardEnabled = true;

const MAX_DISPLAY = 8;
const display = document.querySelector(".display");
const sign = document.querySelector(".sign");
// Select all buttons except the AC button, for use in disabling / enabling input.
const buttonsNotClear = document.querySelectorAll("button:not(.clear)");

// Keyboard support
document.addEventListener('keydown', (event) => handleKeyPress(event));

function handleKeyPress(event) {
    const key = event.key;
    // Number keys
    if (!isNaN(key) && keyboardEnabled) {
        numberPress(key);
    // Other keys...
    } else if ((key === '/' 
             || key === '*' 
             || key === '-' 
             || key === '+') 
             && keyboardEnabled) {
        operatorPress(key);
    } else if (key === 'Enter' && keyboardEnabled) {
        equalsPress();
    } else if (key === '%' && keyboardEnabled) {
        percentPress();
    } else if (key === 'p' && keyboardEnabled) {
        toggleSignPress();
    } else if (key === '.' && keyboardEnabled) {
        decimalPress();
    // Escape is always enabled
    } else if (key === 'Escape') {
        clearPress();
    }
}


const btnNumbers = document.querySelectorAll("button.number");
btnNumbers.forEach ((btn) => btn.addEventListener('click', () => numberPress(btn.value)));

function numberPress(value) {
    // When a number is clicked, add it to the display variable and update display.
    // If last button pressed was equals, first complete the update of the display.
    // If displayValue string is already at maximum size, do nothing.
    if (equalsLastPressed == true) updateDisplay('', true);
    equalsLastPressed = false;
    if (displayValue.replaceAll('-', '').length < MAX_DISPLAY) {
        updateDisplay(displayValue + value, true);
    }
}


const btnOperators = document.querySelectorAll("button.operator");
btnOperators.forEach ((btn) => btn.addEventListener('click', () => operatorPress(btn.value)));

function operatorPress(value) {
    // When an operator is clicked, store the display in firstNumber and store
    // operator.
    // Clear the displayValue string but do not update the display itself yet, so the
    // user can see what value is being used for firstNumber.
    equalsLastPressed = false;
    firstNumber = displayValue;
    operator = value;
    updateDisplay('', false);
}


const btnEquals = document.querySelector("button.equals");
btnEquals.addEventListener('click', () => equalsPress());

function equalsPress() {
    // When equals is clicked, store the current display as secondNumber.
    // Operate on the numbers, update the display and store the result in firstNumber.
    // Toggle 'equalsLastPressed' to allow repeated presses of equals with
    // repeated operation.
    if (!equalsLastPressed) {
        if (firstNumber == '') firstNumber = displayValue;
        secondNumber = displayValue;
        firstNumber = updateDisplay(operate(
            firstNumber, operator, secondNumber), true);
        equalsCacheSecondNumber = secondNumber;
        equalsCacheOperator = operator;
        secondNumber = '';
        operator = '';
    } else {
        firstNumber = updateDisplay(operate(
            firstNumber, equalsCacheOperator, equalsCacheSecondNumber
            ), true);
    }
    equalsLastPressed = true;
}


const btnClear = document.querySelector("button.clear");
btnClear.addEventListener('click', () => clearPress());

function clearPress() {
    // Reset all numbers and clear display. Re-enable keyboard and button input.
    firstNumber = '';
    secondNumber = '';
    operator = '';
    buttonsNotClear.forEach((button) => button.disabled = false);
    equalsLastPressed = false;
    keyboardEnabled = true;
    updateDisplay('', true);
}


const btnPercent = document.querySelector("button.percent");
btnPercent.addEventListener('click', () => percentPress());

function percentPress() {
    // Convert the number from a % to a decimal, i.e. divide by 100 and round to
    // 2 dp.
    equalsLastPressed = false;
    updateDisplay((
        // Divide by 100 with 2dp precision.
        Math.round((parseFloat(displayValue) / 100) * 100) / 100
        ), true);
}


const btnToggleSign = document.querySelector("button.toggle-sign");
btnToggleSign.addEventListener('click', () => toggleSignPress());

function toggleSignPress() {
    // If the display is not 0 or empty, toggle its sign from plus to minus.
    equalsLastPressed = false;
    if (displayValue !== 0 && displayValue !== '') {
        updateDisplay((parseFloat(displayValue) * -1), true);
    }
}


const btnDecimal = document.querySelector("button.decimal");
btnDecimal.addEventListener('click', () => decimalPress());

function decimalPress() {
    // If the display doesn't already include a '.', and isn't too long, 
    // add a decimal point.
    equalsLastPressed = false;
    if (!displayValue.includes(".") && displayValue.length < MAX_DISPLAY - 1) {
        updateDisplay(displayValue + '.', true);
    }
}


function updateDisplay(newValue, updateText) {
    // Convert length value to a string of maximum MAX_LENGTH characters, 
    // incorporating rounding.
    
    // If the number is above the number of digits that can be displayed, or has
    // too many decimal points to be displayed:    
    if ((Math.abs(parseFloat(newValue)) > 10 ** MAX_DISPLAY - 1)
      || Math.abs(parseFloat(newValue)) < 10 ** ((-1 * MAX_DISPLAY) + 2)) {
        // Convert the value to exponential notation.
        newValue = newValue.toExponential(MAX_DISPLAY - 5);
        // Disable all button except AC.
        buttonsNotClear.forEach((button) => button.disabled = true);
        keyboardEnabled = false;
    } else {
        // Deal with rounding.
        // If the number has a decimal point, round it to the maximum number
        // of digits in the display, or the current number of digits, whichever
        // is smaller.
        newValue = '' + newValue;
        const re = /^-?[0-9]+\.[0-9]+$/;
        if (re.test(newValue)) {
            let decimalArray = newValue.split(".");
            let beforeDecimal = decimalArray[0];
            let afterDecimal = decimalArray[1];
            let lenBefore = beforeDecimal.length;
            let lenAfter = afterDecimal.length;
            newValue = parseFloat(newValue).toFixed(
                Math.min(MAX_DISPLAY - lenBefore, lenAfter)
                );
        }
    }
    // Update the display variable
    displayValue = '' + newValue;

    // If required, update the display to reflect the new value.
    if (updateText == true) {
        // Handle negative values, without changing the variable displayValue.
        if (displayValue.startsWith('-')) {
            sign.innerText = "-";
            display.innerText = displayValue.slice(1, );
        } else {
            sign.innerText = "";
            display.innerText = (
                displayValue == '' 
             || displayValue == 'NaN' 
             || displayValue == 'undefined' ? 
                    0 : displayValue);
        }
    }
    return displayValue;
}


function operate(a, op, b) {
    // Call an appropriate function based on the operator.

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
    return (b !== '0') ? parseFloat(a) / parseFloat(b) : "♾";
}