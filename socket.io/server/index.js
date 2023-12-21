const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {     // Variable del servidor
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log('User Connected: ', socket.id)

    socket.on("join_room", (data) => { //Emitir el mensaje a todos los clientes conectados menos a ti
        socket.join(data);
    })

    socket.on("send_message", (data) => { //Emitir el mensaje a todos los clientes conectados menos a ti
        socket.to(data.room).emit("receive_message", data);
    })

    
})

server.listen(3001, () => {
    console.log("Listening")
});