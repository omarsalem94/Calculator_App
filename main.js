
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const container = document.querySelector('.container');

function add(firstNum, secondNum) {
  return parseFloat(firstNum) + parseFloat(secondNum);
}
// console.log(add(1,2));

function subtract(firstNum, secondNum) {
  return parseFloat(firstNum) - parseFloat(secondNum);
}
// console.log(subtract(5,2));

function multiply(firstNum, secondNum) {
  return parseFloat(firstNum) * parseFloat(secondNum);
}
// console.log(multiply(2,2));


function divide(firstNum, secondNum) {
  if (secondNum === '0') return 'no way!'
  return parseFloat(firstNum) / parseFloat(secondNum);
}
// console.log(divide(4,2));


function operate(firstNum, secondNum, operator) {
  switch(operator) {
    case 'add':
      return add(firstNum, secondNum);
      break;
    case 'subtract':
      return subtract(firstNum, secondNum);
      break;
    case 'multiply':
      return multiply(firstNum, secondNum);
      break;
    case 'divide':
      return divide(firstNum, secondNum);
      break;
  }
}

// console.log(operate(1,1,'+'));
// console.log(operate(2,1,'-'));
// console.log(operate(2,2,'*'));
// console.log(operate(4,2,'/'));

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = container.dataset.previousKeyType;
    
    if (!action) {
      if (
      displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent
      }
      container.dataset.previousKeyType = 'number';
    }

    if (
    action === 'add' ||
    action === 'subtract' ||      
    action === 'multiply' ||
    action === 'divide'
    ) {
      
      const firstNum = container.dataset.firstNum;
      const operator =  container.dataset.operator
      const secondNum = displayedNum;
      
      if (firstNum && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const result = operate(firstNum, secondNum, operator);
        display.textContent = result;
        container.dataset.firstNum = result;
      } else {
        container.dataset.firstNum = displayedNum;
      }
      container.dataset.previousKeyType = 'operator';
      container.dataset.operator = action;
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = '0.';
      }
    container.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
      display.textContent = 0;
      container.dataset.firstValue = ''
      container.dataset.modValue = ''
      container.dataset.operator = ''
      container.dataset.previousKeyType = ''
      container.dataset.previousKeyType = 'clear';
    }

    if (action === 'calculate') {
      let firstNum = container.dataset.firstNum;
      const operator =  container.dataset.operator
      let secondNum = displayedNum;

      if (firstNum) {
        if (previousKeyType === 'calculate') {
          firstNum = displayedNum;
          secondNum = container.dataset.modValue;
        }

      display.textContent = operate(firstNum, secondNum, operator);
      }
      container.dataset.modValue = secondNum
      container.dataset.previousKeyType = 'calculate';
    }

    if (action === 'sign') {
      display.textContent = display.textContent * -1;
    }

    if (action === 'percent') {
      display.textContent = display.textContent /100;
    }
  })
})
