import ui from "../ui/ui.js";
import storage from "../localStorageManager/localStorageManager.js";

const gameLogic = (function() {
    let currentTextIndex = 0;
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

    // function loadGameState() {
    //     // Load player stats, current location, etc.
    //     try {
    //         if (savedGameState) {
    //             console.log('in load')
    //             xp = savedGameState.xp || 0;
    //             health = savedGameState.health || 100;
    //             gold = savedGameState.gold || 50;
    //             currentWeapon = savedGameState.currentWeapon || 0;
    //             inventory = savedGameState.inventory || ["stick"];
    //             //currentChoiceIndex = savedGameState.currentLocationIndex || 0;
    //             gameLogic.currentChoiceIndex = savedGameState.currentChoiceIndex || 0;
    //             console.log(gameLogic.currentChoiceIndex)
    //         }
    //     } catch (error) {
    //         console.error('Error initializing game from saved state:', error);
    //     }
    // }

    // Updates information to be displayed
    function update(choice) {
        currentTextIndex = 0;
        let currentChoiceIndex = choice.id;
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
        storage.saveGameState();
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
        update,
        restart,
        returnToCheckpoint,
        showHint
    };
})();

export default gameLogic;
