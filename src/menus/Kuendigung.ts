import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, GuildMemberRoleManager, EmbedBuilder, GuildMember, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Interaction } from "discord.js";
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

        if(!member.roles.cache.hasAny(interaction.client.config.discord.fibRole)) {
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

                let issuer = interaction.member as GuildMember;

                let cards = await interaction.client.trello.getCards(interaction.client.config.trello.boardId);
                let card = cards.data.filter((element: any) => element.name === member.nickname);

                if(card.length === 0) {
                    notTrello(interaction, issuer);
                } else {
                    await interaction.client.trello.commentOnCard(card[0].id, `**Kündigung**%0AAusführende Person: ${issuer.nickname}%0AGrund: ${i.fields.getTextInputValue("kuendigung_reason")}%0ADatum: ${new Date().toLocaleDateString('de-DE', {year: 'numeric', month: 'numeric', day: 'numeric'})}`);
                    await interaction.client.trello.moveCardToList(card[0].id, interaction.client.config.trello.gekuendigtListId);
                }

                await member.roles.set(interaction.client.config.discord.defaultRole);

                interaction.client.logger.logToDiscord({ interaction, issuer, title: 'Kündigung', description: `${issuer.nickname} hat grade ${member.nickname} (${member.id}) gekündigt.`, color: "Red", fields: [{ name: "Grund: ", value: i.fields.getTextInputValue("kuendigung_reason") }] });

                // Finish the interaction.
                i.editReply('✅');
            },
            err => {
                console.log(color('variable', 'Dann halt doch keine Kündigung...'))
            });
    }
}

export default menu;

function notTrello(interaction: Interaction, issuer: GuildMember) {
    interaction.client.logger.logToDiscord({ interaction, issuer, title: 'Warnung', description: 'Es gab ein Problem diesen Eintrag auf Trello zu veröffentlichen!\nBitte trage es nach!', color: 'Orange' });
}