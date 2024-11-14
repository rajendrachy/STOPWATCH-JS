let isRunning = false, [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0], timerInterval;
const $ = id => document.getElementById(id);
const format = n => String(n).padStart(2, '0');
const updateDisplay = () => $('timeDisplay').textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;

const startTimer = () => timerInterval = setInterval(() => {
    milliseconds = (milliseconds + 1) % 100;
    if (!milliseconds) seconds = (seconds + 1) % 60 || !(minutes = (minutes + 1) % 60) && hours++;
    updateDisplay();
}, 10);

const toggleTimer = () => {
    isRunning ? clearInterval(timerInterval) : startTimer();
    $('startStopButton').textContent = isRunning ? 'Start' : 'Stop';
    $('startStopButton').classList.toggle('stop', !isRunning);
    $('lapButton').textContent = isRunning ? 'Reset' : 'Lap';
    isRunning = !isRunning;
};

$('startStopButton').onclick = toggleTimer;

$('lapButton').onclick = () => {
    if (isRunning) {
        const lap = document.createElement('li');
        lap.innerHTML = `<span>Lap ${$('lapTimes').children.length + 1}</span><span>${$('timeDisplay').textContent}</span>`;
        $('lapTimes').prepend(lap);
    } else {
        [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
        updateDisplay();
        $('lapTimes').innerHTML = '';
    }
};
