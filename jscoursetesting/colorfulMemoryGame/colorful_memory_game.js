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
    // Changes the card's background color to match the revealed color
    card.style.backgroundColor = card.dataset.color;
    // Adds the clicked card to the 'selectedCards' array, indicating that it's one
    // of the cards currently chosen by the player
    selectedCards.push(card);
    // Checks if two cards have been selected. If two cards have been chosen,
    // it uses 'setTimeout()' to delay the execution of the 'checkMatch()' function
    // by 500 milliseconds. This brief delay allows the player to see both selected cards
    // before their comparison briefly.
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// evaluates whether the two selected cards match each other in the memory match game.
// Include given code after handleCardClick() function.
function checkMatch() {
    // This line uses array destructuring to assign the first two elements of
    // the 'selectedCards' array to 'card1' and 'card2'. These variables represent
    // the two cards selected by the player for comparison
    const [card1, card2] = selectedCards;
    // This checks if the color value stored in the 'dataset.color' attribute of
    // 'card1' matches the color value of 'card2'.
    if (card1.dataset.color === card2.dataset.color) {
        // It adds the class 'matched' to both cards
        card1.classList.add('matched');
        card2.classList.add('matched');
        // Increases the 'score' by 2 points, as the player successfully matched a pair
        score += 2;
        // Updates the palyer score
        scoreElement.textContent = `Score: ${score}`;
    } else {
        // If the colors of the two selected cards don't match, it resets the text
        // content of both cards to a question mark ('?'), hiding their colors again.
        card1.textContent = '?';
        card2.textContent = '?';
        // Sets the background color of both cards to a default color ('#ddd'),
        // providing a visual cue that the selected cards didn't match
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    // Resetting selection
    selectedCards = [];
}

// Initializing and starting the memory match game
function startGame() {
    // Setting initial game state:
    let timeLeft = 30;
    // Disables the 'startbtn' button to prevent multiple game initiations
    // simultaneously
    startbtn.disabled = true;
    score = 0; // Reset score to zero
    // Updates the displayed score
    scoreElement.textContent = `Score: ${score}`;
    // Initiates the game timer
    startGameTimer(timeLeft);
    // Shuffles the 'colors' array and duplicates it to create pairs for the game cards
    cards = shuffle(colors.concat(colors));
    // Clears the 'selectedCards' array
    selectedCards = [];
    // Clears the game container, removing any existing cards from previous games
    gameContainer.innerHTML = '';
    // Generates a new set of cards, creating a fresh game layout for the player
    generateCards();
    // Adds an event listener to the game container, enabling card clicks and
    // triggering the 'handleCardClick()' function to manage the gameplay when
    // cards are clicked
    gameContainer.addEventListener('click', handleCardClick);
}

// manages the game timer, updating the displayed time and handling
// the end of the game when the timer reaches zero
function startGameTimer(timeLeft) {
    // Sets the initial display of the timer to show the 'timeLeft' value,
    // indicating the starting time remaining for the game.
    timerElement.textContent = `Time Left: ${timeLeft}`;
    // Initiates an interval that triggers a function every second (1000 milliseconds)
    // to update the timer.
    gameInterval = setInterval(() => {
        // Decrements the 'timeLeft' variable every second within the interval,
        // simulating the countdown by reducing the remaining time.
        timeLeft--;
        // Updates the displayed time on the HTML element ('timerElement')
        // to reflect the updated 'timeLeft' value after each decrement.
        timerElement.textContent = `Time Left: ${timeLeft}`;

        // End of game
        // checks if the remaining time reaches zero
        if (timeLeft === 0) {
            // Stops the interval, effectively ending the timer from counting down further
            clearInterval(gameInterval);
            // This line is redundant as it re-declares 'timeLeft' within the scope
            // of this block, resetting it to 30, but it does not affect the
            // 'timeLeft' used in the interval.
            let timeLeft = 30;
            // Displays an alert indicating that the game is over because
            // the time limit has been reached
            alert('Game Over!');
            // Re-enables the 'startbtn' button, allowing the player to start
            // a new game after the current one has ended.
            startbtn.disabled = false;
        }
    }, 1000);
}

// To listen, click event startbtn adds an event listener to the 'startbtn' element,
// triggering the 'startGame' function when the button is clicked. Include the 
// given code at the end of javaScript file
startbtn.addEventListener('click', startGame);


