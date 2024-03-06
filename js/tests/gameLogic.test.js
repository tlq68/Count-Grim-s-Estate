// Import the gameLogic module
const gameLogic = require('../gameLogic/gameLogic.js');

// Mock dependencies
jest.mock('../ui/ui.js', () => ({
    typeText: jest.fn(),
    toggleMenuVisibility: jest.fn()
}));
jest.mock('../localStorageManager/localStorageManager.js', () => ({
    saveGameState: jest.fn()
}));

alert('testing')

describe('Game Logic', () => {
    let choice;

    beforeEach(() => {
        // Set up a mock choice object for testing
        choice = {
            id: 'some-choice-id',
            text: 'Some choice text',
            buttons: [
                { text: 'Button 1', func: jest.fn() },
                { text: 'Button 2', func: jest.fn() }
            ]
        };

        // Reset any mocked function mocks before each test
        jest.clearAllMocks();
    });

    test('update function should update text, buttons, and save game state', () => {
        // Call the update function with the mock choice
        gameLogic.update(choice);

        // Assert that the typeText function from ui.js is called with the correct arguments
        expect(ui.typeText).toHaveBeenCalledWith(choice.text, choice, 0);

        // Assert that toggleMenuVisibility from ui.js is called
        expect(ui.toggleMenuVisibility).toHaveBeenCalled();

        // Assert that saveGameState from localStorageManager.js is called
        expect(storage.saveGameState).toHaveBeenCalled();
    });

    test('restart function should reset game state and toggle menu visibility', () => {
        // Mock confirmation
        window.confirm = jest.fn(() => true);

        // Call the restart function
        gameLogic.restart();

        // Assert that game state is reset
        // Add assertions here to check if game state is properly reset

        // Assert that toggleMenuVisibility from ui.js is called
        expect(ui.toggleMenuVisibility).toHaveBeenCalled();
    });

    // Add more test cases for other functions as needed
});
