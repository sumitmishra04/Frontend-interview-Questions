import "/style.css";

const addBtn = document.getElementById('addBtn');
const container = document.getElementById('progress-bars');

const TRANSITION_DURATION = 2; // Transition duration in seconds
const TIMEOUT_DELAY = 50; // Small delay to trigger transition

let count = 0;

addBtn.addEventListener('click', () => {
  if (count === 0) {
    createProgressBars();
  }
  count++;
});

const createProgressBars = () => {
  const bar = document.createElement('div');
  bar.classList.add('bar');
  bar.style.transition = `width ${TRANSITION_DURATION}s ease`;
  container.appendChild(bar);

  // Ensure transition occurs after the element is added to the DOM
  setTimeout(() => {
    bar.classList.add('fullWidth');
  }, TIMEOUT_DELAY);

  bar.addEventListener('transitionend', () => {
    if (count > 0) {
      count--;
      createProgressBars();
    }
  }, { once: true });
};

