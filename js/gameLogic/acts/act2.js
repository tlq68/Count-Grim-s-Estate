import gameLogic from "../gameLogic.js";
import ui
 from "../../ui/ui.js";
const act2 = (function() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    let currentChoiceIndex = savedGameState.currentChoiceIndex;
    
    // Array of objects containing the game choices
    const choices = [
        {name: "start", id: 0,buttons: [{ text: "act2Go to store", func: () => handleChoice(0) },{ text: "act2Enter the house", func: () => handleChoice(1) },{ text: "act2Go to cave", func: () => handleChoice(2) },{ text: "act2Fight dragon", func: () => handleChoice(3) }],text: "act2You are in the town square. You see a sign that says Store."},
        {name: "enter house",id: 1,buttons: [{ text: "act2Go back to store", func: () => handleChoice(0) },{ text: "act2Enter next room", func: () => handleChoice(1) },{ text: "act2Go to cave", func: () => handleChoice(2) },{ text: "act2Fight dragon", func: () => handleChoice(3) }],text: "act2You enter the house and are greeted."},
        {name: "go cave",id: 2,buttons: [{ text: "act2Go back to the house", func: () => handleChoice(1) },{ text: "act2Go further in the cave", func: () => handleChoice(2) },{ text: "act2Fight dragon", func: () => handleChoice(3) }],text: "act2You are in a cave"},   
        {name: "fighting dragon",id: 3,buttons: [{ text: "act2You are fighting a dragon", func: inFightWithDragon },{ text: "act2Give up", func: giveUp },{ text: "act2Just win", func: justWin }],text: "act2Behold the mighty dragon!!!"}
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

    const actTest = 'act 1 here'
    return {
        getStats,
        inFightWithDragon,
        giveUp,
        justWin,
        actTest
    }
})();

export default act2;