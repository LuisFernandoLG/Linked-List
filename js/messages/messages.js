//Icons by FontAwesone
function getErrorMessage(message) {
    return `<p class="error-message settings-message">
    <i class="fas fa-exclamation-circle"></i>
        ${message}
    </p>`;
}

function getSuccessMessage(message) {
    return `<p class="success-message settings-message">
    <i class="fas fa-check-circle"></i>
        ${message}
    </p>`;
}

export{getErrorMessage, getSuccessMessage,}
    