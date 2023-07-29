# pagedoll randomizer

> for a code preview, please see [`pagedoll.html`](../../tests/pagedoll.html) in the `tests` folder.

this script picks a random image to display in the corner of your page as a pagedoll!


## setup instructions

first: download `pagedoll.js` and upload it to your neocities with your other `.js` files.


### 1. in `pagedoll.js`: configure constant variables.

> ensure you know javascript array syntax. learn more [here](https://www.w3schools.com/js/js_arrays.asp)!

clear the default contents of the `PAGEDOLLS` array, and populate it with your own files. that may look like this, using relative file paths and names:
```js
const PAGEDOLLS = [
    "folder/image1.png",
    "folder/image2.png",
    "folder/image3.png",
    "folder/image4.png",
];
```
or like this, using urls:
```js
const PAGEDOLLS = [
    "https://wormboy3.neocities.org/assets/images/blue_orange_worm.png",
    "https://wormboy3.neocities.org/assets/images/blue_pink_worm.png",
    "https://wormboy3.neocities.org/assets/images/green_pink_worm.png",
    "https://wormboy3.neocities.org/assets/images/purple_yellow_worm.png",
]
```

for further, alternate directory setup, see [below](#pagedoll-directories).


### 2. in your html `<head>` element: insert the script.

template snippet:
```html
<script src="FOLDER/pagedoll.js" type="module"></script>
```

*if you have placed the `pagedoll.js` file within the same folder as your html file, your `src` should be set to `"/pagedoll.js"`. learn more about relative paths [here](https://www.w3schools.com/Html/html_filepaths.asp).

you should be good to go from there!


## how does it work?

this script creates and adds a *new* `<img>` element to your html body.

`pagedoll.js` has a handful of parameters.

| variable name      | data type | purpose                                              | default value      |
|--------------------|-----------|------------------------------------------------------|--------------------|
| `PAGEDOLLS`        | string[]  | a list of pagedoll file names or urls.               | silly images       |
| `ENABLE_DIR`       | boolean   | if the pagedolls are local files or external urls.   | `false`            |
| `PAGEDOLL_DIR`     | string    | local folder that contains pagedoll image files.     | `""` [empty]       |
| `PAGEDOLL_ID`      | string    | id for the pagedoll `<img>` element.                 | `"pagedoll"`       |
| `AUTOSTYLE`        | boolean   | applies default styles to the pagedoll.              | `true`             |
| `PAGEDOLL_WIDTH`   | string    | the doll's width, if autostyle is enabled.           | `"200px"`          |
| `HORIZONTAL_POS`   | string    | the doll's horizontal position, if autostyle.        | `"left"`           |
| `VERTICAL_POS`     | string    | the doll's vertical position, if autostyle.          | `"bottom"`         |

### pagedoll directories

`PAGEDOLLS` can contain either urls to or filenames of your pagedoll images. 

by default, a random item off this list will be selected. however: if you have a designated folder of pagedolls, you can use `ENABLE_DIR` and `PAGEDOLL_DIR` like so:

```js
const PAGEDOLLS = [
    "green_gal.png",
    "orange_bro.png",
    "purple_guy.png",
    "red_guy.png",
    "teal_ghost.png"
];

const ENABLE_DIR = true; // set it to true!
const PAGEDOLL_DIR = "page-dolls"; // relative path with no trailing slash.
```

this has *no* functional difference, but makes your code a little nicer to use and edit.

### pagedoll styling

the default styling of the doll, in css terms, is like so:
```css
#pagedoll {
    bottom: 0;
    left: 0;
    position: fixed;
    width: PAGEDOLL_WIDTH;  /* the config variable */
    z-index: 100;
}
```

the position properties [bottom, left, top, right] are determined by the `HORIZONTAL_POS` and `VERTICAL_POS` variables.
- `HORIZONTAL_POS` must be `"left"` or `"right"`. anything else will log an error message.
- `VERTICAL_POS` must be `"top"` or `"bottom"`. anything else will log an error message.

these variables together can place the pagedoll in one of four corners. 

to further customize the position or other styling, set `AUTOSTYLE` to `false`.
