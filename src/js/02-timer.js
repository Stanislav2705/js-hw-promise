import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// 1) Потрібно задати дедлайн
// 2) Потрібно задати поточну дату
// 3) Потрібно знайти їч різницю
// 4) Різницю крнвертувати в нормальний формат длякористувача
// 5) Відобразити це все на екрані

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let timerId = null;
    if (selectedDates[0] > new Date()) {
      onStartBtnClick();
    } else if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    buttonElement.addEventListener('click', () => {
      const result = selectedDates[0] - new Date();
      timerId = setInterval(convertMs(result), 1000);
    });
    console.log(selectedDates[0]);
  },
};

function pad(value) {
  return String(value).padStart(2, '0');
}

const flatPikerElemet = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const buttonElement = document.querySelector('[data-start]');

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
