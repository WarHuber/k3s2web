export default class SessionListModel {
    constructor() {
        this.items = [];
        this.onChangeCallback = null;
    }
    
    add(item) {
        item.onChangeCallback = this.onChangeCallback;
        this.items.push(item);
    }

    delete(itemId) {
        const itemIndex = this.items.findIndex( (item) => item.id === itemId); 
        this.items.splice(itemIndex, 1);
    }

    loadPreviousSessions() {
        fetch('/api/sessions')
            .then(response => response.json())
            .then(data => {
                data.forEach(session => {
                    const item = new SessionModel(session.title, session.description);
                    item.id = session.id;
                    item.startTime = new Date(session.start_time);
                    item.endTime = session.end_time ? new Date(session.end_time) : null;
                    item.length = session.length;
                    this.add(item);
                });
            })
            .catch(error => console.error(error));
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}