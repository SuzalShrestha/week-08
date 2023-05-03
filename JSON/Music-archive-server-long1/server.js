const http = require("http");
const fs = require("fs");

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync("./seeds/artists.json"));
let albums = JSON.parse(fs.readFileSync("./seeds/albums.json"));
let songs = JSON.parse(fs.readFileSync("./seeds/songs.json"));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    // finished assembling the entire request body
    // Parsing the body of the request depending on the "Content-Type" header
    if (reqBody) {
      switch (req.headers["content-type"]) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ========================== ROUTE HANDLERS ========================== */

    // Your code here
    //1
    if (req.method === "GET" && req.url === "/artists") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(artists));
      return res.end();
    }
    //2
    if (
      req.method === "GET" &&
      req.url.startsWith("/artists/") &&
      req.url.split("/").length === 3
    ) {
      const artistId = parseInt(req.url.split("/")[2]);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(artists[artistId]));
      return res.end();
    }
    //3
    if (req.method === "POST" && req.url === "/artists") {
      const artistId = getNewArtistId();
      const newArtist = {};
      newArtist.artistId = artistId;
      newArtist.name = req.body.name;
      artists[artistId] = newArtist;

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(artists[artistId]));
      return res.end();
    }
    //4
    if (req.method === "PUT" && req.url.startsWith("/artists")) {
      const artistID = parseInt(req.url.split("/")[2]);
      artists[artistID].name = req.body.name;
      artists[artistID].updatedAt = new Date();

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(artists[artistID]));
      return res.end();
    }
    //5
    if (req.method === "DELETE" && req.url.startsWith("/artists")) {
      const artistID = parseInt(req.url.split("/")[2]);
      delete artists[artistID];
      const sucessMsg = {};
      sucessMsg.message = "Artist deleted successfully";

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(sucessMsg));
      return res.end();
    }
    //6
    if (
      req.method === "GET" &&
      req.url.startsWith("/artists") &&
      req.url.split("/")[3] === "albums"
    ) {
      const artistId = req.url.split("/")[2];
      const artistAlbums = albums[artistId];

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(artistAlbums));
      return res.end();
    }
    //7
    if (
      req.method === "GET" &&
      req.url.startsWith("/albums") &&
      req.url.split("/").length === 3
    ) {
      const albumId = req.url.split("/")[2];
      const result = albums[albumId];
      result.artist = artists[result.artistId];
      result.songs = songs[albumId];

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(result));
      return res.end();
    }
    //8
    if (
      req.method === "POST" &&
      req.url.startsWith("/artists") &&
      req.url.split("/")[3] === "albums"
    ) {
      const newAlbum = {};
      const artistId = req.url.split("/")[2];
      const albumId = getNewAlbumId();
      newAlbum.name = req.body.name;
      newAlbum.albumId = albumId;
      newAlbum.artistId = artistId;
      albums[albumId] = newAlbum;

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(newAlbum));
      return res.end();
    }
    //9
    if (
      req.method === "PUT" &&
      req.url.startsWith("/albums") &&
      req.url.split("/").length === 3
    ) {
      const albumId = req.url.split("/")[2];
      albums[albumId].name = req.body.name;
      albums[albumId].updatedAt = new Date();

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(albums[albumId]));
      return res.end();
    }
    //10
    if (
      req.method === "DELETE" &&
      req.url.startsWith("/albums") &&
      req.url.split("/").length === 3
    ) {
      const albumId = req.url.split("/")[2];
      delete albums[albumId];
      const sucessMsg = {};
      sucessMsg.message = "Album deleted successfully";

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(sucessMsg));
      return res.end();
    }
    //11
    if (
      req.method === "GET" &&
      req.url.startsWith("/artists") &&
      req.url.split("/")[3] === "songs"
    ) {
      const artistId = req.url.split("/")[2];
      const artistSongs = songs[artistId];
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(artistSongs));
      return res.end();
    }
    //12
    if (
      req.method === "GET" &&
      req.url.startsWith("/albums") &&
      req.url.split("/")[3] === "songs"
    ) {
      const albumId = req.url.split("/")[2];
      let albumSongs;
      for (let i = 1; i <= Object.keys(songs).length; i++) {
        if (songs[i].albumId == albumId) {
          albumSongs = songs[i];
        }
      }
      if (!albumSongs) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write("Album not found");
        return res.end();
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(albumSongs));
      return res.end();
    }
    //13
    if (
      (req.method =
        "GET" &&
        req.url.startsWith("/trackNumbers") &&
        req.url.split("/")[3] === "songs")
    ) {
      const trackNumber = req.url.split("/")[2];
      let trackSongs;
      for (let i = 1; i <= Object.keys(songs).length; i++) {
        if (songs[i].trackNumber == trackNumber) {
          trackSongs = songs[i];
        }
      }
      if (!trackSongs) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write("Track number not found");
        return res.end();
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(trackSongs));
      return res.end();
    }
    //14
    if (
      req.method === "GET" &&
      req.url.startsWith("/songs") &&
      req.url.split("/").length === 3
    ) {
      const songId = req.url.split("/")[2];
      for (let i = 1; i <= Object.keys(songs).length; i++) {
        if (songs[i].songId == songId) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify(songs[i]));
          return res.end();
        }
      }
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write("Song not found");
      return res.end();
    }
    //15
    if (
      req.method === "POST" &&
      req.url.startsWith("/albums") &&
      req.url.split("/")[3] === "songs"
    ) {
      const newSong = {};
      const albumId = req.url.split("/")[2];
      const songId = getNewSongId();
      newSong.name = req.body.name;
      newSong.lyrics = req.body.lyrics;
      newSong.trackNumber = req.body.trackNumber;
      newSong.songId = songId;
      newSong.albumId = albumId;
      songs[songId] = newSong;

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(newSong));
      return res.end();
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write("Endpoint not found");
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
