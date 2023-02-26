import { BotEvent, ContextMenu, SlashCommand } from "src/types";
import { Interaction } from "discord.js";

const event: BotEvent = {
    name: "interactionCreate",
    execute: (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            let command : SlashCommand = interaction.client.slashCommands.get(interaction.commandName);
            let cooldown : number = interaction.client.cooldowns.get(`${interaction.commandName}-${interaction.user.tag}`);
            if (!command) return;
            if (command.cooldown && cooldown) {
                if (Date.now() < cooldown) {
                    interaction.reply(`Hey! Du musst noch ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} Sekunden warten bis du den Befehl wieder nutzen kannst.`);
                    setTimeout(() => interaction.deleteReply(), 5000);
                }
                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.tag}`, Date.now() + command.cooldown * 1000);

                setTimeout(() => {
                    interaction.client.cooldowns.delete(`${interaction.commandName}-${interaction.user.tag}`);
                }, command.cooldown * 1000);
            } else if (command.cooldown && !cooldown) {
                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.tag}`, Date.now() + command.cooldown * 1000);
            }

            command.execute(interaction);
        }

        if(interaction.isContextMenuCommand()) {
            let menu : ContextMenu = interaction.client.contextMenus.get(interaction.commandName);

            if(!menu) return;
            menu.execute(interaction);
        }
    }
}

export default event 