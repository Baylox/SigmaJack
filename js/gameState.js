// Contient les fonctions qui gèrent l'état du jeu et les interactions avec l'interface utilisateur.
import { BlackjackGame } from './game.js';
import { Deck } from './deck.js';
import { createCardElement, displayMessage, updateControls } from './ui.js';

let game = null;

export function getGame() {
    return game;
}

/**
 * Met à jour l'interface utilisateur du jeu
 * @param {boolean} hideSecondDealerCard - Indique si la deuxième carte du croupier doit être cachée
 */
export function updateUI(hideSecondDealerCard = true) {
    const playerCardsEl = document.getElementById('player-cards');
    const dealerCardsEl = document.getElementById('dealer-cards');
    const playerScoreEl = document.getElementById('player-score');
    const dealerScoreEl = document.getElementById('dealer-score');
    
    // Afficher les cartes du joueur
    playerCardsEl.innerHTML = game.playerHand.map(card => 
        createCardElement(card)
    ).join('');
    
    // Afficher les cartes du croupier
    dealerCardsEl.innerHTML = game.dealerHand.map((card, index) => 
        index === 1 && hideSecondDealerCard && !game.gameOver ? 
            createCardElement(card, true) : 
            createCardElement(card)
    ).join('');
    
    // Calculer et afficher les scores
    const playerScore = game.calculateScore(game.playerHand);
    const dealerScore = hideSecondDealerCard && !game.gameOver ? 
        game.dealerHand[0].getScore() : 
        game.calculateScore(game.dealerHand);
    
    playerScoreEl.textContent = `Score: ${playerScore}`;
    dealerScoreEl.textContent = `Score: ${dealerScore}`;
}

export function startNewGame() {
    game = new BlackjackGame(updateUI);
    game.deck = new Deck();
    game.gameOver = false;
    game.dealInitialCards();
    updateControls(false);
    displayMessage('');
}

export async function handleStand() {
    if (!game || game.gameOver) return;
    
    game.gameOver = true;
    updateControls(true);
    updateUI(false);
    
    await game.dealerPlay();
    
    const winner = game.determineWinner();
    switch(winner) {
        case 'player':
            displayMessage('Vous avez gagné ! 🎉');
            break;
        case 'dealer':
            displayMessage('Le croupier gagne ! 🎲');
            break;
        case 'tie':
            displayMessage('Égalité ! 🤝');
            break;
    }
}

export function handleHit() {
    if (!game || game.gameOver) return;
    
    const result = game.playerHit();
    
    if (result === 'bust') {
        game.gameOver = true;
        displayMessage('Perdu ! Vous avez dépassé 21. ❌');
        updateControls(true);
        updateUI(false);
    } else {
        updateUI();
    }
}