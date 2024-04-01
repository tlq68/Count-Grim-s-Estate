import gameLogic from "../gameLogic.js";
import ui from "../../ui/ui.js";

const act1 = (function() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    let currentChoiceIndex = 0;
    if (savedGameState && typeof savedGameState.currentChoiceIndex === 'number') {
        currentChoiceIndex = savedGameState.currentChoiceIndex;
    } else {
        console.warn('Invalid or missing currentChoiceIndex in savedGameState. Using default value.');
    }
    
    const currentAct = 1;
    let inventory = []; // Initialize inventory array

    // Array of objects containing the game choices
    const choices = [
        // 0 - Starting choices
        // OUTSIDE 1 // Inspect the house**; Knock on the door **; Sneak in **; Break down the door **
        {name: "start", id: 0,buttons: [{ text: "Inspect the house", func: () => handleChoice(1) },{ text: "Knock on the door", func: () => handleChoice(2) },{ text: "Sneak in", func: () => handleChoice(3) },{ text: "Break down the door", func: () => handleChoice(4) }],
        text: 
        "As Rupert Evers approaches the sign, his tall, shadowy figure casts elongated silhouettes upon the ground, blending with the encroaching dusk.~-CONT- \"Welcome to the haunted mansion, where darkness lurks behind every corner and secrets whisper through the halls,\" the sign declares ominously. \n\tHe scoffs internally at the notion of a haunted mansion, dismissing it as nothing more than a fantastical tale spun to frighten the gullible. After all, Rupert doesn't believe in the supernatural. Yet, despite his rational skepticism, there's an undeniable pull, a magnetic force that draws him closer to the sign despite his reservations. The mansion itself looms over him like a brooding sentinel, its once-grand facade now weathered by the passage of time and neglect. It seems alive with stories untold, each window a watchful eye casting silent judgment upon those who dare to trespass. Darkness seeps from the mansion's very pores, an oppressive weight that hangs heavy in the air, causing Rupert to shiver involuntarily. Despite himself, however, he feels a thrill of anticipation tingling in his veins. Perhaps it's the challenge of unraveling the mysteries within, or maybe it's just sheer curiosity that has brought him to this place. Whatever the reason, Rupert finds himself inexorably drawn to the foreboding entrance of the mansion, his steps guided by an insatiable desire to confront whatever lies beyond its shadowy threshold.."
        },
        
        // 1 - Inspect the house * --> The player may see a totem and choose to grab it. It will have consequences depending on when the player reveals the totem. 
        // OUTSIDE 1 // Look closer; Knock on the door; Sneak in; Break down door
        {name: "inspect house",id: 1,buttons: [{ text: "Look closer", func: () => handleChoice(5) },{ text: "Knock on the door", func: () => handleChoice(2) },{ text: "Sneak in", func: () => handleChoice(3) },{ text: "Break down door", func: () => handleChoice(4) }],
        text: 
        "Rupert takes a cautious step closer to the mansion, his eyes scanning its decrepit exterior with keen interest. He observes the cracked windows, the overgrown ivy creeping up the walls, and the eerie stillness that hangs in the air like a heavy veil. As he examines the surroundings, he notices a faint flicker of light coming from one of the upper windows, igniting a spark of curiosity within him. Could there be someone or something inside the mansion after all? With newfound determination, Rupert decides to investigate further, searching for any clues that might reveal the truth behind the haunted facade."
        },
        
        // 2 - Knock on the door* --> The player is greeted by Butler, Eleanor and Vincent
        // FOYER 1 // Ask to see Count Grimm's room; Explore Dining Room; Explore Living Room
        {name: "knock on door",id: 2,buttons: [{ text: "Ask to see Count Grimm's room", func: () => handleChoice(1) },{ text: "Explore Dining Room", func: () => handleChoice(2) },{ text: "Explore Living Room", func: () => handleChoice(3) }],
        text: 
        "With a mixture of trepidation and skepticism, Rupert approaches the imposing wooden door of the mansion. His knuckles rap against the weathered surface, the sound echoing eerily through the silence. For a moment, there is no response, only the haunting creak of old wood in the stillness of the night. Just as Rupert begins to doubt his actions, the door creaks open slowly, revealing a dimly lit foyer beyond. A chill runs down his spine as he hesitates, unsure of what awaits him on the other side. Should he venture inside and confront the mysteries within, or retreat from the unknown?."
        },   
        
        // 3 - Sneak in ** 
        // OUTSIDE 1 // Nevermind: Choose the polite route; Open window; Climb over wall
        {name: "sneak in",id: 3,buttons: [{ text: "Nevermind: Choose the polite route", func: inFightWithDragon },{ text: "Open Window", func: giveUp },{ text: "Climb over wall", func: justWin }],
        text: 
        "Rupert cautiously surveys the mansion's exterior, searching for a stealthy way to gain entry without alerting any potential occupants. His eyes narrow as he spots two possible avenues: an open window on the ground floor and a climbable section of the wall obscured by dense ivy. Each option carries its own risks and rewards, leaving Rupert to weigh his choices carefully.."
        },
        
        // 4 - Break the door down** --> The player can choose to force their way in by yelling or try to break the door down, which will fail
        // OUTSIDE 1 // Nevermind: Choose the polite route**; Yell to be let in**; kick the door down**
        {name: "break down door",id: 4,buttons: [{ text: "Nevermind: Choose the polite route", func: inFightWithDragon },{ text: "yell", func: giveUp },{ text: "kick door down", func: justWin }],
        text: 
        "Rupert stands before the imposing door of Grimm's Estate, his resolve wavering as he contemplates his next move. The allure of the secrets hidden within the mansion's walls tempts him to take drastic action. With determination brewing within him, he considers his options carefully, weighing the consequences of his actions against the potential rewards.."
        },

        // 5 - Look closer *
        // OUTSIDE 1 // Grab totem; Knock on the door; Sneak in; Break down door
        {name: "look closer",id: 5,buttons: [{ text: "Grab totem", func: inFightWithDragon },{ text: "Knock on the door", func: giveUp },{ text: "sneak in", func: justWin }, { text: "break down door", func: justWin }],
        text: 
        "As Rupert's gaze sweeps over the aged facade of the mansion, something catches his attention—an area of the wood that appears strangely pristine amidst the decay surrounding it. Intrigued, he steps closer, his footsteps muffled by the overgrown grass underfoot. The wood in question seems almost out of place, its surface smooth and untouched by time or weather. A sense of unease washes over Rupert as he examines the anomaly. It's as if this particular section of the mansion is trying to hide something, a secret concealed beneath its seemingly perfect exterior. The hairs on the back of his neck prickle, a subtle warning that there's more to this discovery than meets the eye. With a mixture of curiosity and caution, Rupert reaches out to touch the suspiciously flawless wood, half expecting it to give way like a facade in a stage play, revealing the true nature of what lies beneath. His fingers linger on the surface, hesitating before making contact, unsure of what he might uncover with this seemingly innocuous gesture. Should he delve deeper into this mystery, risking what truths may be lurking beneath the surface? Or is it wiser to step back and continue his exploration of the mansion through more conventional means? The choice weighs heavy on Rupert's mind as he stands at the precipice of a potentially life-altering revelation.."
        },

        // 6 - Nevermind: Choose the polite route --> The player is redirected to the polite options.
        // OUTSIDE 1 // Knock on door; Actually, I wil break in
        {name: "choose polite route",id: 6,buttons: [{ text: "Knock on door", func: inFightWithDragon },{ text: "Actually, I will break in", func: giveUp }],
        text: 
        "Rupert hesitates, reconsidering his initial impulse to forcefully enter the mansion. Instead, he opts for a more diplomatic approach. He clears his throat and calls out, \"Is anyone there? I mean no harm, I simply seek information.\" No answer.."
        },

        // 7 - Open Window --> The player tries to open the window, but they fail.
        // OUTSIDE 1 // Choose polite route, Force window open, choose another forceful route

        // 8 - Climb over wall --> The player tries to climb over the wall to the estate, but it is too slippery and the player falls. 
        // OUTSIDE 1 //    
            
        // 9 - Yell --> 
        // OUTSIDE 1 //
        
        // 10 - Kick door down
        // OUTSIDE 1 //
        
        // 11 - Grab totem --> 
        // OUTSIDE 1 //
        
        // 12 - Actually, I will break in -->
        // OUTSIDE 1 //
        
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
