class Message {
    getErrorMessage(message) {
        return `<p class="error-message settings-message">
        <i class="fas fa-exclamation-circle"></i>
            ${message}
        </p>`;
    }

    getSuccessMessage(message) {
        return `<p class="success-message settings-message">
        <i class="fas fa-check-circle"></i>
            ${message}
        </p>`;
    }

    showErrorMessage(message) {
        this.messageContainer.innerHTML = this.getErrorMessage(message);
    }

    showSuccessMessage(message) {
        this.messageContainer.innerHTML = this.getSuccessMessage(message);
    }

    cleanMessage() {
        this.messageContainer.innerHTML = null;
    }
}

class SettingsMessage extends Message {
    constructor(messageContainer) {
        super();
        this.messageContainer = messageContainer;
    }
}

class ListMessage extends Message {
    constructor(messageContainer) {
        super();
        this.messageContainer = messageContainer;
    }
}

export { SettingsMessage, ListMessage };
