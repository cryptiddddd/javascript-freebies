# image zooming

`zoomimg.js` makes it so that clicking on certain images on your site enlarges them and casts a shadow over the rest of the page. clicking again, anywhere, will close this overlay.

> for a code preview, please see [`zoomimg.html`](../../tests/zoomimg.html) in the `tests` folder.


## setup instructions

first: download `zoomimg.js` and upload it to your neocities with your other `.js` files.

### 1. in your html: mark the images you want to be able to enlarge.

> note: configuring parameters for this script is not required. for beginners, it may be easiest to forego configuration all together.

first ensure that any image you want to enlarge is in fact an `<img>` element, and then assign it the `zoomable` class.

for example:
```html
<img src="picture 1" class="zoomable">
<img src="picture 2" class="zoomable">
<img src="picture 3" class="zoomable">
<img src="picture 4" class="zoomable">
<!-- these elements can still have multiple classes! -->
<img src="picture 5" class="another-class zoomable">
```

### 2. in your html `<head>` element: insert the script.

template snippet:
```html
<script src="FOLDER/zoomimg.js" type="module"></script>
```
*if you have placed the `zoomimg.js` file within the same folder as your html file, your `src` should be set to `"/zoomimg.js"`. learn more about relative paths [here](https://www.w3schools.com/Html/html_filepaths.asp).

then you should be good to go! for customization, see below documentation:


## how does it work?

`zoomimg.js` has a handful of parameters, none of which are required to configure.

| variable name         | data type | purpose                                              | default value      |
|-----------------------|-----------|------------------------------------------------------|--------------------|
| `AUTOSTYLE`           | boolean   | apply default styles to the overlay div.             | `true`             |
| `CLASS_NAME`          | string    | the class name of images with  enlarging behavior.   | `"zoomable"`       |
| `DISABLE_SCROLL`      | boolean   | disable the scroll when the enlarged image appears.  | `true`             |
| `OVERLAY_COLOR`       | string    | the background color of the overlay.                 | `"#000d"`          |
| `OVERLAY_ID`          | string    | the id assigned to the overlay.                      | `"zoom-overlay"`   |
| `OVERLAY_IMG_ID`      | string    | the id assigned to the enlarged `<img>` element.     | `"overlay-img"`    |
| `ZOOM_SCALE`          | number    | the scale of the enlarged image.                     | `1.0`              |

this script creates a `<div>` element that [if `AUTOSTYLE` is enabled] covers the entire viewport and centers a child `<img>` element. this `<img>` is empty by default, but assigned an `src` when an image of the `CLASS_NAME` [default: `"zoomable"`] class is clicked on. clicking on an image of this class also makes the overlay visible.

clicking on the overlay, once its visible, sets its `display` to `"none"` again, making it disappear. 
