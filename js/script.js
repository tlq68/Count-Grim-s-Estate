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

    let {
        restartButton,
        checkpointButton,
        hintButton
    } = ui.createMenu();

    // Event listeners located here for convenience
    restartButton.addEventListener('click', gameLogic.restart);
    checkpointButton.addEventListener('click', gameLogic.returnToCheckpoint);
    hintButton.addEventListener('click', gameLogic.showHint);

    // Save the game State
    gameLogic.saveGameState();

    // Initial call for current choice information
    gameLogic.update(gameLogic.choices[gameLogic.currentChoiceIndex]);

    // Save game state when leaving the page
    window.addEventListener('beforeunload', gameLogic.saveGameState);

})();
