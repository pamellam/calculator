const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// calculate first and ssecond values dependion on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber,
};

function sendNumbrValue(number) {
  // Replace current display value if the first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if the current display value is 0, replace it, if not add a number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  //  If no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function userOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values and dislay
function resetAll() {
  calculatorDisplay.textContent = '0';
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
}

// Add event listeners for numbers, operators, decimal buttons
inputBtns.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener('click', () => sendNumbrValue(button.value));
  } else if (button.classList.contains('operator')) {
    button.addEventListener('click', () => userOperator(button.value));
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', () => addDecimal());
  }
});

// Event Listener
clearBtn.addEventListener('click', resetAll);
