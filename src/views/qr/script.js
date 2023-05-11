const { ipcRenderer } = require('electron');
const qrcode = require('qrcode');
const canvas = document.getElementById('canvas');
const buffering = document.getElementById('buffering');
const btnCerrar = document.getElementById('btb-cerrar');

btnCerrar.addEventListener('click', function(){
    ipcRenderer.send("Close");
});

ipcRenderer.on('QR',function(event,qr){

    buffering.hidden = true;

    qrcode.toCanvas(canvas,qr,err=>{
        console.log(err)
    });
})