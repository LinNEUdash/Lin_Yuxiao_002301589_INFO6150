$(document).ready(() => {
    let intervalId, elapsedSeconds = 0;

    const setCurrentDate = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        $('#datePicker').val(formattedDate);
    };

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    const updateTimeDisplay = () => {
        $('#timeLabel').text(formatTime(elapsedSeconds));
    };

    const stopwatchActions = async (action) => {
        return new Promise((resolve) => {
            if (action === "start") {
                if (!intervalId) {
                    intervalId = setInterval(() => {
                        elapsedSeconds++;
                        updateTimeDisplay();
                    }, 1000);
                }
            } else if (action === "stop") {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            } else if (action === "reset") {
                if (intervalId) clearInterval(intervalId);
                intervalId = null;
                elapsedSeconds = 0;
                updateTimeDisplay();
            }
            resolve();
        });
    };

    $('#startButton').on('click', () => stopwatchActions("start"));
    $('#stopButton').on('click', () => stopwatchActions("stop"));
    $('#resetButton').on('click', () => stopwatchActions("reset"));

    setCurrentDate();
});