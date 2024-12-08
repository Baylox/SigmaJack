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

        // Vérifier le Blackjack initial
        if (this.calculateScore(this.playerHand) === 21) {
            this.gameOver = true;
            return 'blackjack';
        }
    }

    playerHit() {
        if (this.gameOver) return;
        
        this.playerHand.push(this.deck.draw());
        const score = this.calculateScore(this.playerHand);
        
        if (score > 21) {
            this.gameOver = true;
            return 'bust';
        } else if (score === 21) {
            this.gameOver = true;
            return 'blackjack';
        }
        
        return 'continue';
    }

    async dealerPlay() {
        const playerScore = this.calculateScore(this.playerHand);
        let dealerScore = this.calculateScore(this.dealerHand);

        while (true) {
            // Si le joueur a plus de 16, le croupier essaie de le battre ou de faire égalité
            if (playerScore > 16) {
                if (dealerScore < playerScore) {
                    this.dealerHand.push(this.deck.draw());
                    dealerScore = this.calculateScore(this.dealerHand);
                    this.updateUI();
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    break; // Le croupier a atteint ou dépassé le score du joueur
                }
            }
            // Sinon, le croupier s'arrête à 16
            else if (dealerScore < 17) {
                this.dealerHand.push(this.deck.draw());
                dealerScore = this.calculateScore(this.dealerHand);
                this.updateUI();
                await new Promise(resolve => setTimeout(resolve, 500));
            } else {
                break; // Le croupier a au moins 17
            }

            // Vérifier si le croupier a dépassé 21
            if (dealerScore > 21) {
                break;
            }
        }
    }

    determineWinner() {
        const playerScore = this.calculateScore(this.playerHand);
        const dealerScore = this.calculateScore(this.dealerHand);

        if (playerScore > 21) return 'dealer';
        if (dealerScore > 21) return 'player';
        if (playerScore === 21 && this.playerHand.length === 2) return 'blackjack';
        if (playerScore > dealerScore) return 'player';
        if (dealerScore > playerScore) return 'dealer';
        return 'tie';
    }
}