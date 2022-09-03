'use strict';

const passwordLengthEl = document.querySelector('.range__value');
const sliderEl = document.querySelector('.selectors__slider');
const progressEl = document.querySelector('.selectors__progress');
const generatedPassEl = document.querySelector('.password__output');
const copyToClipboardBtn = document.querySelector('.password__copy-btn');
const generatePasswordBtn = document.querySelector('.generate');
const copiedTextEl = document.querySelector('.copied__text');
const upperCaseCheckBox = document.getElementById('uppercase-char');
const lowerCaseCheckBox = document.getElementById('lowercase-char');
const numbersCheckBox = document.getElementById('numbers-char');
const symbolsCheckBox = document.getElementById('symbols-char');
const checkBoxGroup = document.querySelectorAll('.check__box-input');

const UPPER_CASE_CHAR = arrayLowToHighNum(65, 90);
const LOWER_CASE_CHAR = arrayLowToHighNum(97, 122);
const NUMBER_CHAR = arrayLowToHighNum(48, 57);
const SYMBOLS_CHAR = arrayLowToHighNum(33, 47).concat(
  arrayLowToHighNum(58, 95)
);

// Display the password character length
const passLengthOutput = function () {
  sliderEl.oninput = function () {
    passwordLengthEl.textContent = this.value;
  };
};

// Clipboard function to copy password text
const copyToClipboard = function () {
  if (generatedPassEl.textContent === 'P4$5W0rD!') return;
  navigator.clipboard.writeText(generatedPassEl.textContent).then(() => {
    copiedTextEl.style.visibility = 'visible';
  });
};

// Loops through characters values table
function arrayLowToHighNum(lowNum, highNum) {
  const charArr = [];
  for (let i = lowNum; i <= highNum; i++) {
    charArr.push(i);
  }
  return charArr;
}

// Generate password
const generatePassword = function () {
  const passLength = sliderEl.value - 1;
  const password = [];
  let charCode = [];

  if (lowerCaseCheckBox.checked) charCode = charCode.concat(LOWER_CASE_CHAR);
  if (upperCaseCheckBox.checked) charCode = charCode.concat(UPPER_CASE_CHAR);
  if (numbersCheckBox.checked) charCode = charCode.concat(NUMBER_CHAR);
  if (symbolsCheckBox.checked) charCode = charCode.concat(SYMBOLS_CHAR);

  if (passLength < 1 || charCode.length === 0) return;

  for (let i = 0; i <= passLength; i++) {
    const randomCharCode =
      charCode[Math.floor(Math.random() * charCode.length)];
    password.push(String.fromCharCode(randomCharCode));
  }

  generatedPassEl.textContent = password.join('');
  generatedPassEl.style.color = 'var(--cl-light-gray-2)';

  // return password;
};

// Displayes password strenght values
function passwordStrength(dataValue, message) {
  const barsDataValue = document.querySelector('.strength__bars-container');
  const strenghtLevel = document.querySelector('.strength__level');

  barsDataValue.setAttribute('data-value', dataValue);
  strenghtLevel.style.visibility = 'visible';
  strenghtLevel.textContent = message;
}

// Tests for password strength
function testPassword(password) {
  let strength = 0;

  if (password === 'P4$5W0rD!') return;

  strength += /[A-Z]+/.test(password) ? 1 : 0;
  strength += /[a-z]+/.test(password) ? 1 : 0;
  strength += /[0-9]+/.test(password) ? 1 : 0;
  strength += /[\W]+/.test(password) ? 1 : 0;

  switch (strength) {
    case 1:
      passwordStrength(1, 'Too weak!');
      break;
    case 2:
      passwordStrength(2, 'Weak');
      break;
    case 3:
      passwordStrength(3, 'Medium');
      break;
    case 4:
      passwordStrength(4, 'Strong');
      break;
    default:
      passwordStrength(0, '');
      break;
  }
}

// Adds different background to range slider
sliderEl.addEventListener('input', function () {
  const value = sliderEl.value;
  passLengthOutput();
  progressEl.style.width = `${value * 5}%`;
});

// Copy to clipboard button
copyToClipboardBtn.addEventListener('click', copyToClipboard);

// Generate password button
generatePasswordBtn.addEventListener('click', function () {
  generatePassword();
  testPassword(generatedPassEl.textContent);
});
