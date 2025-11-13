const spotify = require('./test.js');

console.log("===== 🎵 SPOTIFY DATABASE DEMO =====");

// Show all users, songs, and playlists
console.log("\n--- Users ---");
console.table(spotify.getUsers());

console.log("\n--- Songs ---");
console.table(spotify.getSongs().map(s => ({
    id: s.id, title: s.title, artist: s.artist, streams: s.streamCount
})));

console.log("\n--- Playlists ---");
console.table(spotify.getPlaylists());

// Add a new user, song, and playlist
console.log("\n--- Adding new user ---");
const newUser = spotify.addUser("Diana");
console.log("Added:", newUser);

console.log("\n--- Adding new song ---");
const newSong = spotify.addSong(
    "Save Your Tears", "The Weeknd", "After Hours", 215,
    ["Pop"], "2021-01-05", 4500000
);
console.log("Added:", newSong);

console.log("\n--- Adding new playlist ---");
const newPlaylist = spotify.addPlaylist("Diana’s Mix", newUser.id, [newSong.id]);
console.log("Added:", newPlaylist);

// Update song and playlist
console.log("\n--- Updating song ---");
console.log(spotify.updateSong(newSong.id, { streamCount: 4700000, title: "Save Your Tears (Remix)" }));

console.log("\n--- Updating playlist name ---");
console.log(spotify.updatePlaylist(newPlaylist.id, { name: "Diana’s Favorites" }));

// Get top songs
console.log("\n--- Top 5 Songs ---");
console.table(spotify.getTopSongs().map(s => ({
    id: s.id, title: s.title, streams: s.streamCount
})));

// Filter songs by genre
console.log("\n--- Songs with genre 'Pop' or 'R&B' ---");
console.table(spotify.getSongsByGenres(["Pop", "R&B"]).map(s => ({
    id: s.id, title: s.title, genre: s.genre.join(", ")
})));

// Get playlists by user
console.log("\n--- Playlists by user Diana ---");
console.table(spotify.getPlaylistsByUser(newUser.id));

// Playlist management
console.log("\n--- Adding a song to Diana’s playlist ---");
console.log(spotify.addSongToPlaylist(newPlaylist.id, 1)); // add Blinding Lights

console.log("\n--- Playlist Songs (after adding) ---");
console.log(spotify.getPlaylistSongs(newPlaylist.id));

console.log("\n--- Move song inside playlist ---");
console.log(spotify.moveSongInPlaylist(newPlaylist.id, 1, 0));

console.log("\n--- Remove last song from playlist ---");
console.log(spotify.removeSongFromPlaylist(newPlaylist.id, -1));

console.log("\n--- Clear playlist ---");
console.log(spotify.clearPlaylist(newPlaylist.id));

console.log("\n--- Final state of playlist ---");
console.table(spotify.getPlaylists());

// Delete items
console.log("\n--- Deleting user Diana, song Save Your Tears, and playlist ---");
spotify.deleteUser(newUser.id);
spotify.deleteSong(newSong.id);
spotify.deletePlaylist(newPlaylist.id);

// Final summary
console.log("\n===== ✅ FINAL DATABASE STATE =====");
console.log("Users:", spotify.getUsers().length);
console.log("Songs:", spotify.getSongs().length);
console.log("Playlists:", spotify.getPlaylists().length);
console.log("===================================");
