import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, GuildMemberRoleManager, EmbedBuilder, GuildMember, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ContextMenu } from "src/types";
import { color } from "../util/Color";

const menu: ContextMenu = {
    menu: new ContextMenuCommandBuilder()
        .setName("Debug")
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        if (!interaction.isRepliable()) return;
        if (!interaction.inGuild()) return;

        // Convert the Interaction to a UserContextMenu Interaction.
        interaction = interaction as UserContextMenuCommandInteraction;

        console.log(color('info', 'Debug was pressed!'));

        await interaction.reply({content: '✅', ephemeral: true});
    }
}

export default menu;