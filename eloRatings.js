

function updateEloRating(head, winnerName, loserName) {
    const K = 40; // K-factor
    let winner = null;
    let loser = null;

    // Find winner and loser nodes in the linked list
    let current = head;
    while (current) {
        if (current.value.song === winnerName) winner = current.value;
        if (current.value.song === loserName) loser = current.value;
        current = current.next;
    }

    // Elo calculation
    const expectedScoreWinner = 1 / (1 + 10 ** ((loser.elo - winner.elo) / 400));
    const expectedScoreLoser = 1 / (1 + 10 ** ((winner.elo - loser.elo) / 400));

    winner.elo += K * (1 - expectedScoreWinner);
    loser.elo += K * (0 - expectedScoreLoser);

    console.log(`Updated ELO: ${winnerName} (${winner.elo}), ${loserName} (${loser.elo})`);
}


module.exports = { updateEloRating };