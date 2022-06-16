let socket = io();

let Name;
let textarea = document.querySelector("#text-area");
let msg_area = document.querySelector('.message__area');
do{
    Name = prompt("enter your name : ");
}while(!Name);
textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value);
    }
})
function sendMessage(message){
    //will show who has written the message
    let msg ={
        user:Name,
        message:message.trim()
    }

    appendMessage(msg,'outgoing')
    textarea.value='';
    scrollToBottom();

    //send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;
    msg_area.appendChild(mainDiv);
}

//receive messages
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom();
})

function scrollToBottom(){
    msg_area.scrollTop=msg_area.scrollHeight;
}