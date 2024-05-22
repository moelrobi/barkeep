import { EmbedBuilder, Interaction, SlashCommandBuilder, time } from "discord.js";

const command = {
    command: new SlashCommandBuilder()
        .setName('debug')
        .setDescription('Einfach nur der Testbefehl. Niemand weiß was er tut?'),
    async execute(interaction: Interaction) {
        if (!interaction.isCommand())
            return;
        if (!interaction.inGuild())
            return;
        if(!interaction.inCachedGuild())
            return;
        
        // Defer the reply to the interaction.
        // Give the Bot time to execute the command.
        await interaction.deferReply({ephemeral: true});
        
        await interaction.followUp({content: '✅', ephemeral: true});
    }
};

export default command;