import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, GuildMemberRoleManager, EmbedBuilder, GuildMember, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRow, RoleSelectMenuBuilder } from "discord.js";
import { ContextMenu } from "src/types";
import { color } from "../util/Color";

const menu: ContextMenu = {
    menu: new ContextMenuCommandBuilder()
        .setName("Befördern")
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        if (!interaction.isRepliable()) return;
        if (!interaction.inGuild()) return;

        // Convert the Interaction to a UserContextMenu Interaction.
        interaction = interaction as UserContextMenuCommandInteraction;

        if (!interaction.targetMember) return;

        const row = new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(
            new RoleSelectMenuBuilder()
                .setCustomId("befoerderung_rang")
                .setMinValues(1)
                .setMaxValues(1)
        );

        await interaction.reply({components: [row], ephemeral: true, content: 'nice'})
    }
}

export default menu;