import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  allInput: document.querySelectorAll('input'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    let result = { position, delay };
    setTimeout(() => {
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', startCreate);

function startCreate(e) {
  e.preventDefault();
  let firstdelayValue = Number(refs.allInput[0].value);
  let delayStepValue = Number(refs.allInput[1].value);
  let amountValue = Number(refs.allInput[2].value);

  for (let i = 1; i <= amountValue; i += 1) {
    let position = i;
    createPromise(position, firstdelayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
      firstdelayValue += delayStepValue;
  }
}