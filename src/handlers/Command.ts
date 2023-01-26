import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { SlashCommand } from 'src/types';
import { color } from 'src/util/Color';

module.exports = (client: Client, config: any) => {
    const slashCommands: SlashCommandBuilder[] = []
    let commandsDir = join(__dirname, '../commands');

    readdirSync(commandsDir).forEach(file => {
        if(!file.endsWith('.js')) return;
        let command: SlashCommand = require(`${commandsDir}/${file}`).default;
        slashCommands.push(command.command);
        client.slashCommands.set(command.command.name, command);
    })

    const rest = new REST({version: '10'}).setToken(config.token);
    rest.put(Routes.applicationCommands(config.appId), {
        body: slashCommands.map(command => command.toJSON())
    }).then((data: any) => {
        console.log(color('info', `✅ | Loaded ${data.length} slash command(s)`));
    }).catch(err => {
        console.error(color('error', err));
    })
}