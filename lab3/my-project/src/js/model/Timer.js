export default class Timer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.startTime = 0;
        this.updatedTime = 0;
        this.difference = 0;
        this.tInterval = 0;
        this.running = 0;
    }

    start() {
        if (!this.running) {
            this.startTime = new Date().getTime() - this.difference;
            this.tInterval = setInterval(this.update.bind(this), 1);
            this.running = 1;
        }
    }

    pause() {
        if (this.running) {
            clearInterval(this.tInterval);
            this.difference = new Date().getTime() - this.startTime;
            this.running = 0;
        }
        else {
            this.start();
        }
    }

    reset() {
        clearInterval(this.tInterval);
        this.displayElement.textContent = "00:00:00";
        this.startTime = 0;
        this.difference = 0;
        this.running = 0;
    }

    update() {
        const now = new Date().getTime();
        this.difference = now - this.startTime;
        let hours = Math.floor((this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((this.difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.difference % (1000 * 60)) / 1000);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        this.displayElement.textContent = hours + ':' + minutes + ':' + seconds;
    }
}
