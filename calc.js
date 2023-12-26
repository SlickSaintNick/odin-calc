let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '';

let display = document.querySelector(".display")

let btnNumbers = document.querySelectorAll("button.number");
btnNumbers.forEach ((btn) => {
    btn.addEventListener('click', () => {
        console.log(btn.value);
        displayValue += btn.value;
        updateDisplay();
    });
});

let btnOperators = document.querySelectorAll("button.operator");
btnOperators.forEach ((btn) => {
    btn.addEventListener('click', () => {
        firstNumber = displayValue;
        operator = btn.value;
        displayValue = '';
    });
});

let btnEquals = document.querySelector("button.equals");
btnEquals.addEventListener('click', () => {
    secondNumber = displayValue;
    firstNumber = operate(firstNumber, operator, secondNumber);
    secondNumber = '';
    operator = '';
    displayValue = firstNumber;
    updateDisplay();
});

let btnClear = document.querySelector("button.clear");
btnClear.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    displayValue = '';
    updateDisplay();
})

function updateDisplay() {
    display.innerText = (displayValue == '' ? 0 : displayValue);
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
        default:
            return a;
    }
}

