const path = require('path');
const fs = require('fs');

const CHATS_INDEX_PATH = path.join(__dirname,'../','views','main','chats_index.json');

async function getChats(message,client){

    let chats = await client.getChats()

    let indexChats = []

    chats.forEach(chat => {
        indexChats.push({
            name:chat.name,
            id:chat.id
        })
    });
    
    fs.writeFileSync(CHATS_INDEX_PATH,JSON.stringify(indexChats));
}

exports.module = getChats;