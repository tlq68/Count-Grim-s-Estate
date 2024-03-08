import gameLogic from "../gameLogic.js";
import ui from "../../ui/ui.js";

const act1 = (function() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    let currentChoiceIndex = savedGameState.currentChoiceIndex;
    const currentAct = 1;
    let inventory = []; // Initialize inventory array

    // Array of objects containing the game choices
    const choices = [
        // Starting choices
        {name: "start", id: 0,buttons: [{ text: "Go to store", func: () => handleChoice(0) },{ text: "Enter the house", func: () => handleChoice(1) },{ text: "Go to cave", func: () => handleChoice(2) },{ text: "Fight dragon", func: () => handleChoice(3) }],
        text: "As Rupert Evers approaches the sign, his tall, shadowy figure casts elongated silhouettes upon the ground, blending with the encroaching dusk. \"Welcome to the haunted mansion, where darkness lurks behind every corner and secrets whisper through the halls,\" the sign declares ominously. He scoffs internally at the notion of a haunted mansion, dismissing it as nothing more than a fantastical tale spun to frighten the gullible. After all, Rupert doesn't believe in the supernatural. Yet, despite his rational skepticism, there's an undeniable pull, a magnetic force that draws him closer to the sign despite his reservations. The mansion itself looms over him like a brooding sentinel, its once-grand facade now weathered by the passage of time and neglect. It seems alive with stories untold, each window a watchful eye casting silent judgment upon those who dare to trespass. Darkness seeps from the mansion's very pores, an oppressive weight that hangs heavy in the air, causing Rupert to shiver involuntarily. Despite himself, however, he feels a thrill of anticipation tingling in his veins. Perhaps it's the challenge of unraveling the mysteries within, or maybe it's just sheer curiosity that has brought him to this place. Whatever the reason, Rupert finds himself inexorably drawn to the foreboding entrance of the mansion, his steps guided by an insatiable desire to confront whatever lies beyond its shadowy threshold."},
        
        {name: "enter house",id: 1,buttons: [{ text: "Go back to store", func: () => handleChoice(0) },{ text: "Enter next room", func: () => handleChoice(1) },{ text: "Go to cave", func: () => handleChoice(2) },{ text: "Fight dragon", func: () => handleChoice(3) }],
        text: "You enter the house and are greeted."},
        {name: "go cave",id: 2,buttons: [{ text: "Go back to the house", func: () => handleChoice(1) },{ text: "Go further in the cave", func: () => handleChoice(2) },{ text: "Fight dragon", func: () => handleChoice(3) }],
        text: "You are in a cave"},   
        {name: "fighting dragon",id: 3,buttons: [{ text: "You are fighting a dragon", func: inFightWithDragon },{ text: "Give up", func: giveUp },{ text: "Just win", func: justWin }],
        text: "Behold the mighty dragon!!!"}
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
        handleInventory, 
    }
})();

export default act1;
