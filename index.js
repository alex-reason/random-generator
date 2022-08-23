// // // // // // // // // // // // // // // // // // // // // // // //
// // MENU BUTTONS and CONTENT
const contentNames = ['where-eat', 'yes-no', 'generate-own'];
const inputButtonRight = document.querySelector('#input-button-right');
const rightDiv = document.querySelector('.content__container-right');

const textChosenOne = document.querySelector('#chosen-one');
const currentChoices = [];
const choiceBox = document.querySelector('#choice-box');

// reset button
const resetButton = document.querySelector('#reset-button');

// add event listeners to all buttons in menu
for (const contents of contentNames) {
    document.querySelector(`#${contents}-button`).addEventListener('click', () => {
        changeContent(contents)
    })
};

const resetChoices = () => {
    choiceBox.innerHTML = '';
    currentChoices.splice(0, currentChoices.length);
    textChosenOne.innerText = '';
    document.querySelector('#generate-own-content h3').innerText = '';
    inputButtonLeft.classList.remove('input-button-hidden'); //changed
}

resetButton.addEventListener('click', () => { resetChoices() });

const changeContent = (content) => {
    // textChosenOne.innerText = '';
    resetChoices();
    const inActives = contentNames.filter(x => x !== content);
    for (const inactive of inActives) {
        document.querySelector(`#${inactive}-content`).classList.add('content-hidden');
        document.querySelector(`#${inactive}-button`).classList.add('menu__text-inactive');
        document.querySelector(`#${inactive}-button`).classList.remove('menu__text-active');
    };
    document.querySelector(`#${content}-content`).classList.remove('content-hidden');
    document.querySelector(`#${content}-button`).classList.remove('menu__text-inactive');
    document.querySelector(`#${content}-button`).classList.add('menu__text-active');
    // for yes and no, current choices are by default yes and no
    if (content === 'yes-no') {
        inputButtonRight.classList.add('input-button-hidden'); 
        rightDiv.classList.add('content__container-right-inactive');
        currentChoices.push('Yes', 'No');
        // choiceBox.innerHTML = '';
        document.querySelector('.content__container-right h4').innerText = 'Yes / No'; 
        // remove reset button since no choices to reset
        resetButton.classList.add('content-hidden');
    } else {
        resetButton.classList.remove('content-hidden');
        rightDiv.classList.remove('content__container-right-inactive');
        document.querySelector('.content__container-right h4').innerText = 'Choices';
        inputButtonRight.classList.remove('input-button-hidden'); 
        // resetChoices();
    }
};

// // // // // // // // // // // // // // // // // // // // // // // //
// // INPUT AND ADD BUTTON
// content left div
const addChoice = document.querySelector('#add-choice');
const inputChoice = document.querySelector('#input-choice');

// add listener when add choice button is clicked, texts are added in div and also in current choices array
addChoice.addEventListener('click', () => {
    if (inputChoice.value) {
        currentChoices.push(inputChoice.value);
        const newListItem = document.createElement('div');
        newListItem.classList.add('content__picks-item');
        newListItem.innerHTML = `<p>${inputChoice.value}</p>`;
        choiceBox.appendChild(newListItem);
        inputChoice.value = '';
    }
});
// // // // // // // // // // // // // // // // // // // // // // // //
// FOR GENERATE OWN, ADD FUNCTION TO CREATE OWN QUESTION
// content right div
const parentDivLeft = document.querySelector('.content__container-left'); //changed
const questionButton = document.querySelector('#generate-question-btn');
const inputButtonLeft = document.querySelector('#input-button-left'); //changed
const generatedQuestion = document.querySelector('#generated-question');

questionButton.addEventListener('click', () => {
    if (generatedQuestion.value){
        inputButtonLeft.classList.add('input-button-hidden'); //changed
        document.querySelector('#generate-own-content h3').innerText = generatedQuestion.value;
        generatedQuestion.value = '';
    }
});

// // // // // // // // // // // // // // // // // // // // // // // //
// RANDOM CHOICE
const chooseButton = document.querySelector('#choose-button');

chooseButton.addEventListener('click', () => {
    if (currentChoices.length > 0) {
        textChosenOne.innerText = `${chooseRandom(currentChoices)}`;
    } 
    choiceBox.innerHTML = '';
})

const chooseRandom = (array) => {
    let randomInt = Math.floor(Math.random() * array.length);
    return array[randomInt];
}

// // // // // // // // // // // // // // // // // // // // // // // //
// // enter button triggers click for button (for input)
generatedQuestion.addEventListener('keypress', function (event) {inputEnter(event,questionButton)});
inputChoice.addEventListener('keypress', function (event) {inputEnter(event,addChoice)});

function inputEnter(event,btn) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
}