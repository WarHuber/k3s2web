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
        this.items = JSON.parse(localStorage.getItem('sessions')) || [];
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}