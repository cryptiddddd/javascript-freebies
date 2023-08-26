# IMPORTANT: this does not work currently due to the state of my api 

\* note that this script is perfectly functional on its own, there are matters on my end that are pending. registering with my api **will not grant functional access** quite yet.

you may peruse the rest of this readme, but know that this does not work quite yet......

---

# current top artists

`currentartists.js` fetches *your* top-listened to artists on spotify and displays them on your webpage. because it gets data specific to you, some extra setup is required.

**important note**: you need a spotify account for this one.

> documentation for this api in progress...

> for a code preview, please see [`currentartists.html`](../../tests/currentartists.html) in the `tests` folder.


## setup instructions

### 1. authorize.

follow the setup instructions on my documentation page linked above. to summarize:

1. visit [the registration page](https://music.wormboy-api.workers.dev/register) and authenticate with spotify.
2. once redirected, copy your user id to clipboard. it will be a random long string of numbers and letters.

### 2. download `currentartists.js` and upload it to your neocities. with your other `.js` files.

### 3. in `currentartists.js`: configure constant variables.

`currentartists.js` has two required parameters:
- `USER_ID` is the user id you received from registering. paste that long randomized string here, replacing `user-id-here` in the quotes.
- `ELEMENT_ID` is the id of the element in which you want to display a list of your favorite artists.
    > note: everything within this element will be overwritten with your artist list. this is so you can place an error message here, which will display if/when your artists don't load.

for further customization, see [how does it work?](#how-does-it-work)

### 4. in your html `<head>` element: insert the script.

template snippet: 
```html
<script src="FOLDER/currentartists.js" type="module"></script>
```

*if you have placed the `currentartists.js` file within the same folder as your html file, your `src` should be set to `"/currentartists.js"`. learn more about relative paths [here](https://www.w3schools.com/Html/html_filepaths.asp).

### 5. in your html, specify where your list will display.

the default id is "top-artists". using that as example, place a `<div>` on your page like so:

```html
<div id="top-artists">
    <!-- leave blank, or place error message here. -->
</div>
```

then you should be good to go.

for troubleshooting, hit f12 and go to "console" for error messages.


## how does it work?

this script uses an api i wrote to get data specific to you from spotify. it can do more than just retrieving your top artists. documentation for this is in the works! ahhh!!!

but for starters, using this template script, here are the points of customization:

| variable name      | data type | purpose                                              | default value      |
|--------------------|-----------|------------------------------------------------------|--------------------|
| `USER_ID`          | string    | your unique user id, received upon registration.     | `"user-id-here"`   
| `ELEMENT_ID`       | string    | id for where you wish to display top artists.        | `"top-artists"`
| `ARTIST_COUNT`     | number    | maximum number of arists retrieved.                  | `5`
| `TIME_RANGE`       | string    | time range, "short", "medium", or "long"             | `"short"`
| `TYPE`             | string    | type of data to retrieve. "artists" or "tracks"      | `"artists"`

if you desire further customization [ie: displaying with a different format], that can be done manually by editing the contents of the `displayItems()` function.

if you desire to fetch different data [ie: most recently played tracks] try changing the url to:
```js
`https://music.wormboy-api.workers.dev/api/${USER_ID}/recently_played?limit=${ARTIST_COUNT}`
```

again, see my documentation for more information on the api.
