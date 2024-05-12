/**
 * this is a configurable file that makes certain elements on your page draggable across the screen.
 * 
 * this is a simple script, intended for but not exclusive to neocities.
 */

// begin config variables:
const DRAG_CLASS_NAME = "draggable"; // CANNOT include spaces.
const ENFORCE_LIMITS = true; // keeps the draggables from going offpage

const FADE_ON_MOBILE = true;
const HIDE_ON_MOBILE = false;

const RANDOM_POSITIONS = true;
const ENABLE_DOUBLE_CLICK_FLIP = true;
const FLIP_TIME_SECONDS = 0.5;
// end config variable.

var topZ = 1;

var offsetX: number, offsetY: number;
var leftLim: number, topLim: number;
var current: HTMLElement | undefined = undefined;


// determine mobile styling.
let mobileStyle = "";
if (HIDE_ON_MOBILE) mobileStyle = "display: none;";
else if (FADE_ON_MOBILE) mobileStyle = "opacity: 30%;";


// setup: insert styling into page.
const styleElem = document.createElement("style");
styleElem.textContent = `
.${DRAG_CLASS_NAME} \{
    cursor: grab;
    position: absolute!important;
    
    -webkit-touch-callout: none!important;
    -webkit-user-select: none!important;
    -khtml-user-select: none!important;
    -moz-user-select: none!important;
    -ms-user-select: none!important;
    user-select: none!important;
    -webkit-user-drag: none!important;
    user-drag: none!important;

    transition: transform ${FLIP_TIME_SECONDS}s ease-in-out;
\}

@media (max-width: 800px) \{
    .${DRAG_CLASS_NAME} \{ 
        ${mobileStyle};
        z-index: -50;
    \}
\}
`;

document.head.append(styleElem);


/**
 * randomizes the position of the given element.
 */
function randomizePosition(e: HTMLElement): void {
    const parent = e.offsetParent;
    
    console.log("parent width:", parent.clientWidth, "baby width:", e.clientWidth);
    
    e.style.top = Math.random() * (parent.clientHeight - e.clientHeight) + "px";
    e.style.left = Math.random() * (parent.clientWidth - e.clientWidth) + "px";
}


/**
 * flips an element horizontal style.
 * @param e the element to flip 
 */
function flip(e: HTMLElement): void {
    if (e.style.transform === "scaleX(-1)") e.style.transform = "scaleX(1)";
    else e.style.transform = "scaleX(-1)";
}

/** recursively disables drag for the given element. */
function disableDrag(e: HTMLElement, parent?: HTMLElement): void {
    if (e.tagName == "IMG" || e.tagName == "A") {
        e.setAttribute("draggable", "false");
    } 
    if (e.tagName === "A") {
        // dbl click navigation
        (e as HTMLElement).ondblclick = function (ev: MouseEvent) {
            window.location.href = (e as HTMLAnchorElement).href;
        };
        (e as HTMLElement).onclick = function (ev: MouseEvent) {
            ev.preventDefault();
        }
    }
    
    // WOOO recursion
    for (let child of Array.from(e.children)) {
        disableDrag(child as HTMLElement, parent === undefined? e : parent);
    }
}


// events: for each element of the given class, set their reactions to mouse events.
document.querySelectorAll("." + DRAG_CLASS_NAME).forEach((e) => {
    if (RANDOM_POSITIONS) {
        // wait until load because images change sizes when they render.
        window.addEventListener("load", () => {
            randomizePosition(e as HTMLElement);
        }, {once: true});
    }

    // add events to items
    if (ENABLE_DOUBLE_CLICK_FLIP) (e as HTMLElement).ondblclick = () => flip(e as HTMLElement);
    
    disableDrag(e as HTMLElement);

    // configure events.
    (e as HTMLElement).onclick = (ev: MouseEvent) => {
        ev.preventDefault();

        // grab element.
        if ((e as HTMLElement).style.zIndex === "" || topZ - 1 != Number((e as HTMLElement).style.zIndex)) {
            (e as HTMLElement).style.zIndex = "" + topZ;
            topZ ++;
        }
    }; 

    (e as HTMLElement).onmousedown = (ev: MouseEvent) => {
        // only pay attention to left clicks.
        if (ev.button > 1) {
            console.log(ev.button);
            return;
        }

        // get element and offset
        current = e as HTMLElement;
        offsetX = current.offsetLeft - ev.clientX;
        offsetY = current.offsetTop - ev.clientY;
        
        // set limits
        leftLim = current.offsetParent.clientWidth - current.clientWidth;
        topLim = current.offsetParent.clientHeight - current.clientHeight;

        // you are now grabbing.
        current.style.cursor = "grabbing";
    };

    (e as HTMLElement).onmouseup = () => {
        current = undefined;
        (e as HTMLElement).style.removeProperty("cursor");
    };
});


// this is the important part:
document.onmousemove = (ev: MouseEvent) => {
    if (current === undefined) return;

    let leftVal = ev.pageX + offsetX - scrollX;
    let topVal = ev.pageY + offsetY - scrollY;

    if (ENFORCE_LIMITS) {
        if (leftVal < 0) leftVal = 0;
        if (topVal < 0) topVal = 0;
        
        if (leftVal > leftLim) leftVal = leftLim;
        if (topVal > topLim) topVal = topLim;
    }

    current.style.left = leftVal + "px";
    current.style.top = topVal + "px";
}
