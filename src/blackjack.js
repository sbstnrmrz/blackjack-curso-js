export function setupBlackjack() {
  const playerCardsContainer = document.querySelector('#player-cards');
  const dealerCardsContainer = document.querySelector('#dealer-cards');
  const playerScoreContainer = document.querySelector('#player-score');
  const dealerScoreContainer = document.querySelector('#dealer-score');
  const gameOverMsg = document.querySelector('#game-over-msg');
  let cards = [];
  const hitButton = document.querySelector('#hit-button');
  const newGameButton = document.querySelector('#new-game-button');
  const standButton = document.querySelector('#stand-button');
  const assetsPath = '/assets/cartas/'; 

  let isGameOver = false;

  const cardBacks = {
    red: '/assets/cartas/red_back.png', 
    grey: '/assets/cartas/grey_back.png'
  };

  let player = {
    cards: [],
    score: 0,
  };

  let dealer = {
    cards: [],
    score: 0,
  }

  let suits = ['C', 'S', 'H', 'D'];
  let figures = {
    10: 'J',
    11: 'Q',
    12: 'K',
  };

  for (const suit of suits) {
    for (let i = 0; i < 13; i++) {

      const mod = i % 13;
      let finalPath = '';
      if (mod < 10) {
        finalPath = `${i+1}${suit}`;
      }
      if (mod == 0) {
        finalPath = `A${suit}`;
      }
      if (mod > 9) {
        finalPath = `${figures[i]}${suit}`;
      }
      cards.push(finalPath);
    }
  }

  console.log(cards.length);

  function newGame() {
    player.cards = [];
    playerCardsContainer.textContent = '';
    updatePlayerScore();

    dealer.cards = [];
    dealerCardsContainer.textContent = '';
    updateDealerScore();


    dealerHit();
    dealerHitHiddenCard();
    playerHit();

    isGameOver = false;
    hitButton.disabled = false;
    standButton.disabled = false;

    gameOverMsg.textContent = '';
  }

  function gameOver() {
    hitButton.disabled = true;
    standButton.disabled = true;

    document.querySelector('#hidden-card').remove();

    dealerHit();
    while (dealer.score < 17 && player.score <= 21) {
      dealerHit();
    }

    let msg = ''
    if (player.score == dealer.score) {
      msg = 'Draw';
    } else if (player.score > 21 || (dealer.score > player.score && dealer.score <= 21)) {
      msg = 'Player Lose';
    } else {
      msg = 'Player Wins';
    }

    gameOverMsg.textContent = msg;
  }

  function getRandomCard() {
    return cards[Math.floor(Math.random() * cards.length)];
  }

  function getCardScore(card) {
    let res = 0;
    const a = card.length == 3 ? card.slice(0, 2) : card.slice(0, 1) ;
    if (parseInt(a) <= 10) {
      res = parseInt(a);
    } else if (a == 'A') {
      res = 11; 
    } else {
      res = 10;
    }

    return res;
  }

  function playerHit() {
    const card = getRandomCard();
    const img = document.createElement('img');
    img.src = assetsPath + card + '.png';

    img.classList.add('card');

    playerCardsContainer.appendChild(img);
    player.cards.push(card);

    updatePlayerScore();
    if (player.score > 21) {
      console.log('tralalero tralalal');
      gameOver();
    }
  }

  function dealerHit() {
    const card = getRandomCard();
    const img = document.createElement('img');
    img.src = assetsPath + card + '.png';

    img.classList.add('card');

    dealerCardsContainer.appendChild(img);
    dealer.cards.push(card);

    updateDealerScore();

    console.log('dealer hit card: ' + card);
    console.log('dealer cards: ' + dealer.cards);
    console.log('card score: ' + getCardScore(card));
  }

  
  function dealerHitHiddenCard() {
    const card = cardBacks.grey;
    const img = document.createElement('img');
    img.src = cardBacks.red;
    img.id = 'hidden-card';
    img.classList.add('card');

    dealerCardsContainer.appendChild(img);
  }

  function updatePlayerScore() {
    // check this because of the ace
    let score = 0;
    for (const card of player.cards) {
      const isAce = card.substring(0, 1) == 'A' && player.score >= 11;
      score += isAce ? 1 : getCardScore(card);
    }
    playerScoreContainer.textContent = 'Jugador - ' + score;
    player.score = score;

    console.warn('current player score: ' + player.score);
  }

  function updateDealerScore() {
    let score = 0;
    for (const card of dealer.cards) {
      score += getCardScore(card);
    }
    dealer.score = score;
    dealerScoreContainer.textContent = 'Dealer - ' + score;
  }

  standButton.addEventListener(('click'), () => {
    gameOver();
  });

  hitButton.addEventListener(('click'), () => {
    playerHit();
  });

  newGameButton.addEventListener(('click'), () => {
    newGame();
  });

  newGame();
}

