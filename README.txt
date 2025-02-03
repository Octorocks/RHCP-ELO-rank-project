# Ranked Songs Selection & ELO Rating System

## Overview
This project allows users to compare songs and update their ELO ratings based on selections. 
Every selection increments a persistent counter stored in `selectionCount.txt`. The system uses a linked list to manage song rankings and sorts them after every vote.

## File Structure
- **`main.js`** – The Express.js backend server.
- **`app.js`** – The frontend script handling song selection.
- **`rankedSongs.json`** – Stores song rankings and ELO ratings.
- **`selectionCount.txt`** – Tracks the number of selections made.
- **`linkedListFunctions.js`** – Handles linked list operations.
- **`eloRatings.js`** – Handles ELO rating calculations.

## Setup Instructions


## Persistence
- **`rankedSongs.json`** retains song rankings between sessions.
- **`selectionCount.txt`** ensures selection counts persist across restarts.

## Future Improvements
- Display selection count on the frontend.
- Implement additional ranking metrics.
- Add support for multiple users.

---

### Notes
This project uses a simple text file to track selections instead of a database for lightweight persistence. If scaling is needed, consider moving to SQLite or MongoDB.

🚀 Happy ranking!

