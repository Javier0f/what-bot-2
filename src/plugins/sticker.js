async function responder(message,client){

    if (message.hasMedia == false){return}
    
    if (
        message.body == '.sticker' &&
        (media.mimetype == 'image/jpeg' ||
        media.mimetype == 'image/jpg')
    ){
        let media = await message.downloadMedia();
        let contact = await message.getContact();
        
        client.sendMessage(message.from,media,{
            sendMediaAsSticker: true,
        });
    
        client.sendMessage(message.from, `@${contact.id.user}`,{
        mentions:[contact]
        })
        
    }


}

exports.module = responder;