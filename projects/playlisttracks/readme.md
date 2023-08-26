# tracks from a favorite spotify playlist.

`playlisttracks.js` fetches songs from a specified spotify playlist and displays them on your neocities page in the specified location.

> note: you **must** have a spotify playlist to use this.

> another note: this script is very similar to `currentartists`! this is the currently-functional alternative to that freebie, as i am awaiting approval from spotify...

> documentation for this api in progress...

> for a code preview, please see [`playlisttracks.html`](../../tests/playlisttracks.html) in the `tests` folder.


## setup instructions

### 1. pick the playlist to use.

on spotify, first pick the playlist you'd like to use. make sure that it is **public**. this does not mean that it must on your profile, just that it is marked as *public*.

copy a link to your playlist. it should look something like this:

```https://open.spotify.com/playlist/0tdsOz3mtdpOJXS5Q5ah1u```

remove the `https://open.spotify.com/playlist/` portion -- all you need is the code at the end.

### 2. download `playlisttracks.js` and upload it to your neocities. with your other `.js` files.

### 3. in `playlisttracks.js`: configure constant variables.

`playlisttracks.js` has two required parameters:
- `PLAYLIST_ID` is the id of the playlist you wish to draw songs from. in the example above, it is `0tdsOz3mtdpOJXS5Q5ah1u`.
- `ELEMENT_ID` is the id of the element in which you want to display the list of these tracks.
    > note: everything within this element will be overwritten with your track list. this is so you can place an error message here, which will display if/when your tracks don't load.

for further customization, see [how does it work?](#how-does-it-work)

### 4. in your html `<head>` element: insert the script.

template snippet: 
```html
<script src="FOLDER/playlisttracks.js" type="module"></script>
```

*if you have placed the `playlisttracks.js` file within the same folder as your html file, your `src` should be set to `"/playlisttracks.js"`. learn more about relative paths [here](https://www.w3schools.com/Html/html_filepaths.asp).

### 5. in your html, specify where your list will display.

the default id is "playlist-tracks". using that as example, place a `<div>` on your page like so:

```html
<div id="playlist-tracks">
    <!-- leave blank, or place error message here. -->
</div>
```

then you should be good to go.

for troubleshooting, hit f12 and go to "console" for error messages.


## how does it work?

this script uses an api i wrote to get data from spotify. it can do more than just retrieving songs from a public playlist, access for others and documentation for this is in the works! ahhh!!!

but for starters, using this template script, here are the points of customization:

| variable name      | data type | purpose                                              | default value      |
|--------------------|-----------|------------------------------------------------------|--------------------|
| `PLAYLIST_ID`      | string    | your playlist's spotify id.                          | `"playlist-id-here"`   
| `ELEMENT_ID`       | string    | id for where you wish to display top artists.        | `"playlist-tracks"`
| `TRACK_COUNT`      | number    | maximum number of tracks retrieved.                   | `5`

if you desire further customization [ie: displaying with a different format], that can be done manually by editing the contents of the `displayItems()` function.

full documentation for this api is pending.
