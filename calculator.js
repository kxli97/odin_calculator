console.log('calculator.js loaded');

function add(a,b){
    return a+b;
};

function subsctract(a,b) {
    return a-b;
};

function multiply(a,b){
    return a*b;
};

function divide(a,b){
    if (b == 0){ 
        throw new Error('division by 0 error!');
    } else {
        return a/b;
    };
};

function operate(a,b,operator){
    a = Number(a);
    b = Number(b);
    if (operator == '+') {return add(a,b)};
    if (operator == '-') {return subsctract(a,b)};
    if (operator == '*') {return multiply(a,b)};
    if (operator == '/') {return divide(a,b)};
}

function equalEval(displayList) {
    if (displayList.length <= 1) {
        return displayList;
    } else if (displayList.length == 2) {
        return displayList[0];
    } else {
        console.log('Showing whats being calculated: ' + String(operationList[0]) + operationList[1]+ String(operationList[2])  )
        let tmpResult = operate(operationList[0], operationList[2], operationList[1]);
        return [tmpResult];
    }
};

const var1 = 0;
const var2 = 0;
const operator = '+';

const displayScreen = document.querySelector('#display');

// nedd to select all because they're many buttons in this class
// when selecting all, it will return a list of button objects
const onDisplayButtons = document.querySelectorAll('.on-display-button');
console.log(onDisplayButtons);


let displayText = '';
let operationList = [];
let lastButtonType = ''

onDisplayButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        console.log('button clicked');

        let buttonText = button.textContent;
        console.log(buttonText);

        let buttonType = '';
        if (button.classList.contains('number-button')) {
            buttonType = 'number';
        } else {
            buttonType = 'operator';
        }


        if ((lastButtonType == '' || lastButtonType == 'operator') && buttonType == 'operator'){
            // do nothing

        } else if (buttonType == 'operator' && buttonText == '='){
            console.log('calculating...');
            operationList = equalEval(operationList);
            lastButtonType = 'number';

        } else if (lastButtonType == 'number' && buttonType == 'number') {
            console.log('2 numbers in a row');
            let lastElement = operationList[operationList.length-1];
            operationList.pop()
            operationList.push(Number(String(lastElement) + String(buttonText)));
            lastButtonType = buttonType;

        } else if (lastButtonType == 'number' && buttonType == 'operator' && operationList.length == 3) {
            console.log('already have enough number to calculate before piling');
            operationList = equalEval(operationList);
            operationList.push(buttonText);
            lastButtonType = buttonType;

        } else {
            console.log('very normal');
            operationList.push(buttonText);
            lastButtonType = buttonType;

        }

        console.log(operationList);
        displayText = operationList.join(' ');
        console.log(displayText);

        console.log(displayText);
        displayScreen.textContent = displayText;
        console.log('logging buttonType to be lastButtonType: ' + buttonType);
        

    });
})

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', () => {
    displayText = 'Cleared!';
    operationList = [];
    lastButtonType = '';
    displayScreen.textContent = displayText;
})