export function debounce(mainFunc, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunc(...args);
    }, delay);
  };
}
