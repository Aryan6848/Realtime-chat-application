var socket = io();

const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer= document.querySelector(".container");


const namee = prompt("Enter your name to join");
//jaise hi user apna naam input kare hm socket ko ek evxfvdgrfhent emit kre new-user joined k name se ar ye new-user joined event isko listen kiya h hamne server pr 

var audio = new Audio('ting.mp3')
form.addEventListener('submit',(e)=>{
    e.preventDefault(); // isse page reload nhi hoga
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);//apne node server ko bata denge ki ye message send kr rhe  
    messageInput.value='';
})




const append = (message, position)=>{
      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      messageElement.classList.add('message');
      messageElement.classList.add(position);
      messageContainer.append(messageElement); 
      if(position=='left'){
      audio.play();
      }

      messageContainer.scrollTop = messageContainer.scrollHeight;
}

socket.emit('new-user-joined', namee);  

socket.on('user-joined',name=>{
   append(`${name} joined the chat`,'right');
}) 

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`,'left');
})

//listening leave event from server

socket.on('left',name =>{
    append(`${name} left the chat`,'left');
})