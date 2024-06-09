import SessionView from './SessionView.js';

export default class SessionListView {
    constructor(sessionListModel) {
        this.sessionListModel = sessionListModel;
        this.controllerOnStart = null;
        this.controllerOnPause = null;
        this.controllerOnSave = null;
        document.querySelector('#work-session-form').addEventListener('click', (e) => this.onClick(e)); // 'this' changes
    }

    setControllerOnStart(controllerOnStart) {
        this.controllerOnStart = controllerOnStart;
    }

    setControllerOnPause(controllerOnPause) {
        this.controllerOnPause = controllerOnPause;
    }

    setControllerOnSave(controllerOnSave) {
        this.controllerOnSave = controllerOnSave;
    }

    onClick(e) {
        if (e.target.id === 'start-session') {
            this.controllerOnStart();
            return;
        }
        if (e.target.id === 'pause-session') {
            this.controllerOnPause();
            return;
        }
        if (e.target.id === 'save-session') {
            this.controllerOnSave();
            return;
        }
    }

    loadPreviousSessions() {
        // console.log(this.sessionListModel.items);
        const sessionsHtml = this.sessionListModel.items.map( (item) => {
            const sessionView = new SessionView(item);
            return sessionView.loadPreviousSessions();
        }).join("");
        // console.log(sessionsHtml);
        return sessionsHtml
    }

    toHtml() {
        const sessionView = this.sessionListModel.items[this.sessionListModel.items.length - 1];
        if (sessionView) {
            return new SessionView(sessionView).toHtml();
        }
    }
}