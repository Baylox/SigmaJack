//Contient la logique principale du jeu de Blackjack
export class BlackjackGame {
    constructor(updateUI) {
        this.deck = null;
        this.playerHand = [];
        this.dealerHand = [];
        this.updateUI = updateUI;
        this.gameOver = false;
    }

    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        // Compter d'abord les cartes non-As
        for (const card of hand) {
            if (card.value === 1) {
                aces += 1;
            } else {
                score += card.getScore();
            }
        }

        // Ajouter les As en dernier pour optimiser leur valeur
        for (let i = 0; i < aces; i++) {
            if (score + 11 <= 21) {
                score += 11;
            } else {
                score += 1;
            }
        }

        return score;
    }

    dealInitialCards() {
        this.playerHand = [this.deck.draw(), this.deck.draw()];
        this.dealerHand = [this.deck.draw(), this.deck.draw()];
        this.updateUI();
    }

    playerHit() {
        if (this.gameOver) return;
        
        this.playerHand.push(this.deck.draw());
        const score = this.calculateScore(this.playerHand);
        
        if (score > 21) {
            return 'bust';
        }
        
        return 'continue';
    }

    async dealerPlay() {
        let dealerScore = this.calculateScore(this.dealerHand);

        // Le croupier tire des cartes tant que son score est inférieur à 17
        while (dealerScore < 17) {
            this.dealerHand.push(this.deck.draw());
            dealerScore = this.calculateScore(this.dealerHand);
            this.updateUI();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    determineWinner() {
        const playerScore = this.calculateScore(this.playerHand);
        const dealerScore = this.calculateScore(this.dealerHand);

        if (playerScore > 21) return 'dealer';
        if (dealerScore > 21) return 'player';
        if (playerScore > dealerScore) return 'player';
        if (dealerScore > playerScore) return 'dealer';
        return 'tie';
    }
}