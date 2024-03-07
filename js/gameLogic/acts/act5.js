import gameLogic from "../gameLogic.js";

const act5 = (function() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    let currentChoiceIndex = savedGameState.currentChoiceIndex;
    
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

    function getStats() {
        return {
            currentChoiceIndex,
            choices,
            checkpoints,
            hints
        }
    }

        // Various functions to update choice. 
    // THESE SHOULD BE COMBINED INTO ONE FUNCTION
   
    function handleChoice(choiceIndex) {
        currentChoiceIndex = choiceIndex;
        gameLogic.update(choices[currentChoiceIndex]);
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

    const actTest = 'act 1 here'
    return {
        getStats,
        inFightWithDragon,
        giveUp,
        justWin,
        actTest
    }
})();

export default act5;