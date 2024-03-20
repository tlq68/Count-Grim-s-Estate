/* ui.js */
// Helper function to split a string into chunks based on max length
function chunkString(str, maxLength) {
    const chunks = [];
    for (let i = 0; i < str.length; i += maxLength) {
        chunks.push(str.slice(i, i + maxLength));
    }
    return chunks;
        }

const MAX_INPUT_CHARS_LENGTH = 50;

// Function to split a long string into smaller chunks
function splitString(inputString, maxChars) {
const chunks = chunkString(inputString, maxChars);
const result = [];

for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (i === 0) {
        result.push(chunk);
    } else {
        let lastDotIndex = chunk.lastIndexOf('. ');
        if (lastDotIndex !== -1) {
            result[result.length - 1] += chunk.substring(0, lastDotIndex + 2);
            result.push(chunk.substring(lastDotIndex + 2));
        } else {
            result[result.length - 1] += chunk;
        }
    }
}

return result;
}

const ui = (function () {
    // typingSpeed will be adjusted for dynamic effects later
    // Define the typing speed variables
    let normalTypingSpeed = 50; // milliseconds per character
    let fastTypingSpeed = 5; // milliseconds per character
    let typingSpeed = normalTypingSpeed; // Set initial typing speed to normal

    let currentTextIndex = 0;

    let menuOpen = false;

    function accessDOMElements() {
        const xpText = document.querySelector('#xpText');
        const healthText = document.querySelector('#healthText');
        const goldText = document.querySelector('#goldText');
        const monsterStats = document.querySelector('#monsterStats');
        const monsterName = document.querySelector('#monsterName');
        const monsterHealthText = document.querySelector('#monsterHealth');

        // Return an object containing all the accessed DOM elements
        return {
            xpText,
            healthText,
            goldText,
            monsterStats,
            monsterName,
            monsterHealthText
        };
    }

    // Creates pause menu
    function createMenu() {
        // Create menu button
        const menuButton = document.createElement('button');
        menuButton.setAttribute('id', 'menu-button');
        menuButton.textContent = 'Close Menu';
        menuButton.addEventListener('click', toggleMenuVisibility);
        
        // Append menu button to the menu div
        let menuDiv;
        try {
        menuDiv = document.getElementById('menu-content');
        } catch (error) {
            console.error('Error saving game state:', error);
        }

        menuDiv.appendChild(menuButton);

        // Create menu content div
        const menuContentDiv = document.createElement('div');
        menuContentDiv.setAttribute('id', 'menu-content');

        let openMenuButton;
        try {
        openMenuButton = document.getElementById('open-menu');
        } catch (error) {
            console.error('Error saving game state:', error);
        }

        // Event Listener for Open Menu Button
        openMenuButton.addEventListener('click', toggleMenuVisibility);

        // Create buttons for the menu content
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Game';
        // restartButton.addEventListener('click', gameLogic.restart);

        const checkpointButton = document.createElement('button');
        checkpointButton.textContent = 'Return to Checkpoint';
        // checkpointButton.addEventListener('click', returnToCheckpoint);

        const hintButton = document.createElement('button');
        hintButton.textContent = 'Hint';
        // hintButton.addEventListener('click', showHint);

        // Append buttons to the menu content div
        menuContentDiv.appendChild(restartButton);
        menuContentDiv.appendChild(checkpointButton);
        menuContentDiv.appendChild(hintButton);

        // Append menu content div to the menu div
        menuDiv.appendChild(menuContentDiv);

        return {
            menuButton,
            menuDiv,
            menuContentDiv,
            openMenuButton,
            restartButton,
            checkpointButton,
            hintButton
        }
    }
     // Function to access DOM elements
    function accessTextDOMElements() {
        let textElement, buttonsContainer;
        try {
            textElement = document.getElementById('text');
            buttonsContainer = document.getElementById('controls');
        } catch (error) {
            console.error('Error accessing DOM elements:', error);
        }
        return { textElement, buttonsContainer };
    }

    // Function to render buttons dynamically
    function renderButtons(choice) {
        const buttonsContainer = document.getElementById('controls');
        buttonsContainer.innerHTML = ''; // Clear previous buttons
        buttonsContainer.classList.add('hide'); // Hide buttons before rendering

        choice.buttons.forEach((buttonData, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.innerText = buttonData.text;
            choiceButton.onclick = buttonData.func;
            choiceButton.id = `button${index + 1}`; // Set button id
            buttonsContainer.appendChild(choiceButton);
        });

        setTimeout(() => {
            buttonsContainer.classList.remove('hide'); // Show buttons after typing animation is complete
        }, choice.text.length); // Adjust timing based on starting text length and typing speed
    }

    // Function to handle typing animation
    function typeTextAnimation(textElement, text, gameLogicCurrentTextIndex, choice) {
        function typeNextCharacter() {
            if (gameLogicCurrentTextIndex < text.length) {
                const splitTextString = splitString(text, MAX_INPUT_CHARS_LENGTH);
                console.log(splitTextString)
                const currentText = splitTextString[gameLogicCurrentTextIndex];
                console.log('currentText' + currentText)
                let currentIndex = 0; // Track the index of the current character
        
                function typeCharacter() {
                    if (currentIndex < currentText.length - 1) {
                        setTimeout(function() {
                            textElement.textContent += currentText[currentIndex];
                            currentIndex++; // Move to the next character
                            typeCharacter(); // Recursively call typeCharacter() for the next character
                        }, typingSpeed); // Use the current typing speed for each character
                    } else {
                        console.log('how are here')
                        // If it's the last character of the last text item, render buttons
                        if (gameLogicCurrentTextIndex === splitTextString.length - 1) {
                            renderButtons(choice);
                        } else {
                            // If it's not the last text item, wait for user input
                            waitForInput();
                        }
                        gameLogicCurrentTextIndex++; // Move to the next text item after typing the current one
                    }
                }
        
                // Start typing the characters recursively
                typeCharacter();
            }
        }

        function createFlashingText(textContent) {
            // Create a container for the flashing text element
            const flashingTextContainer = document.createElement('div');
            flashingTextContainer.setAttribute('id', 'flashing-text-container'); // Add ID to the container
        
            // Create the flashing text element
            const flashingText = document.createElement('div');
            flashingText.textContent = textContent;
            flashingText.setAttribute('id', 'flashing-text'); // Add ID to the flashing text element
            

            // Add animation attribute to the flashing text element
            flashingTextContainer.style.animation = 'flash 0.5s infinite alternate';
            // Append the flashing text element to the container
            flashingTextContainer.appendChild(flashingText);
        
            return flashingTextContainer;
        }
        
        function waitForInput() {
            // Check if the menu is open, and if so, return without proceeding
            if (menuOpen) {
                return;
            }
    
            // Create the flashing text element
            const flashingTextContainer = createFlashingText('Press Any Key to Continue');
    
            // Append the container to the body
            document.body.appendChild(flashingTextContainer);
    
            // Define a function to handle keydown event
            function handleKeyDown(event) {
                // Check if the pressed key is not 'Space' and menu is not open
                if (!menuOpen && event.code !== 'Space' && event.code !== 'Escape') {
                    // Remove the event listener to prevent further keydown events
                    document.removeEventListener('keydown', handleKeyDown);
    
                    // Remove the flashing text container from the DOM
                    document.body.removeChild(flashingTextContainer);
    
                    // Clear previous text content before typing next text item
                    if (gameLogicCurrentTextIndex !== text.length) {
                        textElement.textContent = '';
                    }
    
                    // Start typing next characters
                    typeNextCharacter();
                }
            }
    
            // Add event listener for keydown event
            document.addEventListener('keydown', handleKeyDown);
        }
        
        // Start typing animation
        typeNextCharacter();
    }

    // Main function to handle typing animation, rendering buttons, and accessing DOM elements
    function typeText(text, gameLogicChoice, gameLogicCurrentTextIndex) {
        const { textElement, buttonsContainer } = accessTextDOMElements();
        if (!textElement || !buttonsContainer) return; // Check if DOM elements are accessible
        buttonsContainer.classList.add('hide'); // Hide buttons before starting the typing animation
        console.log(text)
        typeTextAnimation(textElement, text, gameLogicCurrentTextIndex, gameLogicChoice);
    }

  // Event listener for keydown event (when spacebar is pressed)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            typingSpeed = fastTypingSpeed;
            event.preventDefault();
        }
    });

    // Event listener for keyup event (when spacebar is released)
    document.addEventListener('keyup', function(event) {
        if (event.code === 'Space') {
            typingSpeed = normalTypingSpeed;
            event.preventDefault();
        }
    });
    
    // Event listener for the escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            toggleMenuVisibility();
        }
    });


    function toggleMenuVisibility() {
        let menuContent;
        try {
            menuContent = document.getElementById('menu');
        } catch (error) {
            console.error('Error opening menu:', error);
        }

        try {
            const flashingIndicatorTextContainer = document.getElementById('flashing-text-container');
            const flashingIndicatorText = document.getElementById('flashing-text');

            if (flashingIndicatorText) {
                flashingIndicatorTextContainer.classList.toggle('hide');
                flashingIndicatorText.classList.toggle('hide');
            }
        } catch (error) {
            console.log('Indicator not on screen. No action required.')
        }

        // Toggle menuOpen variable based on menu visibility
        menuOpen = menuContent.classList.contains('hide');

        if (menuContent.classList.contains('hide')) {
            menuContent.classList.remove('hide');
        } else {
            menuContent.classList.add('hide');
        }
    }
    
    

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
    }

    return {
        typingSpeed,
        accessDOMElements,
        createMenu,
        typeText,
        toggleMenuVisibility,
        update
    }
})();

export default ui;
