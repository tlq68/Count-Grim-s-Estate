/* ui.js */
const ui = (function () {
    const typingSpeed = 50;

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
    
    function typeText(text, gameLogicChoice, gameLogicCurrentTextIndex) {
        // Declare variables for DOM elements
        let textElement, buttonsContainer;
    
        try {
            // Attempt to access DOM elements
            textElement = document.getElementById('text');
            buttonsContainer = document.getElementById('controls');
        } catch (error) {
            console.error('Error accessing DOM elements:', error);
        }
        
        // Function to render buttons dynamically
        function renderButtons(choice) {
            let buttonsContainer;
            try {
               buttonsContainer = document.getElementById('controls');
            }
            catch (error) {
                console.error('Error accessing DOM elements:', error);
            }
            buttonsContainer.innerHTML = ''; // Clear previous buttons
    
            // Hide buttons before rendering
            buttonsContainer.classList.add('hide');
    
            // Creates a button for each button in current choice list
            choice.buttons.forEach((buttonData, index) => {
                const choiceButton = document.createElement('button');
                choiceButton.innerText = buttonData.text;
                choiceButton.onclick = buttonData.func;
                choiceButton.id = `button${index + 1}`; // Set button id
                buttonsContainer.appendChild(choiceButton);
                (choiceButton.id)
            });
    
            // Show buttons after typing animation is complete
            setTimeout(() => {
                buttonsContainer.classList.remove('hide');
            }, choice.text.length); // Adjust timing based on starting text length and typing speed
        }
    
        // Points to next letter
        function typeNextCharacter() {
            textElement.textContent += text[gameLogicCurrentTextIndex];
            gameLogicCurrentTextIndex++;
            if (gameLogicCurrentTextIndex < text.length) {
                setTimeout(typeNextCharacter, typingSpeed);
            } else {
                // Animation complete, render buttons
                renderButtons(gameLogicChoice);
            }
        }
    
        // Hide buttons before starting the typing animation
        buttonsContainer.classList.add('hide');
    
        // Start typing animation
        typeNextCharacter();
    }

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

    // Event listener for the escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            toggleMenuVisibility();
        }
    });

    return {
        typingSpeed,
        accessDOMElements,
        createMenu,
        typeText,
        toggleMenuVisibility
    }
})();

export default ui;
