"use strict";
const { PluginManager } = require('./PluginManager.js');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const { viewIndex, templateMenu, templateMenuQr } = require('./index');
const path = require('path');
const fs = require('fs');

var win;


function madeMainWindow() {
	win = new BrowserWindow({
		width: 1080,
		height: 780,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})

	win.loadURL(viewIndex[1]);
	win.on('close', function () {
		client.destroy()
			.then(app.quit)
			.catch(e => console.log(e))
	})
};

function webContentsSend(channel = new String(), args) {
	win.webContents.send(channel, args)
}

ipcMain.on('Close', function () {
	client.destroy()
		.then(app.relaunch)
		.catch(err => console.log(err));
});

app.on('ready', madeMainWindow)

// ###########+- Whatsapp cliente -+########### //

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const SESSION_PATH = path.join(__dirname, "session");


const client = new Client({
	authStrategy: new LocalAuth({
		dataPath: SESSION_PATH
	})
})

const pluginManager = new PluginManager();

setInterval(function () {
	pluginManager.loadPlugins();
}, 1000);

client.on('qr', function (qr) {
	win.loadURL(viewIndex[1]);

	setTimeout(function () {
		webContentsSend("QR", qr);
	}, 1000)
})

client.on('authenticated', () => { webContentsSend('HideCanvas', '') })

client.on('ready', function () {
	win.loadURL(viewIndex[0]);

	const menu = Menu.buildFromTemplate(templateMenu);
	Menu.setApplicationMenu(menu);

	const files_plugins_name = path.join(__dirname, 'views', 'main', 'files_plugin.json');
	fs.writeFileSync(
		files_plugins_name,
		JSON.stringify(pluginManager.files)
	);
})

client.on('message', function (msg) {


	msg.getContact().then(function (chat) {
		chat.id.user
	})

	pluginManager.plugins.forEach(async function (plugin) {
		await plugin.module(msg, client, webContentsSend);
	})
})

console.log("Iniciando Cliente")
client.initialize();