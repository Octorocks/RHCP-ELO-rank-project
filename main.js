const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

    const jsonPath = './rankedSongs.json';
    const selectionCountPath = './selectionCount.txt'; 


// Bring. Back. My. Functions
const { arrayToLinkedList, printLinkedList, sortLinkedListByElo, updateRankedSongsFile } = require('./linkedListFunctions.js');
const { updateEloRating } = require('./eloRatings.js');

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static(__dirname)); // Serve static files

// quick and nasty, get and increment numofselections
    function getSelectionCount() {
        if (!fs.existsSync(selectionCountPath)) {
            fs.writeFileSync(selectionCountPath, '0', 'utf8');
        }
        return parseInt(fs.readFileSync(selectionCountPath, 'utf8'), 10);
    }

    // Function to increment the selection count
    function incrementSelectionCount() {
        let count = getSelectionCount();
        count++;
        fs.writeFileSync(selectionCountPath, count.toString(), 'utf8');
        return count;
    }

// Serve those ranked songs JSON
app.get('/rankedSongs.json', (req, res) => {
    res.sendFile(jsonPath, { root: __dirname });
});

// API to get current selection count
app.get('/selection-count', (req, res) => {
    const count = getSelectionCount();
    res.json({ selectionCount: count });
});

// API to handle song comparisons
app.post('/submit-elo', (req, res) => {
    const { winner, loser } = req.body;

    if (!winner || !loser) {
        return res.status(400).json({ error: "Missing winner or loser." });
    }

    // Ensure the JSON file exists; otherwise, initialise it (just in case)
    if (!fs.existsSync(jsonPath)) {
        console.log("No ranked songs file found.");
        fs.writeFileSync(jsonPath, JSON.stringify([], null, 4), 'utf8'); 
    }

// On to the Magic!!

    // Load songs from JSON
    const songArray = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // Convert JSON to linked list
    const linkedListHead = arrayToLinkedList(songArray);

    // Update ELO ratings
    updateEloRating(linkedListHead, winner, loser);

    // Sort updated rankings
    const sortedHead = sortLinkedListByElo(linkedListHead);

    //printLinkedList(sortedHead); // Debugging

    // Save updated rankings back to JSON
    updateRankedSongsFile(sortedHead, jsonPath);

    // Increment selection count
    const newCount = incrementSelectionCount();
    console.log(`Total selections made: ${newCount}`);

    res.json({ message: "ELO updated successfully!", selectionCount: newCount });
});

// Start the server on port 3000
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
