let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateTime() {
  elapsedTime = Date.now() - startTime;
  let ms = elapsedTime % 1000;
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  display.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    interval = setInterval(updateTime, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(interval);
    stopBtn.disabled = true;
    resetBtn.disabled = false;
  }
}

function resetTimer() {
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  clearInterval(interval);
  display.innerHTML = '00:00.000';
  laps = [];
  lapsList.innerHTML = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function recordLap() {
  if (isRunning) {
    laps.push(display.textContent);
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${laps.length}: ${display.textContent}`;
    lapsList.appendChild(lapItem);
  }
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
