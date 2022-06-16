const express = require('express')
const app = express();
const http = require('http');

const expressServer = http.createServer(app);

app.use(express.static(__dirname+"/public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

const PORT = process.env.PORT||3000;
expressServer.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


//socket
const io = require('socket.io')(expressServer);
io.on('connection',(socket)=>{
    console.log("connected");

    //hearing from client
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})
