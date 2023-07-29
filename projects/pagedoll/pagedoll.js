"use strict";
/**
 * this is a configurable file for adding a "pagedoll" to a corner of your site.
 *
 * intended for neocities, but not exclusive to neocities.
 */
// begin config variables
const PAGEDOLLS = [
    "https://cdn.discordapp.com/attachments/799704269787496518/807425718765355078/agentpurple_square.png",
    "https://cdn.discordapp.com/attachments/799704269787496518/807425719915118634/greengal_square.png",
    "https://cdn.discordapp.com/attachments/799704269787496518/807425721047187507/orangebro_square.png",
    "https://cdn.discordapp.com/attachments/799704269787496518/807425722255147039/redcreep_square.png",
    "https://cdn.discordapp.com/attachments/799704269787496518/807425723471364156/tealghost_square.png"
];

const ENABLE_DIR = false;
const PAGEDOLL_DIR = "";

const PAGEDOLL_ID = "pagedoll";

const AUTOSTYLE = true;
const PAGEDOLL_WIDTH = "200px";
const HORIZONTAL_POS = "left"; // these two position variables only apply if autostyle is enabled...
const VERTICAL_POS = "bottom";
// end config variables

// pick a random page doll.
let pagedollSrc = PAGEDOLLS[Math.floor(Math.random() * PAGEDOLLS.length)];

// if it's a local path, calculate the directory. 
if (ENABLE_DIR)
    pagedollSrc = `${PAGEDOLL_DIR}/${pagedollSrc}`;

// create an img, assign id, autostyle, place on page.
let pagedollImg = document.createElement("img");
pagedollImg.src = pagedollSrc;
pagedollImg.id = PAGEDOLL_ID;

if (AUTOSTYLE) {
    pagedollImg.style.position = "fixed";
    pagedollImg.style.width = PAGEDOLL_WIDTH;
    pagedollImg.style.zIndex = "100";

    // calculate corner position.
    if (HORIZONTAL_POS === "left")
        pagedollImg.style.left = "0";
    else if (HORIZONTAL_POS === "right")
        pagedollImg.style.right = "0";
    else
        console.log("ERROR: horizontal position could not be parsed, please reconfigure in pagedoll.js!");

    if (VERTICAL_POS === "bottom")
        pagedollImg.style.bottom = "0";
    else if (VERTICAL_POS === "top")
        pagedollImg.style.top = "0";
    else
        console.log("ERROR: vertical position could not be parsed, please reconfigure in pagedoll.js!");
}

document.body.appendChild(pagedollImg);
