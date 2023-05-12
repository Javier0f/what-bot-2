const { randomInt } = require('crypto');
const fs = require('fs');
const path = require('path');
const request = require('request');
const CONTACT_PICTURE_PATH = path.join(__dirname, "../", "contactPicture");

async function contactMention(message, client) {

    // if (message.hasQuotedMessage()) {
    //     let msgQ = await message.getQuotedMessage()
    //     let chat = await message.getChat().id._serialized;

    //     client.sendMessage(chatsPrueba._serialized, media, {
    //         sendMediaAsSticker: true
    //     })

    // }
}

exports.module = contactMention;