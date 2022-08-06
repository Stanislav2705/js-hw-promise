import Notiflix, { Notify } from 'notiflix';

const formPromise = document.querySelector('.form');
const delayField = document.querySelector('[name="delay"]');
const stepField = document.querySelector('[name="step"]');
const amountField = document.querySelector('[name="amount"]');

formPromise.addEventListener('submit', onSubmit);

let isActive = false;

function onSubmit(e) {
  e.preventDefault();

  if (isActive) {
    return;
  }

  let delay = Number(delayField.value);
  let step = Number(stepField.value);
  let amount = Number(amountField.value);

  isActive = true;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }

  setTimeout(() => {
    isActive = false;
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
