import ui from "../ui/ui.js";
import storage from "../localStorageManager/localStorageManager.js";
function testingMocha() {
    return 'test'
}
const gameLogic = (function() {
    let currentTextIndex = 0;

   

    // Updates information to be displayed
    function update(choice) {
        currentTextIndex = 0;
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
        testingMocha,
        update,
        restart,
        returnToCheckpoint,
        showHint
    };
})();

export default gameLogic;
