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
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let inventory = ['stick'];
let fighting;
let monsterHealth;

// Define DOM elements
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

const locations = [
    {name: "start",id: 0,buttons: [{ text: "Go to store", func: goStore },{ text: "Enter the house", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in the town square. You see a sign that says Store."},
    {name: "enter house",id: 1,buttons: [{ text: "Go back to store", func: goStore },{ text: "Enter next room", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You enter the house and are greeted."},
    {name: "go cave",id: 2,buttons: [{ text: "Go back to the house", func: enterHouse },{ text: "Go further in the cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in a cave"},   
    {name: "fighting dragon",id: 3,buttons: [{ text: "You are fighting a dragon", func: inFightWithDragon },{ text: "Give up", func: giveUp },{ text: "Just win", func: justWin }],text: "Behold the mighty dragon!!!"}
];

(function() {
    alert("Don't forget to reorganize code and do tests. Check GPT for game saving setup.")
    const startingText = "Welcome? Use the buttons above.";
    const typingSpeed = 50; // in milliseconds
    let textIndex = 0;
    let currentLocationIndex = saveGameState.currentLocationIndex || 0; // Track the current location index
    
    function typeText(text) {
        const textElement = document.getElementById('text');
        const cursorElement = document.getElementById('cursor');
        const buttonsContainer = document.getElementById('controls'); // Get buttons container
    
        
        // Function to render buttons dynamically
        function renderButtons(location) {
            const buttonsContainer = document.getElementById('controls');
            buttonsContainer.innerHTML = ''; // Clear previous buttons

            // Hide buttons before rendering
            buttonsContainer.classList.add('hide');

            location.buttons.forEach((buttonData, index) => {
                const button = document.createElement('button');
                button.innerText = buttonData.text;
                button.onclick = buttonData.func;
                button.id = `button${index + 1}`; // Set button id
                buttonsContainer.appendChild(button);
                console.log(button.id)
            });

            // Show buttons after typing animation is complete
            setTimeout(() => {
                buttonsContainer.classList.remove('hide');
            }, location.text.length); // Adjust timing based on starting text length and typing speed
        }
    
        function typeNextCharacter() {
            textElement.textContent += text[textIndex];
            textIndex++;
            if (textIndex < text.length) {
                setTimeout(typeNextCharacter, typingSpeed);
            } else {
                // Animation complete, render buttons
                renderButtons(locations[currentLocationIndex]);
            }
        }
    
        // Hide buttons before starting the typing animation
        buttonsContainer.classList.add('hide');
    
        // Start typing animation
        typeNextCharacter();
    }

    // Load game state from local storage if available
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    if (savedGameState) {
        // Load player stats, current location, etc.
        xp = savedGameState.xp || 0;
        health = savedGameState.health || 100;
        gold = savedGameState.gold || 50;
        currentWeapon = savedGameState.currentWeapon || 0;
        inventory = savedGameState.inventory || ["stick"];
        currentLocationIndex = savedGameState.currentLocationIndex || 0;
    }

    function saveGameState() {
        // Save relevant game data to local storage
        localStorage.setItem('gameState', JSON.stringify({
            xp: xp,
            health: health,
            gold: gold,
            currentWeapon: currentWeapon,
            inventory: inventory,
            currentLocationIndex: locations[currentLocationIndex].id
        }));
    }

   
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
    
    function update(location) {
        textIndex = 0;
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
        currentLocationIndex = 0; // Update current location index
        update(locations[currentLocationIndex]);
        saveGameState();
    }

    function enterHouse() {
        currentLocationIndex = 1; // Update current location index
        update(locations[currentLocationIndex]);
        saveGameState();
    }

    function goCave() {
        currentLocationIndex = 2; // Update current location index
        update(locations[currentLocationIndex]);
        saveGameState();
    }

    function fightDragon() {
        currentLocationIndex = 3; // Update current location index
        update(locations[currentLocationIndex]);
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
        update(locations[3]);
        monsterHealth = monsters[fighting].health;
        monsterStats.style.display = "block";
        monsterName.innerText = monsters[fighting].name;
        monsterHealthText.innerText = monsterHealth;
    }

    function lose() {
        update(locations[5]);
    }

    function winGame() {
        update(locations[6]);
    }

    // Create menu button
const menuButton = document.createElement('button');
menuButton.setAttribute('id', 'menu-button');
menuButton.textContent = 'Close Menu';
menuButton.addEventListener('click', toggleMenu);

// Append menu button to the menu div
const menuDiv = document.getElementById('menu-content');
menuDiv.appendChild(menuButton);

// Create menu content div
const menuContentDiv = document.createElement('div');
menuContentDiv.setAttribute('id', 'menu-content');

const openMenuButton = document.getElementById('open-menu');
openMenuButton.addEventListener('click', toggleMenu);

// Create buttons for the menu content
const quitButton = document.createElement('button');
quitButton.textContent = 'Restart Game';
quitButton.addEventListener('click', restartGame);

const checkpointButton = document.createElement('button');
checkpointButton.textContent = 'Return to Checkpoint';
checkpointButton.addEventListener('click', returnToCheckpoint);

const hintButton = document.createElement('button');
hintButton.textContent = 'Hint';
hintButton.addEventListener('click', showHint);

// Append buttons to the menu content div
menuContentDiv.appendChild(quitButton);
menuContentDiv.appendChild(checkpointButton);
menuContentDiv.appendChild(hintButton);

// Append menu content div to the menu div
menuDiv.appendChild(menuContentDiv);

// Toggle menu function
function toggleMenu() {
    const menuContent = document.getElementById('menu');
    if (menuContent.classList.contains('hide')) {
        menuContent.classList.remove('hide');
    } else {
        menuContent.classList.add('hide');

    }
}

// Example functions for menu buttons
function restartGame() {
    restart();
    update(locations[currentLocationIndex]);
    alert('You restarted')
}

function returnToCheckpoint() {
    alert('Return to Checkpoint');
}

function showHint() {
    alert('Show Hint');
}
  
    // Event listener for the escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            toggleMenu();
        }
    });

    function restart() {
        // Display a confirmation dialog
        const confirmRestart = window.confirm("Are you sure you want to restart the game?");
    
        // If the player confirms the restart
        alert(confirmRestart)
        if (confirmRestart) {
            // Perform the restart actions
            xp = 0;
            health = 100;
            gold = 50;
            currentWeapon = 0;

            currentLocationIndex = 0;
            textIndex = 0;

            inventory = ["stick"];
            goldText.innerText = gold;
            healthText.innerText = health;
            xpText.innerText = xp;
            toggleMenu();
        } else {
            // If the player cancels, do nothing
        }
    }    

    // Save the game State
    saveGameState();

    // Call typeText function with starting text
    //typeText(startingText);

    //alert(currentLocationIndex)
    // Go to the starting location
    console.log(locations[currentLocationIndex])
    update(locations[currentLocationIndex]);

    // Save game state when leaving the page
    window.addEventListener('beforeunload', saveGameState);

    // Call typeText function with startingText
    //typeText(startingText);
})();