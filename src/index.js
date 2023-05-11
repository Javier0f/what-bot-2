const exp = require('constants');
const path = require('path');
const url = require('url');
const fs = require('fs');
const { ipcRenderer } = require('electron');

const viewIndex = [
    url.format({
        pathname: path.join(__dirname, '/views/main/view.html'),
        protocol: 'File',
        slashes: true,
    }),
    url.format({
        pathname: path.join(__dirname, '/views/qr/view.html'),
        protocol: 'File',
        slashes: true
    })
]

exports.viewIndex = viewIndex;

const templateMenu = [
    {role: 'reload'},
    {role: 'toggleDevTools'}
]

exports.templateMenu = templateMenu;

const templateMenuQr = [
    {
        label: 'Cerrar Sesión',
        click: ()=>{
            ipcRenderer.send("Close",'');
        }
    },
    {role:'reload'}
]

exports.templateMenuQr = templateMenuQr;