import Timer from './Timer.js';

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default class SessionModel {
    constructor(title, description) {
        this.id = uid();
        this.title = title;
        this.description = description;
        this.startTime = null;
        this.endTime = null;
        this.length = 0;
        this.timer = null;

        this.onChangeCallback = null;
        return this.initOnModelChange();
    }
    
    start() {
        this.startTime = new Date();
        this.timer = new Timer(document.querySelector('#timer'));
        this.timer.start();
    }

    pause() {
        if (this.timer.running) {
            this.endTime = new Date();
            this.length += this.endTime - this.startTime;
            this.timer.pause();
        }
        else {
            this.startTime = new Date();
            this.timer.start();
        }
    }

    save() {
        if (this.timer.running) {
            this.endTime = new Date();
            this.length += this.endTime - this.startTime;
            this.timer.pause();
        }

        // Save to server
        fetch(`/api/sessions/${this.id}/save`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: this.description,
                length: this.length
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

        this.timer.reset();
        this.startTime = new Date(); // Reset startTime when the timer is reset
    }
    
    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                if (this.onChangeCallback) this.onChangeCallback(this);
                return true;
            }
        }
        return new Proxy(this, handler);
    }
}