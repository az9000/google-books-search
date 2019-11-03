const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
// our server instance
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.GOOGLE_BOOKS_DB_URI || "mongodb://localhost/googleBooks");

const io = socketIO(server);
io.on("connection", socket => {
  console.log("user connected");

  socket.on('book saved', (title) => {
    console.log('Book title: ', title)
    io.sockets.emit('book saved', title)
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});