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
    const alertMessage = `${act1.alertText()} ${act2.alertText()} ${act3.alertText()} ${act4.alertText()} ${act5.alertText()}`;
    alert(alertMessage)
    const startingText = "Welcome? Use the buttons above.";
    const typingSpeed = 50; // in milliseconds
    let textIndex = 0;
    let currentLocationIndex = 0; // Track the current location index

    function typeText(text) {
        const textElement = document.getElementById('text');
        const cursorElement = document.getElementById('cursor');

        function renderButtons(location) {
            const button1 = document.querySelector('#button1');
            const button2 = document.querySelector('#button2');
            const button3 = document.querySelector('#button3');
        
            hideButtons();

            // Set button text and functions
            button1.innerText = location["button text"][0];
            button2.innerText = location["button text"][1];
            button3.innerText = location["button text"][2];
            button1.onclick = location["button functions"][0];
            button2.onclick = location["button functions"][1];
            button3.onclick = location["button functions"][2];
        
            // Show buttons after typing animation is complete
            setTimeout(() => {
                showButtons();
            }, text.length); // Add some extra time for safety
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

        typeNextCharacter();
    }

    const hideButtons = () => {
        button1.classList.add('hide');
        button2.classList.add('hide');
        button3.classList.add('hide');
    }

    const showButtons = () => {
        button1.classList.remove('hide');
        button2.classList.remove('hide');
        button3.classList.remove('hide');
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
            "button text": ["Go to store", "Go to cave", "Fight dragon"],
            "button functions": [goStore, goCave, fightDragon],
            text: "You are in the town square. You see a sign that says Store."
        },
        {
            name: "town square",
            "button text": ["Go to store", "Go to cave", "Fight dragon"],
            "button functions": [goStore, goCave, fightDragon],
            text: "You are in the town square. You see a sign that says Store."
        },
        {
            name: "town square",
            "button text": ["Go to store", "Go to cave", "Fight dragon"],
            "button functions": [goStore, goCave, fightDragon],
            text: "You are in the town square. You see a sign that says Store."
        },
        {
            name: "town square",
            "button text": ["Go to store", "Go to cave", "Fight dragon"],
            "button functions": [goStore, goCave, fightDragon],
            text: "Behold the mighty dragon!!!"
        },
    ];

    // Initialize buttons
    button1.onclick = goStore;
    button2.onclick = goCave;
    button3.onclick = fightDragon;

    function update(location) {
        textIndex = 0;
        const textElement = document.getElementById('text');
        textElement.textContent = ''; // Reset text content
        typeText(location.text);
        monsterStats.style.display = "none";
        button1.innerText = location["button text"][0];
        button2.innerText = location["button text"][1];
        button3.innerText = location["button text"][2];
        button1.onclick = location["button functions"][0];
        button2.onclick = location["button functions"][1];
        button3.onclick = location["button functions"][2];
    }

    function goStore() {
        hideButtons();
        currentLocationIndex = 1; // Update current location index
        update(locations[currentLocationIndex]);
    }

    function goCave() {
        hideButtons();
        currentLocationIndex = 2; // Update current location index
        update(locations[currentLocationIndex]);
    }

    function fightDragon() {
        hideButtons();
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