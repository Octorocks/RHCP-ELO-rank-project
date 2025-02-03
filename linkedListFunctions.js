

//outline the constructor
class ListNode {
    constructor(songData) {
        // If songData is already an object (from JSON), use it directly
        if (typeof songData === 'object' && songData !== null && 'song' in songData) {
            this.value = songData;  // ✅ Prevents nesting
        } else {
            this.value = { song: songData, elo: 1000 };  // ✅ Initializes a new song properly
        }
        this.next = null;
    }
}

//convert songlist.js file for processing, before sending onward to rankedSongs.JSON file for persistent storage
function arrayToLinkedList(arr) {
    if (arr.length === 0) return null;

    let head = new ListNode(arr[0]);  // ✅ Uses existing structure correctly
    let current = head;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }

    return head;
}


//debugging function 
function printLinkedList(head) {
    let current = head;
    while (current) {
        console.log(current.value); 
        current = current.next; 
    }
}

//the actual "ranking" function, re-arranges linked list to promote heighest song
function sortLinkedListByElo(head) {
    if (!head || !head.next) return head; //edge case

    let swapped;
    do {
        swapped = false;
        let current = head;
        
        while (current.next) {
            if (current.value.elo < current.next.value.elo) { 
                [current.value, current.next.value] = [current.next.value, current.value]; 
                swapped = true;
            }
            current = current.next;
        }
    } while (swapped);

    return head;
}

//return the linked list to JSON array for storage
const fs = require('fs');
function updateRankedSongsFile(head, filePath = './rankedSongs.json') {
    let arr = [];
    let current = head;

    while (current) {
        arr.push({ song: current.value.song, elo: current.value.elo }); // ✅ Ensures correct structure
        current = current.next;
    }

    fs.writeFileSync(filePath, JSON.stringify(arr, null, 4), 'utf8');

    console.log('Ranked songs updated successfully!');
}


module.exports = { ListNode, arrayToLinkedList, printLinkedList, sortLinkedListByElo, updateRankedSongsFile };
