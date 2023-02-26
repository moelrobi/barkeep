import { Client, REST, Routes, ContextMenuCommandBuilder } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { color } from '../util/Color';
import { ContextMenu } from "src/types";

module.exports = (client: Client, config: any) => {
    const contextMenus: ContextMenuCommandBuilder[] = []
    let commandsDir = join(__dirname, '../menus');

    readdirSync(commandsDir).forEach(file => {
        if(!file.endsWith('.js')) return;
        let command: ContextMenu = require(`${commandsDir}/${file}`).default;
        contextMenus.push(command.menu);
        client.contextMenus.set(command.menu.name, command);
    })

    const rest = new REST({version: '10'}).setToken(config.token);
    rest.put(Routes.applicationCommands(config.appId), {
        body: contextMenus.map(menu => menu.toJSON())
    }).then((data: any) => {
        console.log(color('info', `✅ | Loaded ${data.length} context menu(s)`));
    }).catch(err => {
        console.log(color('error', err));
    })
}