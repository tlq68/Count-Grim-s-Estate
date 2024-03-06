import act1 from "../gameLogic/acts/act1.js";

const storage = (function() {
    let xp = 10;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let inventory = ['stick'];
    let currentChoiceIndex = 0;
    // Change this logic to be housed in ui.
    let currentTextIndex = 0;
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));

    function getStats() {
        return {
            xp,
            health,
            gold,
            currentWeapon,
            inventory,
            currentChoiceIndex,
            currentTextIndex,
        }
    }
    // Save relevant game data to local storage
    function saveGameState() {
            let {
                xp,
                health,
                gold,
                currentWeapon,
                inventory,
                currentChoiceIndex,
                choices,
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
                currentChoiceIndex: currentChoiceIndex
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
                //currentChoiceIndex = savedGameState.currentLocationIndex || 0;
                currentChoiceIndex = savedGameState.currentChoiceIndex || 0;
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