import SessionListView from "../view/SessionListView.js";
import SessionModel from "../model/SessionModel.js";
import SessionView from "../view/SessionView.js";

export default class Controller {
    constructor(sessionListModel, sessionListView) {
        this.sessionListModel = sessionListModel;
        this.sessionListView = sessionListView;
        this.sessionListModel.setOnChangeCallback((e) => this.onChangeCallback(e));
        this.sessionListView.setControllerOnStart(this.start);
        this.sessionListView.setControllerOnPause(this.pause);
        this.sessionListView.setControllerOnSave(this.save);
        this.initOnModelChange();
        if (localStorage.getItem('sessions')) {
            this.loadPreviousSessions();
        }
    }

    onChangeCallback() {
        document.querySelector('#work-session-form').innerHTML = this.sessionListView.toHtml();
    }

    start() {
        let title = document.querySelector('#session-title').value || 'Untitled';
        let description = document.querySelector('#session-description').value || 'No description';
        this.sessionListModel.add(new SessionModel(title, description));
        this.sessionListModel.items[this.sessionListModel.items.length - 1].start();
    }

    pause() {
        this.sessionListModel.items[this.sessionListModel.items.length - 1].pause();
    }

    save() {
        console.log(this.sessionListModel.items);
        this.sessionListModel.items[this.sessionListModel.items.length - 1].save();
        console.log(this.sessionListModel.items);
        document.querySelector('#work-session-form').innerHTML = SessionView.inputHtmlForm();
        
        console.log(document.querySelector('#previous-sessions-list').innerHTML);
        this.sessionListModel.loadPreviousSessions();
        let sessionListView = new SessionListView(this.sessionListModel);
        document.querySelector('#previous-sessions-list').innerHTML = sessionListView.loadPreviousSessions();
        console.log(document.querySelector('#previous-sessions-list').innerHTML);
    }

    loadPreviousSessions() {
        this.sessionListModel.loadPreviousSessions();
        document.querySelector('#previous-sessions-list').innerHTML = this.sessionListView.loadPreviousSessions();
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                document.querySelector('#work-session-form').innerHTML = this.sessionListView.toHtml();
                return true;
            }
        }
        this.sessionListModel.items = new Proxy(this.sessionListModel.items, handler);
    }
}