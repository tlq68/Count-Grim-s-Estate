/* script.js */

import gameLogic from './gameLogic/gameLogic.js'
import ui from './ui/ui.js'
import * as storage from './localStorageManager/localStorageManager.js'

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
const typingSpeed = 50; // in milliseconds
let fighting;
let monsterHealth;

// Load game state from local storage if available
const savedGameState = JSON.parse(localStorage.getItem('gameState'));
console.log(savedGameState)

// Define DOM elements
// const xpText = document.querySelector('#xpText');
// const healthText = document.querySelector('#healthText');
// const goldText = document.querySelector('#goldText');
// const monsterStats = document.querySelector('#monsterStats');
// const monsterName = document.querySelector('#monsterName');
// const monsterHealthText = document.querySelector('#monsterHealth');

const {
    xpText,
    healthText,
    goldText,
    monsterStats,
    monsterName,
    monsterHealthText
} = ui.accessDOMElements();

// Array of objects containing the game choices
// const gameLogic.choices = [
//     {name: "start",id: 0,buttons: [{ text: "Go to store", func: goStore },{ text: "Enter the house", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in the town square. You see a sign that says Store."},
//     {name: "enter house",id: 1,buttons: [{ text: "Go back to store", func: goStore },{ text: "Enter next room", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You enter the house and are greeted."},
//     {name: "go cave",id: 2,buttons: [{ text: "Go back to the house", func: enterHouse },{ text: "Go further in the cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in a cave"},   
//     {name: "fighting dragon",id: 3,buttons: [{ text: "You are fighting a dragon", func: inFightWithDragon },{ text: "Give up", func: giveUp },{ text: "Just win", func: justWin }],text: "Behold the mighty dragon!!!"}
// ];

// Array of checkpoint objects
// const gameLogic.checkpoints = [
//     {name: "checkpoint 1",location: 0, inventory: {items: [], keyItems: []}}
// ]

// const gameLogic.hints = [
//     {name: "hint 1", id:1, hint: "You need to make choices and get to the end."}
// ]

let checkpoint = gameLogic.checkpoints[0];
let hint = gameLogic.hints[0];

// Types out text for the page
// Delays rendering buttons until all words are typed out
// function ui.typeText(text) {
//     // Declare variables for DOM elements
//     let textElement, buttonsContainer;

//     try {
//         // Attempt to access DOM elements
//         textElement = document.getElementById('text');
//         buttonsContainer = document.getElementById('controls');
//     } catch (error) {
//         console.error('Error accessing DOM elements:', error);
//     }
    
//     // Function to render buttons dynamically
//     function renderButtons(choice) {
//         let buttonsContainer;
//         try {
//            buttonsContainer = document.getElementById('controls');
//         }
//         catch (error) {
//             console.error('Error accessing DOM elements:', error);
//         }
//         buttonsContainer.innerHTML = ''; // Clear previous buttons

//         // Hide buttons before rendering
//         buttonsContainer.classList.add('hide');

//         // Creates a button for each button in current choice list
//         choice.buttons.forEach((buttonData, index) => {
//             const choiceButton = document.createElement('button');
//             choiceButton.innerText = buttonData.text;
//             choiceButton.onclick = buttonData.func;
//             choiceButton.id = `button${index + 1}`; // Set button id
//             buttonsContainer.appendChild(choiceButton);
//             console.log(choiceButton.id)
//         });

//         // Show buttons after typing animation is complete
//         setTimeout(() => {
//             buttonsContainer.classList.remove('hide');
//         }, choice.text.length); // Adjust timing based on starting text length and typing speed
//     }

//     // Points to next letter
//     function typeNextCharacter() {
//         textElement.textContent += text[gameLogic.currentTextIndex];
//         gameLogic.currentTextIndex++;
//         if (gameLogic.currentTextIndex < text.length) {
//             setTimeout(typeNextCharacter, typingSpeed);
//         } else {
//             // Animation complete, render buttons
//             renderButtons(choices[gameLogic.currentChoiceIndex]);
//         }
//     }

//     // Hide buttons before starting the typing animation
//     buttonsContainer.classList.add('hide');

//     // Start typing animation
//     typeNextCharacter();
// }

// Updates information to be displayed
// function gameLogic.update(choice) {
//     gameLogic.currentTextIndex = 0;
//     let textElement;
//     try {
//         textElement = document.getElementById('text');
//     } catch (error) {
//         console.error('Error accessing DOM elements:', error);
//     }
//     textElement.textContent = ''; // Reset text content
//     typeText(choice.text);
//     monsterStats.style.display = "none";

//     // Loop through all buttons in the location
//     for (let i = 0; i < choice.buttons.length; i++) {
//         const buttonData = choice.buttons[i];
//         const button = document.querySelector(`#button${i + 1}`); // Select button by ID
//         if (button) {
//             // Update button text and function
//             button.innerText = buttonData.text;
//             button.onclick = buttonData.func;
//         }
//     }
// }

// Various functions to update choice. 
// THESE SHOULD BE COMBINED INTO ONE FUNCTION
function goStore() {
    gameLogic.currentChoiceIndex = 0; // Update current location index
    gameLogic.update(gameLogic.choices[gameLogic.currentChoiceIndex]);
    gameLogic.saveGameState();
}

function enterHouse() {
    gameLogic.currentChoiceIndex = 1; // Update current location index
    gameLogic.update(gameLogic.choices[gameLogic.currentChoiceIndex]);
    gameLogic.saveGameState();
}

function goCave() {
    gameLogic.currentChoiceIndex = 2; // Update current location index
    gameLogic.update(gameLogic.choices[gameLogic.currentChoiceIndex]);
    gameLogic.saveGameState();
}

function fightDragon() {
    gameLogic.currentChoiceIndex = 3; // Update current location index
    gameLogic.update(gameLogic.choices[gameLogic.currentChoiceIndex]);
    gameLogic.saveGameState();
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
    gameLogic.update(gameLogic.choices[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function lose() {
    gameLogic.update(gameLogic.choices[5]);
}

function winGame() {
    gameLogic.update(gameLogic.choices[6]);
}
    
// // Save relevant game data to local storage
// function gameLogic.saveGameState() {
//     try {
//         localStorage.setItem('gameState', JSON.stringify({
//             xp: gameLogic.xp,
//             health: gameLogic.health,
//             gold: gameLogic.gold,
//             currentWeapon: gameLogic.currentWeapon,
//             inventory: gameLogic.inventory,
//             currentLocationIndex: choices[currentChoiceIndex].id
//         }));
//     } catch (error) {
//         console.error('Error saving game state:', error);
//     } 
// }

// Toggle menu function
function toggleMenuVisibility() {
    let menuContent;
    try {
       menuContent = document.getElementById('menu');
    } catch (error) {
        console.error('Error saving game state:', error);
    }

    if (menuContent.classList.contains('hide')) {
        menuContent.classList.remove('hide');
    } else {
        menuContent.classList.add('hide');
    }
}

// Resets game to initial state
function restart() {
    const confirmRestart = window.confirm("Are you sure you want to restart the game?");

    // If the player confirms the restart
    if (confirmRestart) {
        // Perform the restart actions
        gameLogic.xp = 0;
        gameLogic.health = 100;
        gameLogic.gold = 50;
        gameLogic.currentWeapon = 0;

        gameLogic.currentChoiceIndex = 0;
        gameLogic.currentTextIndex = 0;

        gameLogic.inventory = ["stick"];
        goldText.innerText = gameLogic.gold;
        healthText.innerText = gameLogic.health;
        xpText.innerText = gameLogic.xp;
        gameLogic.update(gameLogic.choices[gameLogic.currentChoiceIndex]);
        alert('You restarted')
        toggleMenuVisibility();
    } else {
        // If the player cancels, do nothing
    }
} 

// Other functions for menu buttons
function returnToCheckpoint() {
    alert(checkpoint.name);
}

function showHint() {
    alert(hint.hint);
}

// // Load player stats, current location, etc.
// try {
//     if (savedGameState) {
//         gameLogic.xp = savedGameState.xp || 0;
//         gameLogic.health = savedGameState.health || 100;
//         gameLogic.gold = savedGameState.gold || 50;
//         gameLogic.currentWeapon = savedGameState.currentWeapon || 0;
//         gameLogic.inventory = savedGameState.inventory || ["stick"];
//         gameLogic.currentChoiceIndex = savedGameState.currentLocationIndex || 0;
//         console.log(gameLogic.currentChoiceIndex)
//     }
// } catch (error) {
//     console.error('Error initializing game from saved state:', error);
// }

gameLogic.loadGameState();

// IIFE containing game logic
(function() {
    // Will be changed to items later
    const weapons = [
        { name: 'stick', power: 5 },
        { name: 'dagger', power: 30 },
        { name: 'claw hammer', power: 50 },
        { name: 'sword', power: 100 }
    ];
    // May be changed to key items
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
    let menuDiv;
    try {
       menuDiv = document.getElementById('menu-content');
    } catch (error) {
        console.error('Error saving game state:', error);
    }

    menuDiv.appendChild(menuButton);

    // Create menu content div
    const menuContentDiv = document.createElement('div');
    menuContentDiv.setAttribute('id', 'menu-content');

    let openMenuButton;
    try {
      openMenuButton = document.getElementById('open-menu');
    } catch (error) {
        console.error('Error saving game state:', error);
    }

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
  
    // Event listener for the escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            toggleMenuVisibility();
        }
    });

    // Save the game State
    gameLogic.saveGameState();

    // Initial call for current choice information
    gameLogic.update(gameLogic.choices[gameLogic.currentChoiceIndex]);

    // Save game state when leaving the page
    window.addEventListener('beforeunload', gameLogic.saveGameState);

})();
