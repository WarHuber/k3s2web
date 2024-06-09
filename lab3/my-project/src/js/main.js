import SessionListModel from './model/SessionListModel.js';
import SessionListView from './view/SessionListView.js';
import Controller from './controller/Controller.js';

let sessionListModel = new SessionListModel();
let sessionListView = new SessionListView(sessionListModel);
let controller = new Controller(sessionListModel, sessionListView);