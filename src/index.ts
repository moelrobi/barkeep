// Import libary for usage
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import TrelloClient from "./util/Trello";
import { ContextMenu, SlashCommand } from 'src/types';
import { join } from 'path';
import { readdirSync } from 'fs';
import Logger from './util/Logger';
import CommandApplicationLoader from './handlers/CommandApplicationLoader';

// Set constans
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({intents: [Guilds, MessageContent, GuildMessages, GuildMembers]});

// Load configuration
const config = require('../config/config.json');

client.cooldowns = new Collection<string, number>();
client.contextMenus = new Collection<string, ContextMenu>();
client.slashCommands = new Collection<string, SlashCommand>();
client.config = config;
client.logger = new Logger(client);
client.trello = new TrelloClient(client);

new CommandApplicationLoader(client, config).load();
require('./handlers/Event')(client);

// Login the bot.
client.login(config.token);