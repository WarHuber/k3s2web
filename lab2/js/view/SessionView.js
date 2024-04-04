export default class SessionView {
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }

    toHtml() {
        return `<div>
            <h1>${this.sessionModel.title}</h1>
            <p>${this.sessionModel.description}</p>
            <button type="button" class="btn btn-secondary" id="pause-session">Pause Session</button>
            <button type="button" class="btn btn-success" id="save-session">Save Progress</button>
        </div>`;
    }

    loadPreviousSessions() {
        let formattedLength = function(length){
            let hours = Math.floor(length / (1000 * 60 * 60));
            let minutes = Math.floor((length % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((length % (1000 * 60)) / 1000);
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return hours + ':' + minutes + ':' + seconds;
        }   
        return `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${this.sessionModel.title}</span>
            <span>${this.sessionModel.description}</span>
            <span class="badge badge-primary badge-pill">${formattedLength(this.sessionModel.length)}</span>
        </li>`;
    }

    static inputHtmlForm() {
        return `<div id="work-session-form">
            <div class="form-group">
                <label for="session-title">Title</label>
                <input type="text" class="form-control" id="session-title" placeholder="Enter title">
            </div>
            <div class="form-group">
                <label for="session-description">Description</label>
                <input type="text" class="form-control" id="session-description" placeholder="Enter description">
            </div>
            <button type="button" class="btn btn-primary" id="start-session">Start Session</button>
        </div>`;
    }
}