'use strict';

const passLengthEl = document.querySelector('.range__value');
const sliderEl = document.querySelector('.selectors__slider');
const progressEl = document.querySelector('.selectors__progress');

// Display the password character length
const passLengthOutput = function () {
  sliderEl.oninput = function () {
    passLengthEl.textContent = this.value;
  };
};
passLengthOutput();

// Adds different background to range slider
sliderEl.addEventListener('input', function () {
  const value = sliderEl.value;
  progressEl.style.width = `${value * 5}%`;
});
