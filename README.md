# Ranked Songs Selection & ELO Rating System

## Overview
This project allows users to compare songs and update their ELO ratings based on selections. 
Every selection increments a persistent counter stored in `selectionCount.txt`. The system uses a linked list to manage song rankings and sorts them after every vote.

## File Structure
- **`main.js`** – The Express.js backend server.
- **`userComparison.html`** – Super simple html file for allowing users to compare tracks. 
- **`app.js`** – The frontend script handling song selection.
- **`rankedSongs.json`** – contains all RHCP songs, and their current rank as of upload.
- **`selectionCount.txt`** – Tracks the number of selections made.
- **`linkedListFunctions.js`** – Source file for most of the necessary functions.
- **`eloRatings.js`** – Handles the logic of changing the ELO score, like in chess.


## Persistence
- **`rankedSongs.json`** retains song rankings between sessions.
- **`selectionCount.txt`** ensures selection counts persist across restarts.

## Future Improvements
- Display selection count on the frontend onload.
- Embed to eddbrisley.com to democratise input

---

### Notes
This project uses a simple text file to track selections and a JSON file for the ranks, instead of a database for lightweight persistence.
If I have to, should be straightforward to move to a proper scale database structure.

