let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (running) {
        clearInterval(timer);
        running = false;
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        if (elapsedTime === 0) {
            startTime = Date.now();
        } else {
            startTime = Date.now() - elapsedTime;
        }
        timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds
        running = true;
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;
    }
}

function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    lapCount = 1;
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapsContainer.innerHTML = '';
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;

    const milliseconds = Math.floor(elapsedTime % 1000).toString().padStart(3, '0');
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
}

function lap() {
    const lapTime = elapsedTime;
    const milliseconds = Math.floor(lapTime % 1000).toString().padStart(3, '0');
    const seconds = Math.floor(lapTime / 1000) % 60;
    const minutes = Math.floor(lapTime / (1000 * 60)) % 60;
    const hours = Math.floor(lapTime / (1000 * 60 * 60));

    const lapItem = document.createElement('div');
    lapItem.classList.add('lap-item');
    lapItem.textContent = `Lap ${lapCount}: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
    lapsContainer.prepend(lapItem);

    lapCount++;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
