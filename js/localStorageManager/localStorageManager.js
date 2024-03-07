import act1 from "../gameLogic/acts/act1.js";
import act2 from "../gameLogic/acts/act2.js";
import act3 from "../gameLogic/acts/act3.js";
import act4 from "../gameLogic/acts/act4.js";
import act5 from "../gameLogic/acts/act5.js";
import ui from "../ui/ui.js";

const storage = (function() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    
    let xp = 10;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let inventory = ['stick'];
    let currentChoiceIndex = 0;
    let currentTextIndex = 0;
    let currentAct = 2; // Default to Act 1

    getStats();

    function getCurrentActStats() {
        console.log('in switch')
        console.log(currentAct)
        switch (currentAct) {
            case 1:
                console.log('Act 1 choices')
                return act1.getStats();
            case 2:
                console.log('Act 2 choices')
                return act2.getStats();
            case 3:
                return act3.getStats();
            case 4:
                return act4.getStats();
            case 5:
                return act5.getStats();
            default:
                return [];
        }
    }

    function getStats() {
        console.log('In getStats')
        console.log(currentAct)
        return {
            xp,
            health,
            gold,
            currentWeapon,
            inventory,
            currentChoiceIndex: getCurrentActStats().currentChoiceIndex,
            currentTextIndex,
            currentAct: getCurrentActStats().currentAct,
            choices: getCurrentActStats().choices
        };
    }

    function saveGameState() {

        // WE NEED TO USE THE GET CURRENT ACT GETSTATS HERE
        let {
            xp,
            health,
            gold,
            currentWeapon,
            inventory,
            currentChoiceIndex,
            currentTextIndex,
            currentAct,
            choices
        } = getStats();

        try {
            console.log('IN save game')
            console.log(currentAct)
            localStorage.setItem('gameState', JSON.stringify({
                xp,
                health,
                gold,
                currentWeapon,
                inventory,
                currentChoiceIndex,
                currentAct,
                choices
            }));
            console.log('currentAct')
            console.log(currentAct)
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    }

    function loadGameState() {
        console.log('In loadgame')
        console.log(currentAct)
        try {
            if (savedGameState) {
                xp = savedGameState.xp || 0;
                health = savedGameState.health || 100;
                gold = savedGameState.gold || 50;
                currentWeapon = savedGameState.currentWeapon || 0;
                inventory = savedGameState.inventory || ['stick'];
                currentChoiceIndex = savedGameState.currentChoiceIndex || 0;
                currentAct = savedGameState.currentAct || 1; // Default to Act 1 if not found
            }
        } catch (error) {
            console.error('Error initializing game from saved state:', error);
        }
    }

    // Resets game to initial state
    function restartGame() {
        const confirmRestart = window.confirm("Are you sure you want to restart the game?");
        // let {
        //     xp,
        //     health,
        //     gold,
        //     currentWeapon,
        //     currentChoiceIndex,
        //     currentTextIndex,
        //     inventory,
        //     choices,
        //     currentAct
        // } = getStats();

        let choices = getCurrentActStats().choices;

        // If the player confirms the restart
        if (confirmRestart) {
            // Perform the restart actions
            xp = 0;
            health = 100;
            gold = 50;
            currentWeapon = 0;

            currentChoiceIndex = 0;
            currentTextIndex = 0;
            currentAct = 1;

            inventory = ["stick"];
            goldText.innerText = gold;
            healthText.innerText = health;
            xpText.innerText = xp;
            choices = getCurrentActStats().choices;

            ui.update(choices[currentChoiceIndex]);
            alert('You restarted')
            ui.toggleMenuVisibility();
        } else {
            // If the player cancels, do nothing
        }

        saveGameState();
    } 

    return {
        savedGameState,
        getStats,
        saveGameState,
        loadGameState,
        restartGame
    };
})();

export default storage;
