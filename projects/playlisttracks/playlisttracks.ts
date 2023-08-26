/**
 * this is a configurable file that allows you to use my api and display tracks fro a playlist of yours on your neocities!
 * 
 * simple script, intended for but not exclusive to use on neocities.
 */

// begin config variables
const PLAYLIST_ID = "playlist-id-here";
const ELEMENT_ID = "playlist-tracks"; // the id of the element to place the songs in

const ARTIST_COUNT = 5; // maximum number of artists to display

// end config variables

// typescript interface -- all the available fields of data for a track.
interface PictureData {
    height: number;
    url: string;
    width: number;
}

interface AlbumData {
    artwork: PictureData; // url to 640px album art
    name: string;
    releaseDate: string; // album's release date
    trackCount: number; // how many tracks total
}

interface TrackData {
    album: AlbumData; // data on the album
    artists: string[]; // list of names of artists
    name: string; // name of the song
    spotifyURL: string; // url to the song
    trackNumber: number; // # on the album 
}

// setup: grab the element.

var element = document.getElementById(ELEMENT_ID);
if (element === null) { console.error("invalid element id, please reconfigure currentartists.js"); }

// callback function
function displayItems(data: TrackData[]) {
    let list = document.createElement("ul");

    // loop through each piece of data and turn it into items on a list.
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
xmlhttp.onload = function(): void {
    // parse the response text, important! this makes the response into an object we can interact with.
    let response = JSON.parse(this.responseText); 
    
    // check for success, print error if needed.
    if (response.status == 200) displayItems(response.data.items);
    else console.error(`${response.status}: ${response.message}`);
}

// directing the request,
xmlhttp.open('GET', `http://music.wormboy-api.workers.dev/api/playlist/${PLAYLIST_ID}?limit=${ARTIST_COUNT}`); // generate the configured url.

// sending the request!
xmlhttp.send();
