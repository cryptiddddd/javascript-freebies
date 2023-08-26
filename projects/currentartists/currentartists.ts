/**
 * this is a configurable file that allows you to use my api and display your current top artists on your neocities page!
 * 
 * simple script, intended for but not exclusive to use on neocities.
 */

// begin config variables
const USER_ID = "user-id-here";
const ELEMENT_ID = "top-artists"; // the id of the element to place the artist list in.

const ARTIST_COUNT = 5; // maximum number of artists to display
const TIME_RANGE = "short_term"; // time range for top

const TYPE = "artists"; // alternate valid type: "tracks"

// end config variables

// typescript interface -- properties both artist and track will have.
interface ItemData {
    name: string;
    spotifyURL: string;
}

// setup: grab the element.

var element = document.getElementById(ELEMENT_ID);
if (element === null) { console.error("invalid element id, please reconfigure currentartists.js"); }

// callback function
function displayItems(data: ItemData[]) {
    let list = document.createElement("ol");

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
xmlhttp.open('GET', `http://music.wormboy-api.workers.dev/api/${USER_ID}/top/${TYPE}?limit=${ARTIST_COUNT}&time_range=${TIME_RANGE}`); // generate the configured url.

// sending the request!
xmlhttp.send();
