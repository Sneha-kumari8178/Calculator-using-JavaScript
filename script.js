// Get references to the display and all buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// Variables to hold the current state of the calculator
let currentInput = '0';
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

// Add event listener to the button container for event delegation
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        handleInput(value);
    });
});

function handleInput(value) {
    if (value >= '0' && value <= '9') {
        appendNumber(value);
    } else if (value === '.') {
        appendDecimal();
    } else if (value === 'ac') {
        clearAll();
    } else if (value === 'del') {
        deleteLastDigit();
    } else if (value === '=') {
        calculate();
    } else { // It's an operator
        setOperator(value);
    }
    updateDisplay();
}

function appendNumber(num) {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    }
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function setOperator(op) {
    if (operator !== null) calculate(); // If an operator already exists, calculate first
    firstOperand = parseFloat(currentInput);
    operator = op;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === null || firstOperand === null) return; // Do nothing if no operator or first operand
    if (operator === '/' && parseFloat(currentInput) === 0) {
        currentInput = "Error";
        updateDisplay();
        // Reset after a short delay
        setTimeout(clearAll, 1500);
        return;
    }

    let result;
    const secondOperand = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    firstOperand = null;
    shouldResetScreen = true;
}

function clearAll() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    shouldResetScreen = false;
}

function deleteLastDigit() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
}

function updateDisplay() {
    // Limit display length to prevent overflow
    if (currentInput.length > 12) {
        display.textContent = currentInput.substring(0, 12) + '...';
    } else {
        display.textContent = currentInput;
    }
}

// Initialize display
updateDisplay();