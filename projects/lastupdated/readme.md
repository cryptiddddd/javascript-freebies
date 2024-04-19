# last updated timestamp

> for a code preview, please see [`lastupdated.html`](../../tests/lastupdated.html) in the `tests` folder.


## setup instructions

first: download `lastupdated.js` and upload it to your neocities with your other `.js` files.

### 1. in `lastupdated.js`: configure constant variables.

`lastupdated.js` has two parameters:
- `SITE_NAME` is your neocities site name.
    > replace "wormboy3" with your sitename, but be sure to keep the quotations around it.
- `ELEMENT_ID` is the id name of the designated element to place your timestamp.

configuring `ELEMENT_ID` is optional and a matter of personal preference. 


### 2. in your html: decide where your timestamp will go. 

> for an example, see [`lastupdated.html`](../../tests/lastupdated.html).

i suggest creating a `<span>` element, but whatever you use: be aware that *everything* within the element will be overridden by the timestamp text.

want to copy paste?
```html
<p>site last updated <span id="last-updated">[timestamp loading...]</span></p>
```

### 3. in your html `<head>`: insert the script.

template snippet:
```html
<script src="FOLDER/lastupdated.js" type="module"></script>
```

*if you have placed the `lastupdated.js` file within the same folder as your html file, your `src` should be set to `"/lastupdated.js"`. learn more about relative paths [here](https://www.w3schools.com/Html/html_filepaths.asp).


## how does it work?

this script uses an api to get a little package of information about your site. the information about your site is publically available: it includes your username, your site's tags, how many views you've gotten, and of course when it was last updated.

this script takes that pacakge, grabs the timestamp for when your site was last updated, converts it to the viewer's local timezone, and places it within whatever element has the configured id [with the default value `last-updated`].

want to customize? see w3schools' javascript date reference [here](https://www.w3schools.com/jsref/jsref_obj_date.asp). try replacing `date.toLocaleString()` [line 34] with `date.toLocaleDateString()` and see what happens.
