import '../css/common.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyColor: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.updateBackgroundColor();

    this.intervalId = setInterval(() => {
      this.updateBackgroundColor();

      console.log(getRandomHexColor());
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
  updateBackgroundColor() {
    refs.bodyColor.style.backgroundColor = getRandomHexColor();
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

refs.stopBtn.addEventListener('click', () => {
  timer.stop();
});

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
}
