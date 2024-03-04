/* script.js */

// Import everything from Act1.js
import * as act1 from './acts/act1.js';

// Import everything from Act2.js
import * as act2 from './acts/act2.js';

// Import everything from Act3.js
import * as act3 from './acts/act3.js';

// Import everything from Act4.js
import * as act4 from './acts/act4.js';

// Import everything from Act5.js
import * as act5 from './acts/act5.js';

// Define global variables
alert("Don't forget to reorganize code and do tests. Check GPT for game saving setup.")
const startingText = "Welcome? Use the buttons above.";
const typingSpeed = 50; // in milliseconds
let currentTextIndex = 0;
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let inventory = ['stick'];
let fighting;
let monsterHealth;

// Load game state from local storage if available
const savedGameState = JSON.parse(localStorage.getItem('gameState'));
let currentChoiceIndex = saveGameState.currentLocationIndex || 0; // Track the current location index

// Define DOM elements
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

const choices = [
    {name: "start",id: 0,buttons: [{ text: "Go to store", func: goStore },{ text: "Enter the house", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in the town square. You see a sign that says Store."},
    {name: "enter house",id: 1,buttons: [{ text: "Go back to store", func: goStore },{ text: "Enter next room", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You enter the house and are greeted."},
    {name: "go cave",id: 2,buttons: [{ text: "Go back to the house", func: enterHouse },{ text: "Go further in the cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in a cave"},   
    {name: "fighting dragon",id: 3,buttons: [{ text: "You are fighting a dragon", func: inFightWithDragon },{ text: "Give up", func: giveUp },{ text: "Just win", func: justWin }],text: "Behold the mighty dragon!!!"}
];

function typeText(text) {
    const textElement = document.getElementById('text');
    const cursorElement = document.getElementById('cursor');
    const buttonsContainer = document.getElementById('controls'); // Get buttons container

    
    // Function to render buttons dynamically
    function renderButtons(choice) {
        const buttonsContainer = document.getElementById('controls');
        buttonsContainer.innerHTML = ''; // Clear previous buttons

        // Hide buttons before rendering
        buttonsContainer.classList.add('hide');

        choice.buttons.forEach((buttonData, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.innerText = buttonData.text;
            choiceButton.onclick = buttonData.func;
            choiceButton.id = `button${index + 1}`; // Set button id
            buttonsContainer.appendChild(choiceButton);
            console.log(choiceButton.id)
        });

        // Show buttons after typing animation is complete
        setTimeout(() => {
            buttonsContainer.classList.remove('hide');
        }, choice.text.length); // Adjust timing based on starting text length and typing speed
    }

    function typeNextCharacter() {
        textElement.textContent += text[currentTextIndex];
        currentTextIndex++;
        if (currentTextIndex < text.length) {
            setTimeout(typeNextCharacter, typingSpeed);
        } else {
            // Animation complete, render buttons
            renderButtons(choices[currentChoiceIndex]);
        }
    }

    // Hide buttons before starting the typing animation
    buttonsContainer.classList.add('hide');

    // Start typing animation
    typeNextCharacter();
}

function update(location) {
    currentTextIndex = 0;
    const textElement = document.getElementById('text');
    textElement.textContent = ''; // Reset text content
    typeText(location.text);
    monsterStats.style.display = "none";

    // Loop through all buttons in the location
    for (let i = 0; i < location.buttons.length; i++) {
        console.log(location.buttons[i])
        const buttonData = location.buttons[i];
        const button = document.querySelector(`#button${i + 1}`); // Select button by ID
        if (button) {
            // Update button text and function
            button.innerText = buttonData.text;
            button.onclick = buttonData.func;
        }
        
    }
}

function goStore() {
    currentChoiceIndex = 0; // Update current location index
    update(choices[currentChoiceIndex]);
    saveGameState();
}

function enterHouse() {
    currentChoiceIndex = 1; // Update current location index
    update(choices[currentChoiceIndex]);
    saveGameState();
}

function goCave() {
    currentChoiceIndex = 2; // Update current location index
    update(choices[currentChoiceIndex]);
    saveGameState();
}

function fightDragon() {
    currentChoiceIndex = 3; // Update current location index
    update(choices[currentChoiceIndex]);
    saveGameState();
}

function inFightWithDragon() {
    alert("You are fighting a dragon.")
}

function giveUp() {
    alert("You give up")
}

function justWin() {
    alert("You literally just win")
}

function goFight() {
    update(choices[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function lose() {
    update(choices[5]);
}

function winGame() {
    update(choices[6]);
}
function saveGameState() {
    // Save relevant game data to local storage
    try {
        localStorage.setItem('gameState', JSON.stringify({
            xp: xp,
            health: health,
            gold: gold,
            currentWeapon: currentWeapon,
            inventory: inventory,
            currentLocationIndex: choices[currentChoiceIndex].id
        }));
    } catch (error) {
        console.error('Error saving game state:', error);
        // Optionally handle the error here, such as showing a user-friendly message
    }
    
}

function restart() {
    // Display a confirmation dialog
    const confirmRestart = window.confirm("Are you sure you want to restart the game?");

    // If the player confirms the restart
    if (confirmRestart) {
        // Perform the restart actions
        xp = 0;
        health = 100;
        gold = 50;
        currentWeapon = 0;

        currentChoiceIndex = 0;
        currentTextIndex = 0;

        inventory = ["stick"];
        goldText.innerText = gold;
        healthText.innerText = health;
        xpText.innerText = xp;
        update(choices[currentChoiceIndex]);
        alert('You restarted')
        toggleMenuVisibility();
    } else {
        // If the player cancels, do nothing
    }
} 

// Toggle menu function
function toggleMenuVisibility() {
    const menuContent = document.getElementById('menu');
    if (menuContent.classList.contains('hide')) {
        menuContent.classList.remove('hide');
    } else {
        menuContent.classList.add('hide');

    }
}

try {
    if (savedGameState) {
        // Load player stats, current location, etc.
        xp = savedGameState.xp || 0;
        health = savedGameState.health || 100;
        gold = savedGameState.gold || 50;
        currentWeapon = savedGameState.currentWeapon || 0;
        inventory = savedGameState.inventory || ["stick"];
        currentChoiceIndex = savedGameState.currentLocationIndex || 0;
    }
} catch (error) {
    console.error('Error initializing game from saved state:', error);
    // Optionally handle the error here, such as showing a user-friendly message
}


(function() {
    const weapons = [
        { name: 'stick', power: 5 },
        { name: 'dagger', power: 30 },
        { name: 'claw hammer', power: 50 },
        { name: 'sword', power: 100 }
    ];
    const monsters = [
        {
            name: "slime",
            level: 2,
            health: 15
        },
        {
            name: "fanged beast",
            level: 8,
            health: 60
        },
        {
            name: "dragon",
            level: 20,
            health: 300
        }
    ];
    
    

    // Create menu button
    const menuButton = document.createElement('button');
    menuButton.setAttribute('id', 'menu-button');
    menuButton.textContent = 'Close Menu';
    menuButton.addEventListener('click', toggleMenuVisibility);

    // Append menu button to the menu div
    const menuDiv = document.getElementById('menu-content');
    menuDiv.appendChild(menuButton);

    // Create menu content div
    const menuContentDiv = document.createElement('div');
    menuContentDiv.setAttribute('id', 'menu-content');

    const openMenuButton = document.getElementById('open-menu');
    openMenuButton.addEventListener('click', toggleMenuVisibility);

    // Create buttons for the menu content
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.addEventListener('click', restart);

    const checkpointButton = document.createElement('button');
    checkpointButton.textContent = 'Return to Checkpoint';
    checkpointButton.addEventListener('click', returnToCheckpoint);

    const hintButton = document.createElement('button');
    hintButton.textContent = 'Hint';
    hintButton.addEventListener('click', showHint);

    // Append buttons to the menu content div
    menuContentDiv.appendChild(restartButton);
    menuContentDiv.appendChild(checkpointButton);
    menuContentDiv.appendChild(hintButton);

    // Append menu content div to the menu div
    menuDiv.appendChild(menuContentDiv);

    function returnToCheckpoint() {
        alert('Return to Checkpoint');
    }

    function showHint() {
        alert('Show Hint');
    }
  
    // Event listener for the escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            toggleMenuVisibility();
        }
    });

    // Save the game State
    saveGameState();

    // Call typeText function with starting text
    //typeText(startingText);

    //alert(currentLocationIndex)
    // Go to the starting location
    console.log(choices[currentChoiceIndex])
    update(choices[currentChoiceIndex]);

    // Save game state when leaving the page
    window.addEventListener('beforeunload', saveGameState);

    // Call typeText function with startingText
    //typeText(startingText);
})();