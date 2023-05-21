import { Client, ContextMenuCommandBuilder, REST, RESTPostAPIApplicationCommandsJSONBody, Routes, SlashCommandBuilder } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { ContextMenu, SlashCommand } from 'src/types';
import { color } from '../util/Color';

module.exports = (client: Client): Array<RESTPostAPIApplicationCommandsJSONBody> => {
    const slashCommands: SlashCommandBuilder[] = []
    let commandsDir = join(__dirname, '../commands');

    readdirSync(commandsDir).forEach(file => {
        if(!file.endsWith('.js')) return;
        let command: SlashCommand = require(`${commandsDir}/${file}`).default;
        slashCommands.push(command.command);
        client.slashCommands.set(command.command.name, command);
        console.log(color('info', `✅ | Loaded slash command ${color('variable', command.command.name)}.`));
    })
    
    return slashCommands.map(coms => coms.toJSON());
}