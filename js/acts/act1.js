import gameLogic from "../gameLogic/gameLogic.js";

const act1 = (function() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    let currentChoiceIndex = savedGameState.currentChoiceIndex;
    
    // Array of objects containing the game choices
    const choices = [
        {name: "start",id: 0,buttons: [{ text: "Go to store", func: goStore },{ text: "Enter the house", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in the town square. You see a sign that says Store."},
        {name: "enter house",id: 1,buttons: [{ text: "Go back to store", func: goStore },{ text: "Enter next room", func: enterHouse },{ text: "Go to cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You enter the house and are greeted."},
        {name: "go cave",id: 2,buttons: [{ text: "Go back to the house", func: enterHouse },{ text: "Go further in the cave", func: goCave },{ text: "Fight dragon", func: fightDragon }],text: "You are in a cave"},   
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
    function goStore() {
        currentChoiceIndex = 0; // Update current location index
        gameLogic.update(choices[currentChoiceIndex]);
    }

    function enterHouse() {
        currentChoiceIndex = 1; // Update current location index
        gameLogic.update(choices[currentChoiceIndex]);
    }

    function goCave() {
        currentChoiceIndex = 2; // Update current location index
        gameLogic.update(choices[currentChoiceIndex]);
    }

    function fightDragon() {
        currentChoiceIndex = 3; // Update current location index
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

    return {
        getStats,
        goStore,
        enterHouse,
        goCave,
        fightDragon,
        inFightWithDragon,
        giveUp,
        justWin
    }
})();

export default act1;