import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, GuildMemberRoleManager, EmbedBuilder, GuildMember, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ContextMenu } from "src/types";
import { color } from "../util/Color";

const menu: ContextMenu = {
    menu: new ContextMenuCommandBuilder()
        .setName("Einstellen")
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        if (!interaction.isRepliable()) return;
        if (!interaction.inGuild()) return;

        // Convert the Interaction to a UserContextMenu Interaction.
        interaction = interaction as UserContextMenuCommandInteraction;

        if (!interaction.targetMember) return;

        const modal = new ModalBuilder()
            .setCustomId('einstellen_modal')
            .setTitle('Einstellen');

        const name = new TextInputBuilder()
            .setCustomId('einstellen_name')
            .setLabel("Name der Person?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const dn = new TextInputBuilder()
            .setCustomId('einstellen_dn')
            .setLabel("Wie lautet die Dienstnummer der Person?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const first = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
        const second = new ActionRowBuilder<TextInputBuilder>().addComponents(dn);
        modal.addComponents(first, second);

        await interaction.showModal(modal);
        let memberRoles = interaction.targetMember.roles as GuildMemberRoleManager;
        let member = interaction.targetMember as GuildMember;

        await interaction.awaitModalSubmit({time: 60_000}).then(
            async (i) => {
                await i.deferReply({ephemeral: true});

                let allRoles = interaction.client.config.discord.einstellungsRollen;
                memberRoles.cache.forEach(role => allRoles.push(role.id));
                memberRoles.set(allRoles);

                await member.setNickname(`[FIB-${i.fields.getTextInputValue("einstellen_dn")}] ${i.fields.getTextInputValue("einstellen_name")}`);

                let issuer = interaction.member as GuildMember;
                interaction.client.logger.logToDiscord(interaction, issuer, 'Einstellung', 
                `${issuer.nickname} hat grade ${member.nickname} (${member.id}) eingestellt.`);

                i.editReply('✅');
            })
            .catch(err => {
                console.log(color('error', err))
            });
    }
}

export default menu;