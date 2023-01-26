import { Client } from 'discord.js';
import { BotEvent } from 'src/types';
import { color } from 'src/util/Color';

const event: BotEvent = {
    name: 'ready',
    once: true,
    execute: (client: Client) => {
        console.log(color('info', `👋 Logged in as ${color('variable', client.user?.tag)}`));
    }
}