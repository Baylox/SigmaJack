// Création de la classe Card
export class Card {
    constructor(suit, value) {
        this.suit = suit; // Définir la couleur de la carte (cœur, carreau, trèfle, pique)
        this.value = value; // Définir la valeur de la carte (1 à 13)
    }

    toString() {
        const suits = {
            'hearts': '♥',
            'diamonds': '♦',
            'clubs': '♣',
            'spades': '♠'
        };
        
        const values = {
            1: 'A', 
            11: 'J', 
            12: 'Q', 
            13: 'K' 
        };

        const displayValue = values[this.value] || this.value; // Obtenir la valeur affichée de la carte
        return `${displayValue}${suits[this.suit]}`; // Retourner la représentation de la carte sous forme de chaîne de caractères
    }

    getColor() {
        return ['hearts', 'diamonds'].includes(this.suit) ? 'red' : 'black'; // Retourner la couleur de la carte en fonction de son signe
    }

    getDisplayValue() {
        const values = {
            1: 'A', // As
            11: 'J', // Valet
            12: 'Q', // Dame
            13: 'K' // Roi
        };
        return values[this.value] || this.value; // Retourner la valeur affichée de la carte
    }

    getSuitSymbol() {
        const suits = {
            'hearts': '♥',
            'diamonds': '♦',
            'clubs': '♣',
            'spades': '♠'
        };
        return suits[this.suit]; // Retourner le symbole du signe de la carte
    }

    getScore() {
        if (this.value === 1) return 11; // L'As vaut 11 points par défaut
        return this.value > 10 ? 10 : this.value; // Les barils valent 10 points
    }
}