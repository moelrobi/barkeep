import { Client } from "discord.js";
import { REST, Routes } from "discord.js";
import { color } from "../util/Color";

class CommandApplicationLoader {
    private client: Client;
    private config: any;

    constructor(client: Client, config: any) {
        this.client = client;
        this.config = config;
    }

    load() {
        const contextMenus = require('./ContextMenus')(this.client);
        const slashCommands = require('./SlashCommands')(this.client);

        const allCommands = contextMenus.concat(slashCommands);

        console.log(color('info', `🗞️ | Sending ${allCommands.length} application commmand(s) to discord...`));

        const rest = new REST({version: '10'}).setToken(this.config.token);
        rest.put(Routes.applicationCommands(this.config.appId), {
            body: allCommands
        }).then((data: any) => {
            console.log(color('info', `✅ | Loaded ${data.length} application commmand(s)`));
        }).catch(err => {
            console.error(color('error', err));
        })
    }
}

export default CommandApplicationLoader;