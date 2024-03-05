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
            console.error('Error saving game state:', error);
        }
    
        if (menuContent.classList.contains('hide')) {
            menuContent.classList.remove('hide');
        } else {
            menuContent.classList.add('hide');
        }
    }

    return {
        typingSpeed,
        accessDOMElements,
        typeText,
        toggleMenuVisibility
    }
})();

export default ui;
