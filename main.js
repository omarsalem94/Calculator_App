
const Buttons = document.querySelectorAll('button');

const display = document.querySelector('.display');



Buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    switch(e.target.textContent) {
      case 'AC':
        display.textContent = '';
        break;
      case '=':
        display.textContent = eval(display.textContent);
        break;
      default:
        display.textContent += e.target.textContent;
        break;
    }
  })
})










