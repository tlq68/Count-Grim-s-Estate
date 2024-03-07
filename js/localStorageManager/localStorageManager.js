import act1 from "../gameLogic/acts/act1.js";
import act2 from "../gameLogic/acts/act2.js";
import act3 from "../gameLogic/acts/act3.js";
import act4 from "../gameLogic/acts/act4.js";
import act5 from "../gameLogic/acts/act5.js";

const storage = (function() {
    let xp = 10;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let inventory = ['stick'];
    let currentChoiceIndex = 0;
    // Change this logic to be housed in ui.
    let currentTextIndex = 0;
    let currentAct = 1;
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));

        
    const allChoices = [[...act1.getStats().choices], [...act2.getStats().choices]]
    let actNum = 1;

    function getStats() {
        return {
            xp,
            health,
            gold,
            currentWeapon,
            inventory,
            currentChoiceIndex,
            currentTextIndex,
            currentAct
        }
    }
    // Save relevant game data to local storage
    function saveGameState() {
        let currentActData = savedGameState.currentAct;
            let {
                xp,
                health,
                gold,
                currentWeapon,
                inventory,
                currentChoiceIndex,
                choices,
                currentAct
        } = act1.getStats();

        console.log(choices[currentChoiceIndex])
        try {
            console.log('in save')
            console.log(`Current Choice Index: ${currentChoiceIndex}`)
            localStorage.setItem('gameState', JSON.stringify({
                xp: xp,
                health: health,
                gold: gold,
                currentWeapon: currentWeapon,
                inventory: inventory,
                currentLocationIndex: choices[currentChoiceIndex].id,
                currentChoiceIndex: currentChoiceIndex,
                currentAct: currentAct
            }));
        } catch (error) {
            console.error('Error saving game state:', error);
        } 
    }

    function loadGameState() {
        // Load player stats, current location, etc.
        try {
            console.log(`In Load`)
            console.log(`Current Choice Index: ${savedGameState.currentChoiceIndex}`)
            console.log(savedGameState)
            if (savedGameState) {
                console.log('in load')
                xp = savedGameState.xp || 0;
                health = savedGameState.health || 100;
                gold = savedGameState.gold || 50;
                currentWeapon = savedGameState.currentWeapon || 0;
                inventory = savedGameState.inventory || ["stick"];
                currentChoiceIndex = savedGameState.currentChoiceIndex || 0;
                currentAct = savedGameState.currentAct || 1;
                console.log(act1.currentChoiceIndex)
            }
        } catch (error) {
            console.error('Error initializing game from saved state:', error);
        }
    }

    return {
        savedGameState,
        getStats,
        saveGameState,
        loadGameState
    }
})();

export default storage;