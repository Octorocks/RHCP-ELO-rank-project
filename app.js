
// FrontEnd function, needed to push the random song names, record user input and return the winner

async function fetchSongs() {
    const response = await fetch('/rankedSongs.json'); // Fetch JSON
    const songs = await response.json(); // Convert to JS object

    let index1 = Math.floor(Math.random() * songs.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * songs.length);
    } while (index1 === index2); // crucial fix, make sure they're different xD

    const song1 = songs[index1];
    const song2 = songs[index2];

    // Assign songs to buttons
    document.getElementById("button1").innerText = song1.song;
    document.getElementById("button2").innerText = song2.song;

    // Attach event listeners to return winner and loser
    document.getElementById("button1").onclick = () => submitResult(song1, song2);
    document.getElementById("button2").onclick = () => submitResult(song2, song1);
}

// send results to backend
async function submitResult(winner, loser) {
    const response = await fetch('/submit-elo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winner: winner.song, loser: loser.song })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(`ELO updated! Selection count: ${data.selectionCount}`);

            // show the count
        document.getElementById("selectionCounter").innerText = `Selections: ${data.selectionCount}`;

        fetchSongs(); // reload selections for the next pick
    } else {
        console.error("Error updating ELO");
    }
}


// Load initial pair on page load
window.onload = fetchSongs;
