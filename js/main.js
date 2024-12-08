import { Deck } from './deck.js';
import { BlackjackGame } from './game.js';

let game;

// Fonction pour créer un élément de carte HTML
function createCardElement(card) {
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

// Fonction pour mettre à jour l'interface utilisateur
function updateUI() {
    const playerCardsEl = document.getElementById('player-cards');
    const dealerCardsEl = document.getElementById('dealer-cards');
    const playerScoreEl = document.getElementById('player-score');
    const dealerScoreEl = document.getElementById('dealer-score');
    
    // Mettre à jour les cartes du joueur
    playerCardsEl.innerHTML = game.playerHand.map(card => 
        createCardElement(card)
    ).join('');
    
    // Mettre à jour les cartes du croupier
    dealerCardsEl.innerHTML = game.dealerHand.map(card => 
        createCardElement(card)
    ).join('');
    
    // Calculer et afficher les scores
    const playerScore = game.calculateScore(game.playerHand);
    const dealerScore = game.calculateScore(game.dealerHand);
    
    playerScoreEl.textContent = `Score: ${playerScore}`;
    dealerScoreEl.textContent = `Score: ${dealerScore}`;
}

// Fonction pour afficher un message
function displayMessage(message) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.style.color = message.includes('gagné') ? '#27ae60' : 
                           message.includes('Perdu') ? '#e74c3c' : 
                           '#2c3e50';
}

// Fonction pour mettre à jour l'état des contrôles (boutons)
function updateControls(disable) {
    document.getElementById('hit-button').disabled = disable;
    document.getElementById('stand-button').disabled = disable;
}

// Fonction pour démarrer une nouvelle partie
function startNewGame() {
    game = new BlackjackGame(updateUI);
    game.deck = new Deck();
    game.gameOver = false;
    const result = game.dealInitialCards();
    updateControls(false);
    displayMessage('');

    if (result === 'blackjack') {
        displayMessage('Blackjack ! Vous avez gagné !');
        updateControls(true);
    }
}

// Fonction pour gérer l'action "Stand"
async function handleStand() {
    updateControls(true);
    await game.dealerPlay();
    game.gameOver = true;
    
    const winner = game.determineWinner();
    switch(winner) {
        case 'player':
            displayMessage('Vous avez gagné !');
            break;
        case 'dealer':
            displayMessage('Le croupier gagne !');
            break;
        case 'blackjack':
            displayMessage('Blackjack ! Vous avez gagné !');
            break;
        case 'tie':
            displayMessage('Égalité !');
            break;
    }
}

// Fonction pour gérer l'action pour pick une carte
function handleHit() {
    const result = game.playerHit();
    if (result === 'bust') {
        displayMessage('Perdu ! Vous avez dépassé 21.');
        updateControls(true);
    } else if (result === 'blackjack') {
        displayMessage('Blackjack ! Vous avez gagné !');
        updateControls(true);
    }
    updateUI();
}

// Ajout des écouteurs d'événements
document.getElementById('new-game-button').addEventListener('click', startNewGame);
document.getElementById('hit-button').addEventListener('click', handleHit);
document.getElementById('stand-button').addEventListener('click', handleStand);

// Démarrer la première partie
startNewGame();