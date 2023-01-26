// Import libary for usage
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { SlashCommand } from 'src/types';
import { join } from 'path';
import { readdirSync } from 'fs';

// Set constans
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({intents: [Guilds, MessageContent, GuildMessages, GuildMembers]});

// Load configuration
const config = require('../config/config.json');

// Create slash Commands Collection
client.slashCommands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();

// Load
const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client, config);
})

// Login the bot.
client.login(config.token);