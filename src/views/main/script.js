const {ipcRenderer} = require('electron');
const path = require('path');
const fs = require('fs');

const main = document.getElementById('main');
const plugins_list = document.getElementById('plugins_list');

function showPlugins(){
    const files_path = path.join(__dirname, 'files_plugin.json');
    
    let files = fs.readFileSync(files_path,{encoding:'utf-8', flag:'r'})
    files = JSON.parse(files);

    files.forEach(element => {
        let plugin = document.createElement('li');
        plugin.classList.add('list-group-item');
        plugin.classList.add('d-flex');
        plugin.classList.add('justify-content-between');
        plugin.classList.add('align-items-center');

        plugin.innerHTML = `
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked="">
            <label class="form-check-label" for="flexSwitchCheckChecked">${element}</label>
        </div>
        `;

        plugins_list.appendChild(plugin);
    });
}
showPlugins();

function showChats(){
    const select = document.getElementById('exampleSelect1');
    const chats_path = path.join(__dirname,'chats_index.json');
    let chats = fs.readFileSync(chats_path,{encoding:'utf-8', flag: 'r'});
    chats = JSON.parse(chats);

    console.log(chats);

    chats.forEach( chat => {
        let option = document.createElement('option');
        option.innerText = chat.name
        select.appendChild(option);
    })
}
showChats();

function newMessage(msg){
    let message = document.createElement('div');
    
    message.innerHTML = `
    <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">
            <span class="badge bg-dark">${msg.chat.name}</span>
            <span class="badge bg-primary">${msg.constact.id.user}</span>
            <span class="badge bg-primary">${msg.constact.pushname}</span>
        </div>
        <div class="card-body">
            <h4 class="card-title"></h4>
            <p class="card-text">${msg.body}</p>
        </div>
    </div>
    `

    return message;
}

function newMessageMedia(msg){
    let message = document.createElement('div');

    message.innerHTML = `
    <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">
            <span class="badge bg-dark">${msg.chat.name}</span>
            <span class="badge bg-primary">${msg.constact.id.user}</span>
            <span class="badge bg-primary">${msg.constact.pushname}</span>
        </div>
        <div class="card-body">
            <h4 class="card-title"></h4>
            <p class="card-text">${msg.body}</p>
            <img src="data:image/jpeg;base64,${msg.media.data}" alt="" srcset="" style="width: 285px;">
        </div>
    </div>
    `

    return message;
}

ipcRenderer.on('MEDIA',function(event,msg){
    main.appendChild(newMessageMedia(msg));
});

ipcRenderer.on('MESSAGE',function(event,msg){
    console.log(msg);
    main.appendChild(newMessage(msg));
});
