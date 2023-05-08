async function interfaz(message,client,webContentsSend){

    let msg = {
        constact: await message.getContact(),
        chat: await message.getChat(),
        body: message.body
    }

    let msg_media = {
        constact: await message.getContact(),
        chat: await message.getChat(),
        body: message.body,
        media: await message.downloadMedia()
    }

    message.hasMedia ? webContentsSend("MEDIA", msg_media) : webContentsSend("MESSAGE", msg) ;
}

exports.module = interfaz;