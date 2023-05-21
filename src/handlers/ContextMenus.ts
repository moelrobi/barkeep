import { Client, ContextMenuCommandBuilder, REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { ContextMenu } from 'src/types';
import { color } from '../util/Color';

module.exports = (client: Client): Array<RESTPostAPIApplicationCommandsJSONBody> => {
    const contextMenus: ContextMenuCommandBuilder[] = []
    let menusDir = join(__dirname, '../menus');

    readdirSync(menusDir).forEach(file => {
        if(!file.endsWith('.js')) return;
        let command: ContextMenu = require(`${menusDir}/${file}`).default;
        contextMenus.push(command.menu);
        client.contextMenus.set(command.menu.name, command);
        console.log(color('info', `✅ | Loaded context menu ${color('variable', command.menu.name)}.`));
    })
    
    return contextMenus.map(menu => menu.toJSON());
}