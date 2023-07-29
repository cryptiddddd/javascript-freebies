/**
 * this is a configurable file that adds a automatically-updated and accurate timestamp as to when a site was last updated. NEOCITIES ONLY!
 * 
 * see readme.md for set up details. 
 * 
 * file written by wormboy3
 */

// begin config variables.
const SITE_NAME = "wormboy3"; // your neocities sitename.
const ELEMENT_ID = "last-updated"; // the id of the element you want the timestamp to go.




// end config variables.
const url = `https://weirdscifi.ratiosemper.com/neocities.php?sitename=${SITE_NAME}`;

interface JSONContent {
    [index: string]: JSONContent;
}

function printData(data: JSONContent): void {
    // get the element that will display the timestamp.
    let element = document.getElementById(ELEMENT_ID);

    // get the timestamp, convert to a date.
    let timestamp = data["info"]["last_updated"] as unknown as string;
    let date = new Date(timestamp);

    // protection.
    if (element === null) {
        console.log(`ERROR: element #${ELEMENT_ID} could not be found. please reconfigure lastupdated.js, or assign id '${ELEMENT_ID}' to an element!`);
        return;
    }

    // decide how to display date and display it.
    element.innerText = date.toLocaleString();
}


// creating the http request...
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function(): void {
    // when the response arrives, send the json to the printData() function.
    printData(JSON.parse(this.responseText));
}
xmlhttp.open('GET', url); // get the configured url.
xmlhttp.send();

