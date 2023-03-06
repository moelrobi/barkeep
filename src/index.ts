// Import libary for usage
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import TrelloClient from "./util/Trello";
import { ContextMenu } from 'src/types';
import { join } from 'path';
import { readdirSync } from 'fs';
import Logger from './util/Logger';

// Set constans
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({intents: [Guilds, MessageContent, GuildMessages, GuildMembers]});

// Load configuration
const config = require('../config/config.json');

client.cooldowns = new Collection<string, number>();
client.contextMenus = new Collection<string, ContextMenu>();
client.config = config;
client.logger = new Logger(client);
client.trello = new TrelloClient(client);

// Load handlers responsible for registing Bot features
const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client, config);
})

// Login the bot.
client.login(config.token);