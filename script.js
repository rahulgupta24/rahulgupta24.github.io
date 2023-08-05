// Get DOM elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('timeDisplay');
const ring = document.querySelector('.ring');

let startTime;
let interval;
let elapsedTime = 0;
let currentDegree = 0;

// Update timer display
function updateDisplay() {
    const currentTime = new Date() - startTime + elapsedTime;
    const totalSeconds = Math.floor(currentTime / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    // Format time as HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeDisplay.textContent = formattedTime;
    ring.setAttribute('data-timer', formattedTime);

    // Update ring animation
    currentDegree = (totalSeconds % 60) * 6;
    const filledDegree = (currentDegree / 360) * 283;
    const remainingDegree = 283 - filledDegree;

    ring.style.strokeDasharray = `${filledDegree} ${remainingDegree}`;
}

// Start the timer
function startTimer() {
    startTime = new Date();
    interval = setInterval(updateDisplay, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
    timeDisplay.classList.add('running'); 
    timeDisplay.classList.remove('paused');
}

// Stop the timer
function stopTimer() {
    clearInterval(interval);
    elapsedTime += new Date() - startTime;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    timeDisplay.classList.remove('running');
    timeDisplay.classList.add('paused'); 
}

// Reset the timer
function resetTimer() {
    clearInterval(interval);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    ring.setAttribute('data-timer', '00:00:00');
    ring.style.strokeDasharray = `0 283`;
    currentDegree = 0;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    timeDisplay.classList.remove('running', 'paused'); 
}

// Attach event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
