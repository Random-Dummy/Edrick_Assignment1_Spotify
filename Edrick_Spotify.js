class Song {
    static #songID = 1;
    constructor(title, artist, album, duration, genre, dateAdded, streamCount) {
        this.id = Song.#songID++;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.genre = genre;
        this.dateAdded = dateAdded;
        this.streamCount = streamCount;
    }
}

class User {
    static #userID = 1;
    constructor(username) {
        this.id = User.#userID++;
        this.username = username;
    }
}

class Playlist {
    static #playlistID = 1;
    constructor(name, user, songsID) {
        this.id = Playlist.#playlistID++;
        this.name = name;
        this.user = user;
        this.songsID = songsID;
    }
}

let userList = [new User("Adrian"), new User("Blair"), new User("Calvin")];
let songList = [
    new Song("Blinding Lights", "The Weeknd", "After Hours", 200, ["Synthwave", "Pop"], "2019-11-29", 5000000),
    new Song("Levitating", "Dua Lipa", "Future Nostalgia", 203, ["Disco", "Pop"], "2020-11-27", 3000000),
    new Song("Peaches", "Justin Bieber", "Justice", 198, ["R&B", "Pop"], "2021-03-19", 2500000),
    new Song("Good 4 U", "Olivia Rodrigo", "Sour", 193, ["Pop", "R&B"], "2021-05-21", 2000000),
    new Song("Positions", "Ariana Grande", "Positions", 193, ["Pop", "R&B"], "2020-10-30", 1500000),
];
let playlistList = [
    new Playlist("My Favorites", userList[0], [songList[0].id, songList[1].id, songList[2].id]),
    new Playlist("Chill Vibes", userList[1], [songList[2].id, songList[3].id]),
    new Playlist("Workout Mix", userList[2], [songList[0].id, songList[4].id]),
];

module.exports = {
    // Get all users, songs, and playlists
    getUsers: () => userList.map(user => ({ ...user })),
    getSongs: () => songList.map(song => ({ ...song })),
    getPlaylists: () => playlistList.map(playlist => ({ ...playlist })),

    // Add new user, song, or playlist
    addUser: (username) => {
        const newUser = new User(username);
        userList.push(newUser);
        return newUser;
    },
    addSong: (title, artist, album, duration, genre, dateAdded, streamCount) => {
        const newSong = new Song(title, artist, album, duration, genre, dateAdded, streamCount);
        songList.push(newSong);
        return newSong;
    },
    addPlaylist: (name, user, songsID) => {
        const newPlaylist = new Playlist(name, user, songsID);
        playlistList.push(newPlaylist);
        return newPlaylist;
    },
    
    // Delete user, song, or playlist by ID
    deleteUser: (id) => { userList = userList.filter(user => user.id !== id); },
    deleteSong: (id) => { songList = songList.filter(song => song.id !== id); },
    deletePlaylist: (id) => { playlistList = playlistList.filter(playlist => playlist.id !== id); },

    // =====================Custom/Additional features======================

    // Get top 5 songs by stream count
    getTopSongs: () => [...songList].sort((a, b) => b.streamCount - a.streamCount).slice(0, 5),

    // Get songs that match ANY of the provided genres
    getSongsByGenres: (genres) => songList.filter(song => genres.some(genre => song.genre.includes(genre))),

    // Get all playlists created by specified userID
    getPlaylistsByUser: (userID) => playlistList.filter(playlist => playlist.user.id === userID),

    // Update song information
    updateSong: (songID, updates) => {
        const song = songList.find(s => s.id === songID);
        if (!song) {
            return { success: false, message: "Song not found" };
        }
        try {
            if (updates.title) song.title = updates.title;
            if (updates.artist) song.artist = updates.artist;
            if (updates.album) song.album = updates.album;
            if (updates.duration) song.duration = updates.duration;
            if (updates.genre) song.genre = updates.genre;
            if (updates.dateAdded) song.dateAdded = updates.dateAdded;
            if (updates.streamCount) song.streamCount = updates.streamCount;
            return { success: true, message: "Song updated successfully", song: song };
        } catch (error) {
            return { success: false, message: `Unable to update: ${error.message}` };
        }
    },

    // Update playlist information
    updatePlaylist: (playlistID, updates) => {
        const playlist = playlistList.find(p => p.id === playlistID);
        if (!playlist) {
            return { success: false, message: "Playlist not found" };
        }
        try {
            if (updates.name) playlist.name = updates.name;
            if (updates.user) playlist.user = updates.user;
            if (updates.songsID) playlist.songsID = updates.songsID;
            return { success: true, message: "Playlist updated successfully", playlist: playlist };
        } catch (error) {
            return { success: false, message: `Unable to update: ${error.message}` };
        }
    },

    // Get a playlist by ID (shallow copy)
    getPlaylistById: (playlistID) => {
        const p = playlistList.find(pl => pl.id === playlistID);
        return p ? { ...p } : null;
    },

    // Return full song objects for a playlist (skips missing songs)
    getPlaylistSongs: (playlistID) => {
        const playlist = playlistList.find(p => p.id === playlistID);
        if (!playlist) return { success: false, message: "Playlist not found", songs: [] };
        const songs = playlist.songsID.map(id => songList.find(s => s.id === id)).filter(Boolean);
        return { success: true, songs };
    },

    // Add a song ID to a playlist (optionally prevent duplicates)
    addSongToPlaylist: (playlistID, songID, { allowDuplicates = true } = {}) => {
        const playlist = playlistList.find(p => p.id === playlistID);
        const song = songList.find(s => s.id === songID);
        if (!playlist) return { success: false, message: "Playlist not found" };
        if (!song) return { success: false, message: "Song not found" };
        if (!allowDuplicates && playlist.songsID.includes(songID)) {
            return { success: false, message: "Song already in playlist" };
        }
        playlist.songsID.push(songID);
        return { success: true, message: "Song added", playlist };
    },

    // Remove a song from a playlist by index (supports negative indices)
    removeSongFromPlaylist: (playlistID, index) => {
        const playlist = playlistList.find(p => p.id === playlistID);
        if (!playlist) return { success: false, message: "Playlist not found" };
        if (typeof index !== 'number' || !Number.isInteger(index)) {
            return { success: false, message: "Invalid index" };
        }
        const len = playlist.songsID.length;
        // allow negative indices to count from the end
        if (index < 0) index = len + index;
        if (index < 0 || index >= len) return { success: false, message: "Index out of range" };
        const [removedID] = playlist.songsID.splice(index, 1);
        return { success: true, message: "Song removed", removedSongID: removedID, playlist };
    },
    
    // Move a song to a new index inside a playlist
    moveSongInPlaylist: (playlistID, songID, newIndex) => {
        const playlist = playlistList.find(p => p.id === playlistID);
        if (!playlist) return { success: false, message: "Playlist not found" };
        const idx = playlist.songsID.indexOf(songID);
        if (idx === -1) return { success: false, message: "Song not in playlist" };
        // clamp index
        newIndex = Math.max(0, Math.min(newIndex, playlist.songsID.length - 1));
        playlist.songsID.splice(idx, 1);
        playlist.songsID.splice(newIndex, 0, songID);
        return { success: true, message: "Song moved", playlist };
    },

    // Clear all songs from a playlist
    clearPlaylist: (playlistID) => {
        const playlist = playlistList.find(p => p.id === playlistID);
        if (!playlist) return { success: false, message: "Playlist not found" };
        playlist.songsID = [];
        return { success: true, message: "Playlist cleared", playlist };
    }
}