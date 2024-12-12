// Description: Tout ce qui concerne principalement l'interface utilisateur (UI) du jeu.
export function createCardElement(card, hidden = false) {
    if (hidden) {
        return `
            <div class="card hidden">
                <div class="card-back"></div>
            </div>
        `;
    }

    const displayValue = card.getDisplayValue();
    const suitSymbol = card.getSuitSymbol();
    const color = card.getColor();
    
    return `
        <div class="card ${color}">
            <span class="card-value top-left">${displayValue}${suitSymbol}</span>
            <span class="card-suit">${suitSymbol}</span>
            <span class="card-value bottom-right">${displayValue}${suitSymbol}</span>
        </div>
    `;
}

export function displayMessage(message) {
    const messageEl = document.getElementById('message');
    
    // Classe CSS associée en fonction du message
    let messageClass = '';
    if (message.includes('gagné')) {
        messageClass = 'message-win';
    } else if (message.includes('croupier')) {
        messageClass = 'message-dealer';
    } else if (message.includes('Égalité')) {
        messageClass = 'message-tie';
    } else if (message.includes('Perdu')) {
        messageClass = 'message-lose';
    }
    
    messageEl.className = `message ${messageClass}`;
    messageEl.innerHTML = `
        <div class="message-icon">
            ${getMessageIcon(message)}
        </div>
        <div class="message-text">${message}</div>
    `;
}

function getMessageIcon(message) {
    if (message.includes('gagné')) {
        return '<i class="fas fa-trophy"></i>';
    } else if (message.includes('croupier')) {
        return '<i class="fas fa-user-tie"></i>';
    } else if (message.includes('Égalité')) {
        return '<i class="fas fa-handshake"></i>';
    } else if (message.includes('Perdu')) {
        return '<i class="fas fa-times-circle"></i>';
    }
    return '';
}

export function updateControls(disable) {
    document.getElementById('hit-button').disabled = disable;
    document.getElementById('stand-button').disabled = disable;
}