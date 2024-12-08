import { Card } from './card.js';

// Classe représentant un jeu de cartes
export class Deck {
    constructor() {
        this.cards = [];
        this.reset(); // Initialise le jeu de cartes
    }

    // Réinitialise le jeu de cartes
    reset() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades']; // Les quatre couleurs
        const values = Array.from({ length: 13 }, (_, i) => i + 1); // Les valeurs de 1 à 13

        // Crée un jeu de 52 cartes
        this.cards = suits.flatMap(suit => 
            values.map(value => new Card(suit, value))
        );
        this.shuffle(); // Mélange les cartes
    }

    // Mélange les cartes du jeu
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Échange les cartes
        }
    }

    // Tire une carte du jeu
    draw() {
        if (this.cards.length === 0) {
            this.reset(); // Réinitialise le jeu si toutes les cartes ont été tirées
        }
        return this.cards.pop(); // Retourne la dernière carte du jeu
    }
}