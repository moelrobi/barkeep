import { EmbedBuilder } from "@discordjs/builders";
import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "src/types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Zeigt dir den akutellen Ping vom Bot an."),
    execute: interaction => {
        if(!interaction.isRepliable()) return;
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`🏓 Pong!\n${interaction.client.ws.ping}`)
            ]
        })
    },
    cooldown: 10
}

export default command;