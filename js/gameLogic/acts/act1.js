import gameLogic from "../gameLogic.js";
import ui from "../../ui/ui.js";

const act1 = (function() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    let currentChoiceIndex = savedGameState.currentChoiceIndex;
    const currentAct = 1;
    let inventory = []; // Initialize inventory array

    // Array of objects containing the game choices
    const choices = [
        {name: "start", id: 0,buttons: [{ text: "Go to store", func: () => handleChoice(0) },{ text: "Enter the house", func: () => handleChoice(1) },{ text: "Go to cave", func: () => handleChoice(2) },{ text: "Fight dragon", func: () => handleChoice(3) }],text: "You are in the town square. You see a sign that says Store."},
        {name: "enter house",id: 1,buttons: [{ text: "Go back to store", func: () => handleChoice(0) },{ text: "Enter next room", func: () => handleChoice(1) },{ text: "Go to cave", func: () => handleChoice(2) },{ text: "Fight dragon", func: () => handleChoice(3) }],text: "You enter the house and are greeted."},
        {name: "go cave",id: 2,buttons: [{ text: "Go back to the house", func: () => handleChoice(1) },{ text: "Go further in the cave", func: () => handleChoice(2) },{ text: "Fight dragon", func: () => handleChoice(3) }],text: "You are in a cave"},   
        {name: "fighting dragon",id: 3,buttons: [{ text: "You are fighting a dragon", func: inFightWithDragon },{ text: "Give up", func: giveUp },{ text: "Just win", func: justWin }],text: "Behold the mighty dragon!!!"}
    ];

    // Array of checkpoint objects
    const checkpoints = [
        {name: "checkpoint 1",location: 0, inventory: {items: [], keyItems: []}}
    ]

    const hints = [
        {name: "hint 1", id:1, hint: "You need to make choices and get to the end."}
    ]

    function returnToCheckpoint() {
        alert('Checkpoint here');
    }
    function showHint() {
        alert('You need to make choices to progress the story');
    }

    function getStats() {
        return {
            currentAct,
            currentChoiceIndex,
            choices,
            checkpoints,
            hints
        }
    }

    function handleChoice(choiceIndex) {
        currentChoiceIndex = choiceIndex;
        ui.update(choices[currentChoiceIndex]);
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

    // Function to add an item to the inventory
    function addItemToInventory(items) {
        items.forEach(item => {
            if (!inventory.includes(item)) {
                inventory.push(item);
            }
        });
    }

    // Function to remove an item from the inventory
    function removeItemFromInventory(item) {
        inventory = inventory.filter(i => i !== item);
    }

    // Function to handle adding or removing items from inventory based on user input
    function handleInventory(action, items) {
        if (action === 'add') {
            items.forEach(item => {
                addItemToInventory(item);
            });
        } else if (action === 'remove') {
            items.forEach(item => {
                removeItemFromInventory(item);
            });
        }
    }

    const actTest = 'act 1 here'
    return {
        returnToCheckpoint,
        showHint,
        getStats,
        inFightWithDragon,
        giveUp,
        justWin,
        handleInventory, // Expose inventory handling function
        
    }
})();

export default act1;
