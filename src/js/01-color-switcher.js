function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.stopButton.disabled = true;
let timerId = null;

refs.startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
  }, 1000);
  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;
});

refs.stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
});
