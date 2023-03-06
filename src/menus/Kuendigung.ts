import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, GuildMemberRoleManager, EmbedBuilder, GuildMember, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";
import { ContextMenu } from "src/types";
import { color } from "../util/Color";

const menu: ContextMenu = {
    menu: new ContextMenuCommandBuilder()
        .setName("Kündigung")
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        if (!interaction.isRepliable()) return;
        if (!interaction.inGuild()) return;
        if (!interaction.inCachedGuild()) return;

        // Convert the Interaction to a UserContextMenu Interaction.
        interaction = interaction as UserContextMenuCommandInteraction;
        if (!interaction.targetMember) return;
        let member = interaction.targetMember as GuildMember

        if(!member.roles.cache.hasAny("950871396861493278")) {
            interaction.reply({content: '⚠️ | Person ist nicht im FIB, weswegen ich nicht kündigen kann!', ephemeral: true})
            return;
        }

        const modal = new ModalBuilder()
            .setCustomId('kuendigung_modal')
            .setTitle('Kündigung');

        const reason = new TextInputBuilder()
            .setCustomId('kuendigung_reason')
            .setLabel("Warum wird die Person gekündigt?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(reason);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);

        await interaction.awaitModalSubmit({time: 60_000}).then(
            async i => {
                // Delay the interaction. Required for discord.
                await i.deferReply({ephemeral: true});

                member.roles.set(interaction.client.config.discord.defaultRole);

                let issuer = interaction.member as GuildMember;
                    interaction.client.logger.logToDiscord(interaction, issuer, 'Kündigung', 
                    `${issuer.nickname} hat grade ${member.nickname} (${member.id}) gekündigt.`, {name: "Grund: ", value: i.fields.getTextInputValue("kuendigung_reason")});

                 // Finish the interaction.
                i.editReply('✅');
            },
            err => {
                console.log(color('variable', 'Dann halt doch keine Kündigung...'))
            });
    }
}

export default menu;