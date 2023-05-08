const { randomInt } = require('crypto');
const fs = require('fs');
const path = require('path');

async function download(message){
    
    if (message.hasMedia){
        
        let media = await message.downloadMedia();
    
        const pahtDownload = path.join(__dirname,'../', 'download/');
        const randName = pahtDownload + randomInt(100,100000).toString();

        switch(media.mimetype){
            case 'image/webp':{
                fs.writeFileSync(
                    randName + ".jpg",
                    media.data,
                    {encoding:'base64'}
                )
            } break;
            case 'image/jpeg':{
                fs.writeFileSync(
                    randName + ".jpg",
                    media.data,
                    {encoding:'base64'}
                )
            } break;
            case 'audio/ogg; codecs=opus':{
                fs.writeFileSync(
                    randName + ".ogg",
                    media.data,
                    {encoding:'base64'}
                )
            } break;
            case 'video/mp4':{
                fs.writeFileSync(
                    randName + ".mp4",
                    media.data,
                    {encoding:'base64'}
                )
            } break;
            default:{
                console.log(media.mimetype);
                return 1;
            }
        }
    }
}

exports.module = download;