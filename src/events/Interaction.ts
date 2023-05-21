import { BotEvent, ContextMenu } from "src/types";
import { Interaction } from "discord.js";

const event: BotEvent = {
    name: "interactionCreate",
    execute: (interaction: Interaction) => {
        if (interaction.isContextMenuCommand()) {
            let menu: ContextMenu = interaction.client.contextMenus.get(interaction.commandName);

            if (!menu) return;
            menu.execute(interaction);
        }

        if(interaction.isCommand()) {
            let command = interaction.client.slashCommands.get(interaction.commandName);

            if (!command) return;
            command.execute(interaction);
        }
    }
}

export default event 