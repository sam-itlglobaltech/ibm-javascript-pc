// Initialize of arrays colors, selectedCards and variables cards, score, timeLeft and
// gameInterval
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

// DOM elements section
// startbtn is the variable assigned to the HTML element startbtn, that starts/reset the game
const startbtn = document.getElementById('startbtn');
// gameContainer is the variable assigned to the HTML element game-container, to access and
// manipulate this button element
const gameContainer = document.getElementById('game-container');
// scoreElement is the variable assigned to the HTML score element. JS manipulates the score
// with this element.
const scoreElement = document.getElementById('score');
// timerElement is the variable assigned to the HTML timer element. JS uses this variable to do the
// countdown and notify about the remaining time.
const timerElement = document.getElementById('timer');

// creating the card elements within the game container based on the 'cards' array
// that holds color values for the cards. This function creates the card elements 
// dynamically within the game-container div. Include given code in javaScript file 
// after previous code.
function generateCards() {
    // For each color in the cards array
    for (const color of cards) {
        // it creates a new HTML element. The 'div' represents a card in the game
        const card = document.createElement('div');
        // adds a class card to the newly created div element. This class might contain
        // CSS style or rules to style the card elements
        card.classList.add('card');
        // It sets the 'dataset.color' attribute of the card element to the current color
        // value from the 'cards' array. This icon represents the card's hidden color
        // until the player clicks it.
        card.dataset.color = color;
        // The text content of each card is initially set to a question mark
        card.textContent = '?';
        // the newly created card element is attached to the 'gameContainer' element
        // as a child. This action adds each card element to the game interface
        // within the designated container.
        gameContainer.appendChild(card);
    }
}

// shuffling the elements of an array in random order. It uses the Fisher-Yates shuffle
// algorithm, a common method for randomizing the order of elements in an array.
// Include given code after generateCards() function.
// Array parameter: It takes an array as an argument, which contains yet to be
// shuffled elements.
function shuffle(array) {
    // The function starts by initiating a 'for' loop that iterates backward
    // through the array starting from the last index (let i = array.length - 1; i > 0; i–).
    for (let i = array.length - 1; i > 0; i--) {
        // Within each iteration, it generates a random index 'j'. This 'j' represents
        // a random index within the array.
        const j = Math.floor(Math.random() * (i + 1));
        // Swaps the elements at the 'i' and 'j' indices using array destructuring
        // This line efficiently swaps the values at positions 'i' and 'j' without
        // requiring a temporary variable.
        [array[i], array[j]] = [array[j], array[i]];
    }
    // Continuing the loop: The loop continues until it finishes iterating through the
    // entire array, shuffling elements along the way.
    // Returning the shuffled array: Once the loop is complete, the function returns
    // the array with its elements rearranged into a random order.
    return array;
}

// This function manages the logic when a user clicks the card in the memory match game
function handleCardClick(event) {
    // This line retrieves the element that triggered the event (in this case, a clicked
    // card) and assigns it to the 'card' variable.
    const card = event.target;
    // This 'if' statement checks whether the clicked element is a card and if it's
    // already matched. If either condition is true:
    // If the element is not a card or has already matched, the function returns early,
    // ignoring any further actions for this particular click.
    if (!card.classList.contains('card') || card.classList.contains('matched')) {
        return;
    }
    // It sets the text content of the clicked card to the value stored in its
    // 'dataset.color'. This action reveals the card's color by changing the text
    // content to the color value.
    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    selectedCards = [];
}

function startGame() {
    let timeLeft = 30;
    startbtn.disabled = true;
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors));
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}

function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            let timeLeft = 30;
            alert('Game Over!');
            startbtn.disabled = false;
        }
    }, 1000);
}

startbtn.addEventListener('click', startGame);


