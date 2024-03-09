/* ui.js */
const ui = (function () {
    // typingSpeed will be adjusted for dynamic effects later
    // Define the typing speed variables
    let normalTypingSpeed = 50; // milliseconds per character
    let fastTypingSpeed = 5; // milliseconds per character
    let typingSpeed = normalTypingSpeed; // Set initial typing speed to normal

    let currentTextIndex = 0;

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
            textElement.textContent += text[gameLogicCurrentTextIndex];
            gameLogicCurrentTextIndex++;
            // Wait for user input before typing the next character
            waitForInput();
        } else {
            // Render buttons if it's the last text element
            //renderButtons(choice);
            console.log('end')
        }
        if (gameLogicCurrentTextIndex == text.length) {
            renderButtons(choice);
        }
    }

    function waitForInput() {
        document.addEventListener('keydown', function(event) {
            // Clear previous text content before typing next text item
            if (gameLogicCurrentTextIndex != text.length) {
                textElement.textContent = '';
            }
            // Check if any key is pressed
            typeNextCharacter();
        }, { once: true }); // Listen only once
    }

    // Start typing animation
    typeNextCharacter();
}

    // Main function to handle typing animation, rendering buttons, and accessing DOM elements
    function typeText(text, gameLogicChoice, gameLogicCurrentTextIndex) {
        const { textElement, buttonsContainer } = accessTextDOMElements();
        if (!textElement || !buttonsContainer) return; // Check if DOM elements are accessible
        buttonsContainer.classList.add('hide'); // Hide buttons before starting the typing animation
        typeTextAnimation(textElement, text, gameLogicCurrentTextIndex, gameLogicChoice);
    }

    // Event listener for keydown event (when spacebar is pressed)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            typingSpeed = fastTypingSpeed;
        }
    });

    // Event listener for keyup event (when spacebar is released)
    document.addEventListener('keyup', function(event) {
        if (event.code === 'Space') {
            typingSpeed = normalTypingSpeed;
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
