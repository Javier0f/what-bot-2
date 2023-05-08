const { ipcRenderer } = require('electron');
const qrcode = require('qrcode');
const canvas = document.getElementById('canvas');
const buffering = document.getElementById('buffering');

ipcRenderer.on('QR',function(event,qr){

    buffering.hidden = true;

    qrcode.toCanvas(canvas,qr,err=>{
        console.log(err)
    });
})