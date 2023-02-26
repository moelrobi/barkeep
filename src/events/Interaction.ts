import { BotEvent, ContextMenu } from "src/types";
import { Interaction } from "discord.js";

const event: BotEvent = {
    name: "interactionCreate",
    execute: (interaction: Interaction) => {
        if (!interaction.isContextMenuCommand()) return;
        let menu: ContextMenu = interaction.client.contextMenus.get(interaction.commandName);

        if (!menu) return;
        menu.execute(interaction);
    }
}

export default event 