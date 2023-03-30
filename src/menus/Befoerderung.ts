import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, GuildMemberRoleManager, EmbedBuilder, GuildMember, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRow, RoleSelectMenuBuilder, ComponentType } from "discord.js";
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

        await interaction.reply({ components: [row], ephemeral: true, content: 'nice' });
        await interaction.channel?.awaitMessageComponent({ filter: (interaction) => interaction.customId === "befoerderung_rang", time: 60_000 }).then(async (interaction) => {
            if (!interaction.isRoleSelectMenu()) return;
            const role = interaction.values[0];
            const member = interaction.member as GuildMember;

            await interaction.reply({ content: 'nice', ephemeral: true });
        });
    }
}

export default menu;