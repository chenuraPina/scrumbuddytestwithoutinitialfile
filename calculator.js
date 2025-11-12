// QuickCalc - Calculator Logic
// History utility module for managing calculation history

const HISTORY_STORAGE_KEY = 'calcHistory';

/**
 * Loads calculation history from sessionStorage and renders it to the DOM
 * Gracefully handles missing or corrupt data with empty array fallback
 */
function loadHistory() {
    const historyList = document.querySelector('#history-list');

    if (!historyList) {
        console.error('History list element not found');
        return;
    }

    // Clear existing list items
    historyList.innerHTML = '';

    // Read from sessionStorage
    let history = [];
    try {
        const stored = sessionStorage.getItem(HISTORY_STORAGE_KEY);
        if (stored) {
            history = JSON.parse(stored);
            // Ensure it's an array
            if (!Array.isArray(history)) {
                history = [];
            }
        }
    } catch (error) {
        console.error('Error loading history from sessionStorage:', error);
        history = [];
    }

    // Render each history item to the DOM
    history.forEach(entry => {
        createHistoryItem(entry);
    });
}

/**
 * Appends a new calculation entry to both sessionStorage and the DOM
 * @param {string} entry - The calculation entry to add (e.g., "2 + 3 = 5")
 */
function appendHistory(entry) {
    if (!entry || typeof entry !== 'string') {
        console.error('Invalid history entry');
        return;
    }

    // Read existing history from sessionStorage
    let history = [];
    try {
        const stored = sessionStorage.getItem(HISTORY_STORAGE_KEY);
        if (stored) {
            history = JSON.parse(stored);
            if (!Array.isArray(history)) {
                history = [];
            }
        }
    } catch (error) {
        console.error('Error reading history from sessionStorage:', error);
        history = [];
    }

    // Add new entry to array
    history.push(entry);

    // Save updated array back to sessionStorage
    try {
        sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Error saving history to sessionStorage:', error);
    }

    // Add new entry to DOM
    createHistoryItem(entry);
}

/**
 * Clears all calculation history from both sessionStorage and the DOM
 */
function clearHistory() {
    // Remove from sessionStorage
    try {
        sessionStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (error) {
        console.error('Error removing history from sessionStorage:', error);
    }

    // Clear DOM list
    const historyList = document.querySelector('#history-list');
    if (historyList) {
        historyList.innerHTML = '';
    } else {
        console.error('History list element not found');
    }
}

/**
 * Helper function to create and append a history item to the DOM
 * @param {string} entry - The calculation entry to display
 */
function createHistoryItem(entry) {
    const historyList = document.querySelector('#history-list');

    if (!historyList) {
        console.error('History list element not found');
        return;
    }

    const listItem = document.createElement('li');
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}

// Initialize history on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
});
