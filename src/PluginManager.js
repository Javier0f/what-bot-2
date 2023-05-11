"use strict";
const fs = require('fs');
const path = require('path');


class PluginManager {
    constructor() {
        this.plugins = [];
        this.files = [];
    }

    loadPlugins() {
        const pluginsDir = path.join(__dirname, "plugins");
        const pluginsFile = fs.readdirSync(pluginsDir, { encoding: 'utf-8' });

        this.files = pluginsFile

        var newLisplugins = [];
        pluginsFile.forEach(file => {
            const pluginPath = path.join(__dirname, "plugins", file);

            delete require.cache[require.resolve(pluginPath)];
            const plugin = require(pluginPath);

            newLisplugins.push(plugin);
        })

        this.plugins = newLisplugins;
    };
}

exports.PluginManager = PluginManager;