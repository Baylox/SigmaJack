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
    messageEl.textContent = message;
    messageEl.style.color = message.includes('gagné') ? '#27ae60' : 
                           message.includes('Perdu') ? '#e74c3c' : 
                           '#2c3e50';
}

export function updateControls(disable) {
    document.getElementById('hit-button').disabled = disable;
    document.getElementById('stand-button').disabled = disable;
}