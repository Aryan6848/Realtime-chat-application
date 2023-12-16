//Node server which will handle socket IO conncetions 
const express = require('express');
const fs= require("fs");
const app  =express();
const http = require("http");
const { Server }=require ("socket.io");
const path =require("path");

const server = http.createServer(app);
const   socketServer=new Server(server);
app.use(express.static(path.join(__dirname, 'public')))
 
const users = {};

app.get("/", function(req,res){
  res.sendFile(__dirname + "/public/index.html");
})

// app.get("/styles.css", function(req,res){
//   res.sendFile(__dirname + "/public/styles.css");
// })

app.get("/js/client.js", function(req,res){
  res.sendFile(__dirname + "/js/client.js");
})





// C:\Users\hp\Desktop\realtime chat application\index.html

// console.log(io);
socketServer.on('connection',socket => { // jaise hi connection aye is socket m ek arrow function ko run kr do 
    //io.on is socket.io ka instance h jo sare socket connection ko listen krega yani koi bhi connect krega to ye chalega 
   socket.on('new-user-joined', name =>{
        console.log("user joined", name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)//jisne join kiye usko chork sbko event emit(send) krega
   });
  

//    //now chat meassage koi bhej rha tb  
   socket.on('send', message=>{
      //send kiya kisi ne to bakiyo ko  recieve kra do 
      socket.broadcast.emit('recieve',{message: message, name: users[socket.id]})//recieve event ka naam h tm kuch bhi naam rkh skte ho, we will handle all this event on client side
    });

    socket.on('disconnect',message =>{
      console.log("user lef the chat");
      socket.broadcast.emit('left',users[socket.id]);

      delete users[socket.id];
    })
})
   
    server.listen(3000,()=>{
      console.log("server on port 3000");
    })

    socketServer.on("connection", (socket) =>{
      console.log(" a user connected");
    });


    //whenever someone leaves the chat 
   