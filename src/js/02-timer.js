import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// 1) Потрібно задати дедлайн
// 2) Потрібно задати поточну дату
// 3) Потрібно знайти їч різницю
// 4) Різницю крнвертувати в нормальний формат длякористувача
// 5) Відобразити це все на екрані
const flatPikerElemet = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const buttonElement = document.querySelector('[data-start]');

let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerId = selectedDates[0];
    if (selectedDates[0] > new Date()) {
      onStartBtnClick();
    } else if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    console.log(selectedDates[0]);
  },
};

buttonElement.addEventListener('click', start);

function start() {
  buttonElement.setAttribute('disabled', 'true');
  const interval = setInterval(() => {
    if (new Date() > timerId) {
      clearInterval(interval);
      return;
    }
    const delta = timerId - new Date();
    convertMs(delta);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const flatPiker = flatpickr(flatPikerElemet, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;

  return { days, hours, minutes, seconds };
}

function onStartBtnClick() {
  buttonElement.removeAttribute('disabled');
}
