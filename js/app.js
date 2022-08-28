'use strict';

const passLengthEl = document.querySelector('.range__value');
const sliderEl = document.querySelector('.selectors__slider');

// Display the password character length
const passLengthOutput = function () {
  sliderEl.oninput = function () {
    passLengthEl.textContent = this.value;
  };
};
passLengthOutput();

sliderEl.addEventListener('input', function () {
  const value = sliderEl.value;
  const color = `linear-gradient(
        to right,
        var(--cl-neon-green) ${value}%,
        var(--cl-dark-gray-1) ${value}%
      );`;

  sliderEl.style.background = color;
});
