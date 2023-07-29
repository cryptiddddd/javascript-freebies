/**
 * this is a configurable file that makes certain images enlargable!
 * 
 * this is a simple script, intended for but not exclusive to neocities.
 */

// begin config variables
const ZOOM_SCALE = 1.0;

const OVERLAY_COLOR = "#000d"; // this can be any color, any format. transparency recommended.

const CLASS_NAME = "zoomable";
const OVERLAY_ID = "zoom-overlay";
const OVERLAY_IMG_ID = "overlay-img";

const AUTOSTYLE = true;
const DISABLE_SCROLL = true;

// end config variables

// setup: add overlay to the whole page
let overlay = document.createElement("div");
overlay.id = OVERLAY_ID;

if (AUTOSTYLE) {
    overlay.style.alignItems = "center";
    overlay.style.backgroundColor = OVERLAY_COLOR;
    overlay.style.height = "100vh";
    overlay.style.justifyContent = "center";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
}

overlay.style.zIndex = "100"; // gotta be on top!
overlay.style.display = "none"; // default no display!

overlay.onclick = function (event: MouseEvent) {
    overlay.style.display = "none";
}

// create empty image child to later be populated.
let image = document.createElement("img");
image.id = OVERLAY_IMG_ID;
image.style.scale = String(ZOOM_SCALE);

overlay.appendChild(image);

// add overlay to the body
document.body.appendChild(overlay);

// onclick function for zoomables.
(window as any).zoomIn = function (element: HTMLImageElement) {
    (overlay.firstElementChild as HTMLImageElement).src = element.src;
    overlay.style.display = "flex";

    if (DISABLE_SCROLL) {
        document.body.style.overflow = "hidden";
    }
}

// setup : assign onclick for every element in the given class.
for (let element of document.getElementsByClassName(CLASS_NAME)) {
    element.setAttribute("onclick", "zoomIn(this);");
}

