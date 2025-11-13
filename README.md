# Assignment 1

You will only need one file, ie, your node module, for this assignment.

In this readme file, describe how to use your node module. It could be similar to **app.js** from Lab2, where you call some functions in your node module and display the output. Describe how to setup your node module, if any. Describe how to call the functions, what parameters required and so on.

You can press **Ctrl+Shift+V** in this file in Visual Studio Code to see a live preview of the readme file.

For some tips in formatting text in readme file, refer to  
👉 [GitHub Markdown Syntax Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

============================================================================================

## 🎵 Description
Using **Spotify** as its base reference, this Node.js module was built to simulate core functionalities of a music streaming platform — such as managing **users**, **songs**, and **playlists**.  
It provides a variety of CRUD operations and additional utilities like sorting, filtering, and playlist management.

---

## ⚙️ Setup Instructions

1. **Clone or download** this repository to your local system.
2. Ensure **Node.js** is installed on your machine.
3. In your project folder, make sure the files are structured like this:
   ```
   /project-folder
   ├── app.js
   ├── test.js
   └── README.md
   ```
4. To run the demonstration, execute the following command in your terminal:
   ```bash
   node app.js
   ```

This will showcase all module features and display output directly in the console.

---

## 📦 Module Overview

The module (`test.js`) exports various functions to interact with **Users**, **Songs**, and **Playlists**.

### Importing the Module
```js
const spotify = require('./test.js');
```

---

## 🧍 User Functions

| Function | Description | Parameters | Returns |
|-----------|--------------|-------------|----------|
| `getUsers()` | Get all users | None | Array of user objects |
| `addUser(username)` | Add a new user | `username` *(string)* | Newly created user object |
| `deleteUser(id)` | Delete user by ID | `id` *(number)* | None |

---

## 🎶 Song Functions

| Function | Description | Parameters | Returns |
|-----------|--------------|-------------|----------|
| `getSongs()` | Get all songs | None | Array of song objects |
| `addSong(title, artist, album, duration, genre, dateAdded, streamCount)` | Add a new song | Various song info fields | Newly created song object |
| `deleteSong(id)` | Delete a song by ID | `id` *(number)* | None |
| `updateSong(songID, updates)` | Update song details | `songID` *(number)*, `updates` *(object)* | Success or error message |
| `getTopSongs()` | Get top 5 songs by stream count | None | Array of top songs |
| `getSongsByGenres(genres)` | Filter songs by genre(s) | `genres` *(array of strings)* | Array of matching songs |

---

## 🎧 Playlist Functions

| Function | Description | Parameters | Returns |
|-----------|--------------|-------------|----------|
| `getPlaylists()` | Get all playlists | None | Array of playlists |
| `addPlaylist(name, userID, songsID)` | Create a new playlist | `name` *(string)*, `userID` *(number)*, `songsID` *(array)* | Playlist object or error |
| `deletePlaylist(id)` | Delete playlist by ID | `id` *(number)* | None |
| `getPlaylistsByUser(userID)` | Get playlists for a specific user | `userID` *(number)* | Array of playlists |
| `getPlaylistById(playlistID)` | Get a playlist by ID | `playlistID` *(number)* | Playlist object |
| `getPlaylistSongs(playlistID)` | Get all songs in a playlist | `playlistID` *(number)* | Song objects |
| `updatePlaylist(playlistID, updates)` | Update playlist name, user, or songs | `playlistID` *(number)*, `updates` *(object)* | Updated playlist info |
| `addSongToPlaylist(playlistID, songID, { allowDuplicates })` | Add a song to a playlist | `playlistID`, `songID`, optional `{ allowDuplicates }` *(boolean)* | Result message |
| `removeSongFromPlaylist(playlistID, index)` | Remove song by index (supports negative index) | `playlistID`, `index` *(number)* | Result message |
| `moveSongInPlaylist(playlistID, songID, newIndex)` | Move a song to a different position | `playlistID`, `songID`, `newIndex` *(number)* | Result message |
| `clearPlaylist(playlistID)` | Remove all songs from playlist | `playlistID` *(number)* | Result message |

---

## 💻 Example Usage (from `app.js`)

```js
const spotify = require('./test.js');

console.log("===== 🎵 SPOTIFY DATABASE DEMO =====");

// 1️⃣ Show all users, songs, and playlists
console.table(spotify.getUsers());
console.table(spotify.getSongs());
console.table(spotify.getPlaylists());

// 2️⃣ Add new items
const user = spotify.addUser("Diana");
const song = spotify.addSong("Save Your Tears", "The Weeknd", "After Hours", 215, ["Pop"], "2021-01-05", 4500000);
const playlist = spotify.addPlaylist("Diana’s Mix", user.id, [song.id]);

// 3️⃣ Update data
spotify.updateSong(song.id, { title: "Save Your Tears (Remix)", streamCount: 4700000 });
spotify.updatePlaylist(playlist.id, { name: "Diana’s Favorites" });

// 4️⃣ Advanced features
console.table(spotify.getTopSongs());
console.table(spotify.getSongsByGenres(["Pop", "R&B"]));
console.table(spotify.getPlaylistsByUser(user.id));

// 5️⃣ Playlist management
spotify.addSongToPlaylist(playlist.id, 1);          // Add Blinding Lights
spotify.moveSongInPlaylist(playlist.id, 1, 0);      // Move song
spotify.removeSongFromPlaylist(playlist.id, -1);    // Remove last song
spotify.clearPlaylist(playlist.id);                 // Clear all songs
```

---

## 🧾 Notes
- All IDs are auto-incremented.
- Data is stored **in-memory** (not persistent between runs).
- Invalid IDs or parameters return informative error messages.

---

## 📚 References
Provide the references that you have used to support your assignment. 

### Website used as reference:
[https://open.spotify.com/](https://open.spotify.com/)