const http = require("http");
const fs = require("fs");

const { Player } = require("./game/class/player");
const { World } = require("./game/class/world");

const worldData = require("./game/data/basic-world-data");

let player;
let world = new World();
world.loadWorld(worldData);

const server = http.createServer((req, res) => {
  /* ============== ASSEMBLE THE REQUEST BODY AS A STRING =============== */
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    // After the assembly of the request body is finished
    /* ==================== PARSE THE REQUEST BODY ====================== */
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    }

    /* ======================== ROUTE HANDLERS ========================== */
    // Phase 1: GET /
    if ((req.method = "GET" && req.url === "/")) {
      const newPlayer = fs.readFileSync("./views/new-player.html", "utf-8");
      const resBody = newPlayer.replace(
        /#{availableRooms}/g,
        world.availableRoomsToString()
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(resBody);
      return res.end();
    }
    // Phase 2: POST /player
    if ((req.method = "POST" && req.url === "/player")) {
      const { name, roomId } = req.body;
      const room = world.rooms[roomId];
      player = new Player(name, room);
      console.log(player);
      res.statusCode = 302;
      res.setHeader("Location", `/rooms/${player.currentRoom.id}`);
      return res.end();
    }
    // Phase 3: GET /rooms/:roomId
    if (
      (req.method = "GET" && req.url.startsWith("/rooms/")) &&
      req.url.split("/").length === 3
    ) {
      const room = fs.readFileSync("./views/room.html", "utf-8");
      const resBody = room
        .replace(/#{roomName}/g, player.currentRoom.name)
        .replace(/#{inventory}/g, player.inventoryToString())
        .replace(/#{roomItems}/g, player.currentRoom.itemsToString())
        .replace(/#{exits}/g, player.currentRoom.exitsToString());
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(resBody);
      return res.end();
    }

    // Phase 4: GET /rooms/:roomId/:direction
    if (
      (req.method = "GET" && req.url.startsWith("/rooms/")) &&
      req.url.split("/").length === 4
    ) {
      let urlArray = req.url.split("/");
      let roomId = urlArray[2];
      let direction = urlArray[3];
      if (!(player.currentRoom.id == roomId)) {
        res.statusCode = 302;
        res.setHeader("Location", `/rooms/${player.currentRoom.id}`);
        return res.end();
      }
      player.move(direction[0].toLowerCase());
      res.statusCode = 302;
      res.setHeader("Location", `/rooms/${player.currentRoom.id}`);
      return res.end();
    }
    // Phase 5: POST /items/:itemId/:action

    // Phase 6: Redirect if no matching route handlers
  });
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
