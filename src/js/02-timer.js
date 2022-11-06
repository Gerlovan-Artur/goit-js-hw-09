import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let date = new Date();
let selectedTime = '';
let ms = 0;
let timerId = null;

const refs = {
  inputDatetime: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button'),
  values: document.querySelectorAll('.value'),
};

refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= date) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else if (selectedDates[0] > date) {
      refs.startBtn.removeAttribute('disabled');
      selectedTime = dataTime.selectedDates[0].getTime();
    }
  },
};

let dataTime = flatpickr(refs.inputDatetime, options);

refs.startBtn.addEventListener('click', makeTimer);

function makeTimer() {
  timerId = setInterval(() => {
    date = new Date();
    ms = selectedTime - date.getTime();
    refs.inputDatetime.disabled = true;
    refs.startBtn.disabled = true;
    if (ms <= 0) {
      ms = 0;  
      refs.inputDatetime.disabled = false;
      refs.startBtn.disabled = true;
      clearInterval(timerId);
    }
    convertMs(ms);
  });
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  refs.values[0].textContent = `${formatZero(days)}`;
  refs.values[1].textContent = `${formatZero(hours)}`;
  refs.values[2].textContent = `${formatZero(minutes)}`;
  refs.values[3].textContent = `${formatZero(seconds)}`;
  return { days, hours, minutes, seconds };
}

function formatZero(value) {
  return value.toString().padStart(2, '0');
}