/**
 * this is a configurable file that makes certain elements on your page draggable across the screen.
 *
 * this is a simple script, intended for but not exclusive to neocities.
 */
// begin config variables:
var DRAG_CLASS_NAME = "draggable"; // CANNOT include spaces.
var ENFORCE_LIMITS = true; // keeps the draggables from going offpage
var FADE_ON_MOBILE = true;
var HIDE_ON_MOBILE = false;
var RANDOM_POSITIONS = true;
var ENABLE_DOUBLE_CLICK_FLIP = true;
var FLIP_TIME_SECONDS = 0.5;
// end config variable.


var topZ = 1;
var offsetX, offsetY;
var leftLim, topLim;
var current = undefined;

// determine mobile styling.
var mobileStyle = "";
if (HIDE_ON_MOBILE)
    mobileStyle = "display: none;";
else if (FADE_ON_MOBILE)
    mobileStyle = "opacity: 30%;";

// setup: insert styling into page.
var styleElem = document.createElement("style");
styleElem.textContent = "\n.".concat(DRAG_CLASS_NAME, " {\n    cursor: grab;\n    position: absolute!important;\n    \n    -webkit-touch-callout: none!important;\n    -webkit-user-select: none!important;\n    -khtml-user-select: none!important;\n    -moz-user-select: none!important;\n    -ms-user-select: none!important;\n    user-select: none!important;\n    -webkit-user-drag: none!important;\n    user-drag: none!important;\n\n    transition: transform ").concat(FLIP_TIME_SECONDS, "s ease-in-out;\n}\n\n@media (max-width: 800px) {\n    .").concat(DRAG_CLASS_NAME, " { \n        ").concat(mobileStyle, ";\n        z-index: -50;\n    }\n}\n");

document.head.append(styleElem);

/**
 * randomizes the position of the given element.
 */
function randomizePosition(e) {
    var parent = e.offsetParent;
    console.log("parent width:", parent.clientWidth, "baby width:", e.clientWidth);
    e.style.top = Math.random() * (parent.clientHeight - e.clientHeight) + "px";
    e.style.left = Math.random() * (parent.clientWidth - e.clientWidth) + "px";
}

/**
 * flips an element horizontal style.
 * @param e the element to flip
 */
function flip(e) {
    if (e.style.transform === "scaleX(-1)")
        e.style.transform = "scaleX(1)";
    else
        e.style.transform = "scaleX(-1)";
}

/** recursively disables drag for the given element. */
function disableDrag(e, parent) {
    if (e.tagName == "IMG" || e.tagName == "A") {
        e.setAttribute("draggable", "false");
    }
    if (e.tagName === "A") {
        // dbl click navigation
        e.ondblclick = function (ev) {
            window.location.href = e.href;
        };
        e.onclick = function (ev) {
            ev.preventDefault();
        };
    }
    // WOOO recursion
    for (var _i = 0, _a = Array.from(e.children); _i < _a.length; _i++) {
        var child = _a[_i];
        disableDrag(child, parent === undefined ? e : parent);
    }
}


// events: for each element of the given class, set their reactions to mouse events.
document.querySelectorAll("." + DRAG_CLASS_NAME).forEach(function (e) {
    if (RANDOM_POSITIONS) {
        // wait until load because images change sizes when they render.
        window.addEventListener("load", function () {
            randomizePosition(e);
        }, { once: true });
    }
    // add events to items
    if (ENABLE_DOUBLE_CLICK_FLIP)
        e.ondblclick = function () { return flip(e); };
    disableDrag(e);
    // configure events.
    e.onclick = function (ev) {
        ev.preventDefault();
        // grab element.
        if (e.style.zIndex === "" || topZ - 1 != Number(e.style.zIndex)) {
            e.style.zIndex = "" + topZ;
            topZ++;
        }
    };
    e.onmousedown = function (ev) {
        // only pay attention to left clicks.
        if (ev.button > 1) {
            console.log(ev.button);
            return;
        }
        // get element and offset
        current = e;
        offsetX = current.offsetLeft - ev.clientX;
        offsetY = current.offsetTop - ev.clientY;
        // set limits
        leftLim = current.offsetParent.clientWidth - current.clientWidth;
        topLim = current.offsetParent.clientHeight - current.clientHeight;
        // you are now grabbing.
        current.style.cursor = "grabbing";
    };
    e.onmouseup = function () {
        current = undefined;
        e.style.removeProperty("cursor");
    };
});

// this is the important part:
document.onmousemove = function (ev) {
    if (current === undefined)
        return;
    var leftVal = ev.pageX + offsetX - scrollX;
    var topVal = ev.pageY + offsetY - scrollY;
    if (ENFORCE_LIMITS) {
        if (leftVal < 0)
            leftVal = 0;
        if (topVal < 0)
            topVal = 0;
        if (leftVal > leftLim)
            leftVal = leftLim;
        if (topVal > topLim)
            topVal = topLim;
    }
    current.style.left = leftVal + "px";
    current.style.top = topVal + "px";
};
