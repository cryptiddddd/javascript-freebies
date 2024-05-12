# draggable elements script

> for a code preview, please see [`draggable.html`](../../tests/draggable.html) in the `tests` folder.

**important note:** this feature does not have touch-screen support. draggable elements will be visible, but cannot be dragged by a finger on a screen. optionally, you can hide draggable elements, or reduce their opacity for mobile users. if neither are enabled, they should be pushed to the back of your page (negative z-index).


## setup instructions

first: download `draggable.js` and upload it to your neocities with your other `.js` files.

### 1. (OPTIONAL) in `draggable.js`: configure constant variables.

`draggable.js` has six parameters:
- `DRAG_CLASS_NAME` is the class name you will use for your draggable elements. the default is `"draggable"`. configuring this is optional, i advise to leave as is for simplicity.
- `ENFORCE_LIMITS` keeps the draggable elements from being dragged outside of the relative positioning element [your body element, if you use none with `position: relative`]. this can be `true` or `false`.
    * learn about relative positioning [here](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/).
- `FADE_ON_MOBILE` determines whether to reduce the opacity of draggable elements while on mobile. this can be `true` or `false`. it defaults to `true`.
- `HIDE_ON_MOBILE` determines whether to hide draggable elements while on mobile. this can be `true` or `false`, and defaults to `false`.
- `RANDOM_POSITIONS` determines whether draggable elements are scrambled to random positions on page load. this can be `true` or `false`.
    > ! if you disable this, you should set the default position of each element using the `left` and `top` CSS properties, else they will all spawn in the upper-left corner of the screen.
- `ENABLE_DOUBLE_CLICK_FLIP` if `true`, allows your user to double click on any draggable element, flipping it horizontally. if `false`, double clicking does nothing.
- `FLIP_TIME_SECONDS` determines how many seconds it will take for the flipping animation to play. this can be any number larger than zero, including non-integers. if `ENABLE_DOUBLE_CLICK_FLIP` is disabled (`false`), this time variable does nothing.

the code should work fine without any configuration.


### 2. in your html `<head>`: insert the script.

template snippet:
```html
<script src="FOLDER/draggable.js" type="module"></script>
```

*be sure to change "FOLDER" to the appropriate name. if your `draggable.js` is in the same folder as your `.html` file, you can put `.` (ie: `./draggable.js`).

learn more about relative paths [here](https://www.w3schools.com/Html/html_filepaths.asp).


### 3. in your html: mark your "draggables".

> for an example, see [`draggable.html`](../../tests/draggable.html).

which elements do you want to be draggable? add them to the `"draggable"` class like so:

```html
<div>not a draggable element</div>

<div class="draggable">THIS is a draggable element</div>
```

i suggest using this primarily on [block-level elements](https://www.w3schools.com/htmL/html_blocks.asp) or `<img>` elements.


## how does it work?

this script manipulates the positioning of the draggable elements using css.

first, it inserts a block of CSS into the `<head>` of your HTML document. this block styles your draggable elements by setting the position to `absolute` (very important), and disabling the user's ability to "select" it (as that would interfere with the user's ability to click + drag).

this block of CSS also determines how draggable elements appear for mobile users.

then, all elements belonging to the configured draggable class are gathered, and each is given a handful of mouse event handlers:
- `ondblclick` (conditionally, if `ENABLE_DOUBLE_CLICK_FLIP` is `true`)
- `onclick`
- `onmousedown`
- `onmouseup`

these event handlers control the behavior of draggable elements -- coming to front, flipping, starting movement, and ending movement.

finally, the whole page is given an event handler for `onmousemove`. this handler belongs to the `document` rather than the draggable element, as the `onmousemove` event only fires when the user's mouse moves over the specific element.

a handful of global variables keep track of the currently "grabbed" element, along with the offset between the cursor and its origin (for accurate positioning).
