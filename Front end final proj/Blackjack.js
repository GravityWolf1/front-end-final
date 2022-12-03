var dealerSum = 0;
var playerSum = 0;
var dealerAce = 0;
var playerAce = 0;
var dealerCount = 0;
var hiddenCard;
var deck;
var canHit = true;

function build() {
    let rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suit = ["C", "D", "H", "S"];
    deck= [];

    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < rank.length; j++) {
            deck.push(rank[j] + "" + suit[i]);
        }
    }
}

function shuffle() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

        console.log(deck);
}

function startGame() {
    hiddenCard = deck.pop();
    dealerSum += getValue(hiddenCard);
    dealerAce += checkAce(hiddenCard);

    while (dealerCount < 1) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/PNG/" + card + ".png";
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
        dealerCount++
    }

    for (let i =0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/PNG/" + card + ".png";
        playerSum += getValue(card);
        playerAce += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);

        console.log(dealerSum);
        console.log(playerSum);
}

function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/PNG/" + card + ".png";
    playerSum += getValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerSum, playerAce) > 21) {
        canHit = false;
    }
}

function stand() {
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/PNG/" + card + ".png";
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    dealerSum = reduceAce(dealerSum, dealerAce);
    playerSum = reduceAce(playerSum, playerAce);
    canHit = false;
    document.getElementById("hiddencard").src = "./cards/PNG/" + hiddenCard + ".png";

    let message = "";
    if (playerSum == 21) {
        message = "You got BlackJack! Win!";
    }
    else if (dealerSum == 21) {
        message = "Dealer got BlackJack! Lose!";
    }
    else if (playerSum > 21) {
        message = "You busted! You Lose!";
    }
    else if (dealerSum > 21) {
        message = "Dealer Busted! You Win!";
    }
    else if (playerSum == dealerSum) {
        message = "Push!";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("");
    let rank = data[0];

    console.log(rank);

    if (isNaN(rank)) {
        if (rank == "A") {
            return 11;
        }
        return 10;
    }
    if (rank == "1") {
        return 10;
    }
    return parseInt(rank);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAce) {
    while (playerSum > 21 && playerAce > 0) {
        playerSum -= 10;
        playerAce -= 1;
    }
    return playerSum;
}

window.onload = function() {
    build();
    shuffle();
    startGame();
}