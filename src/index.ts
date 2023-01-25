// Import libary for usage
import { Client, GatewayIntentBits } from "discord.js"
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents: [Guilds, MessageContent, GuildMessages, GuildMembers]});

// Load configuration
const config = require('../config/config.json');

// Login the bot.
client.login(config.token);