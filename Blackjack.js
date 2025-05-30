let deck, playerHand, dealerHand;

function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function calculateScore(hand) {
  let score = 0;
  let aces = 0;
  for (let card of hand) {
    if (['K', 'Q', 'J'].includes(card.value)) {
      score += 10;
    } else if (card.value === 'A') {
      aces++;
      score += 11;
    } else {
      score += parseInt(card.value);
    }
  }
  while (score > 21 && aces) {
    score -= 10;
    aces--;
  }
  return score;
}

function displayHand(hand, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = '';
  for (let card of hand) {
    const div = document.createElement('div');
    div.className = 'card';
    div.textContent = `${card.value}${card.suit}`;
    container.appendChild(div);
  }
}

function updateScores() {
  document.getElementById('player-score').textContent = `Score: ${calculateScore(playerHand)}`;
  document.getElementById('dealer-score').textContent = `Score: ${calculateScore(dealerHand)}`;
}

function startGame() {
  deck = createDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  displayHand(playerHand, 'player-hand');
  displayHand(dealerHand, 'dealer-hand');
  updateScores();
  document.getElementById('status').textContent = '';
}

function hit() {
  playerHand.push(deck.pop());
  displayHand(playerHand, 'player-hand');
  updateScores();
  if (calculateScore(playerHand) > 21) {
    document.getElementById('status').textContent = 'You busted!';
  }
}

function stand() {
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }
  displayHand(dealerHand, 'dealer-hand');
  updateScores();
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);
  if (dealerScore > 21 || playerScore > dealerScore) {
    document.getElementById('status').textContent = 'You win!';
  } else if (playerScore < dealerScore) {
    document.getElementById('status').textContent = 'Dealer wins!';
  } else {
    document.getElementById('status').textContent = "It's a tie!";
  }
}
