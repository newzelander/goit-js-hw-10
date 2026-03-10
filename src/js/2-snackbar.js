import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = form.elements['delay'];
  const stateInput = form.elements['state'];
  const delay = Number(delayInput.value);
  const state = form.querySelector('input[name="state"]:checked').value;

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }

  createPromise(delay, state)
    .then(resolvedDelay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${resolvedDelay}ms`,
        position: 'topRight',
      });
      console.log(`✅ Fulfilled promise in ${resolvedDelay}ms`);
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${rejectedDelay}ms`,
        position: 'topRight',
      });
      console.log(`❌ Rejected promise in ${rejectedDelay}ms`);
    });

  form.reset();
});
