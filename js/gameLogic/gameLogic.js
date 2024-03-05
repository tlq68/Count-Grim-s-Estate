import ui from "../ui/ui.js";

const gameLogic = (function() {
    let xp = 10;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let inventory = ['stick'];
    let currentChoiceIndex = 0;
    // Change this logic to be housed in ui.
    let currentTextIndex = 0;
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));

    // Array of objects containing the game choices
    const choices = [
        {name: "start",id: 0,buttons: [{ text: "Go to store", func: goStore },{ text: "Enter the house", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in the town square. You see a sign that says Store."},
        {name: "enter house",id: 1,buttons: [{ text: "Go back to store", func: goStore },{ text: "Enter next room", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You enter the house and are greeted."},
        {name: "go cave",id: 2,buttons: [{ text: "Go back to the house", func: enterHouse },{ text: "Go further in the cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in a cave"},   
        {name: "fighting dragon",id: 3,buttons: [{ text: "You are fighting a dragon", func: inFightWithDragon },{ text: "Give up", func: giveUp },{ text: "Just win", func: justWin }],text: "Behold the mighty dragon!!!"}
    ];

    // Array of checkpoint objects
    const checkpoints = [
        {name: "checkpoint 1",location: 0, inventory: {items: [], keyItems: []}}
    ]

    const hints = [
        {name: "hint 1", id:1, hint: "You need to make choices and get to the end."}
    ]

    let checkpoint = checkpoints[0];
    let hint = hints[0];
    // Various functions to update choice. 
    // THESE SHOULD BE COMBINED INTO ONE FUNCTION
    function goStore() {
        currentChoiceIndex = 0; // Update current location index
        update(choices[currentChoiceIndex]);
        gameLogic.saveGameState();
    }

    function enterHouse() {
        currentChoiceIndex = 1; // Update current location index
        update(choices[currentChoiceIndex]);
        gameLogic.saveGameState();
    }

    function goCave() {
        currentChoiceIndex = 2; // Update current location index
        update(choices[currentChoiceIndex]);
        gameLogic.saveGameState();
    }

    function fightDragon() {
        currentChoiceIndex = 3; // Update current location index
        update(choices[currentChoiceIndex]);
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

    // Save relevant game data to local storage
    function saveGameState() {
        try {
            console.log('in save')
            localStorage.setItem('gameState', JSON.stringify({
                xp: xp,
                health: health,
                gold: gold,
                currentWeapon: currentWeapon,
                inventory: inventory,
                currentLocationIndex: choices[currentChoiceIndex].id,
                currentChoiceIndex: currentChoiceIndex
            }));
        } catch (error) {
            console.error('Error saving game state:', error);
        } 
    }

    function loadGameState() {
        // Load player stats, current location, etc.
        try {
            if (savedGameState) {
                console.log('in load')
                xp = savedGameState.xp || 0;
                health = savedGameState.health || 100;
                gold = savedGameState.gold || 50;
                currentWeapon = savedGameState.currentWeapon || 0;
                inventory = savedGameState.inventory || ["stick"];
                //currentChoiceIndex = savedGameState.currentLocationIndex || 0;
                gameLogic.currentChoiceIndex = savedGameState.currentChoiceIndex || 0;
                console.log(gameLogic.currentChoiceIndex)
            }
        } catch (error) {
            console.error('Error initializing game from saved state:', error);
        }
    }

    // Updates information to be displayed
    function update(choice) {
        currentTextIndex = 0;
        currentChoiceIndex = choice.id;
        console.log(choice.id)
        let textElement;
        try {
            textElement = document.getElementById('text');
        } catch (error) {
            console.error('Error accessing DOM elements:', error);
        }
        textElement.textContent = ''; // Reset text content
        // Move this to ui update
        ui.typeText(choice.text, choice, currentTextIndex);
        monsterStats.style.display = "none";

        // Loop through all buttons in the location
        for (let i = 0; i < choice.buttons.length; i++) {
            const buttonData = choice.buttons[i];
            const button = document.querySelector(`#button${i + 1}`); // Select button by ID
            if (button) {
                // Update button text and function
                button.innerText = buttonData.text;
                button.onclick = buttonData.func;
            }
        }
    }

    // Resets game to initial state
    function restart() {
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
            ui.toggleMenuVisibility();
        } else {
            // If the player cancels, do nothing
        }
    } 

    function returnToCheckpoint() {
        alert(checkpoint.name);
    }
    
    function showHint() {
        alert(hint.hint);
    }

    return {
        xp,
        health,
        gold,
        currentWeapon,
        inventory,
        currentChoiceIndex,
        inventory,
        currentTextIndex,
        choices,
        saveGameState,
        loadGameState,
        update,
        restart,
        returnToCheckpoint,
        showHint
    };
})();

export default gameLogic;
