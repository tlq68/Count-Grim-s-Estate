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

(function() {
    const startingText = "Welcome? Use the buttons above.";
    const typingSpeed = 50; // in milliseconds
    let textIndex = 0;
    let currentLocationIndex = 0; // Track the current location index

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

    // Call typeText function with starting text
    typeText(startingText);

    let xp = 0;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let fighting;
    let monsterHealth;
    let inventory = ['stick'];

    const button1 = document.querySelector('#button1');
    const button2 = document.querySelector('#button2');
    const button3 = document.querySelector('#button3');
    const text = document.querySelector('#text');
    const xpText = document.querySelector('#xpText');
    const healthText = document.querySelector('#healthText');
    const goldText = document.querySelector('#goldText');
    const monsterStats = document.querySelector('#monsterStats');
    const monsterName = document.querySelector('#monsterName');
    const monsterHealthText = document.querySelector('#monsterHealth');
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
    const locations = [
        {
            name: "town square",
            buttons: [
                { text: "Go to store", func: goStore },
                { text: "Go to store", func: goStore },
                { text: "Go to cave", func: goCave },
                { text: "Fight dragon", func: fightDragon }
            ],
            text: "You are in the town square. You see a sign that says Store."
        },
        {
            name: "town square",
            buttons: [
                { text: "Go to store", func: goStore },
                { text: "Go to store", func: goStore },
                { text: "Go to cave", func: goCave },
                { text: "Fight dragon", func: fightDragon }
            ],
            text: "You are in the town square. You see a sign that says Store."
        },
        {
            name: "town square",
            buttons: [
                { text: "Go to store", func: goStore },
                { text: "Go to cave", func: goCave },
                { text: "Fight dragon", func: fightDragon }
            ],
            text: "You are in the town square. You see a sign that says Store."
        },
        {
            name: "town square",
            buttons: [
                { text: "Go to store", func: goStore },
                { text: "Go to cave", func: goCave },
                { text: "Fight dragon", func: fightDragon }
            ],
            text: "Behold the mighty dragon!!!"
        }
    ];

    // Function to update the UI with the given location
    function update(location) {
        textIndex = 0;
        const textElement = document.getElementById('text');
        textElement.textContent = ''; // Reset text content
        typeText(location.text);
        monsterStats.style.display = "none";

        // Set button text and functions
        button1.innerText = location.buttons[0].text;
        button2.innerText = location.buttons[1].text;
        button3.innerText = location.buttons[2].text;
        button1.onclick = location.buttons[0].func;
        button2.onclick = location.buttons[1].func;
        button3.onclick = location.buttons[2].func;
    }

    // Function to render buttons dynamically
    function renderButtons(location) {
        const buttonsContainer = document.getElementById('controls');
        buttonsContainer.innerHTML = ''; // Clear previous buttons

        location.buttons.forEach((buttonData, index) => {
            const button = document.createElement('button');
            button.innerText = buttonData.text;
            button.onclick = buttonData.func;
            button.id = `button${index + 1}`; // Set button id
            buttonsContainer.classList.add('hide');
            buttonsContainer.appendChild(button);
        });

        // Show buttons after typing animation is complete
        setTimeout(() => {
            buttonsContainer.classList.remove('hide');
        }, text.length); // Add some extra time for safety
    }

    function goStore() {
        currentLocationIndex = 1; // Update current location index
        update(locations[currentLocationIndex]);
    }

    function goCave() {
        currentLocationIndex = 2; // Update current location index
        update(locations[currentLocationIndex]);
    }

    function fightDragon() {
        currentLocationIndex = 3; // Update current location index
        update(locations[currentLocationIndex]);
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

    function restart() {
        xp = 0;
        health = 100;
        gold = 50;
        currentWeapon = 0;
        inventory = ["stick"];
        goldText.innerText = gold;
        healthText.innerText = health;
        xpText.innerText = xp;
        goTown();
    }
})();