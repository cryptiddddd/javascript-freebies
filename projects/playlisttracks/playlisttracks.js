"use strict";
/**
 * this is a configurable file that allows you to use my api and display tracks fro a playlist of yours on your neocities!
 *
 * simple script, intended for but not exclusive to use on neocities.
 */

// begin config variables
const PLAYLIST_ID = "playlist-id-here";
const ELEMENT_ID = "playlist-tracks"; // the id of the element to place the songs

const TRACK_COUNT = 5; // maximum number of songs to display -- cannot exceed 50.

// end config variables.

// setup: grab the element.
var element = document.getElementById(ELEMENT_ID);
if (element === null) {
    console.error("invalid element id, please reconfigure playlisttracks.js");
}

// callback function
function displayItems(data) {
    let list = document.createElement("ul");
    
    for (let item of data) {
        
        let newElem = document.createElement("li");
        let link = document.createElement("a");

        // accessing spotify data.
        link.href = item.spotifyURL;
        link.innerText = item.name;
        
        newElem.appendChild(link);
        list.appendChild(newElem);
    }

    element?.replaceChildren(list);
}

// creating the http request...
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
    // parse the response text, important! this makes the response into an object we can interact with.
    let response = JSON.parse(this.responseText);
    
    // check for success, print error if needed.
    if (response.status == 200)
        displayItems(response.data.items);

    else
        console.error(`${response.status}: ${response.message}`);
};

// directing the request,
xmlhttp.open('GET', `https://music.wormboy-api.workers.dev/api/playlist/${PLAYLIST_ID}?limit=${TRACK_COUNT}&time_range=${TIME_RANGE}_term`); // generate the configured url.

// sending the request!
xmlhttp.send();
