import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, GuildMemberRoleManager, Guild, EmbedBuilder, GuildMember } from "discord.js";
import { ContextMenu } from "src/types";
import { color } from "../util/Color";

const menu: ContextMenu = {
    menu: new ContextMenuCommandBuilder()
        .setName("Einstellen")
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        if (!interaction.isRepliable()) return;
        if (!interaction.inGuild()) return;

        // Delay the interaction. Required for discord.
        await interaction.deferReply({ephemeral: true});
        // Convert the Interaction to a UserContextMenu Interaction.
        interaction = interaction as UserContextMenuCommandInteraction;

        if (!interaction.targetMember) return;

        let memberRoles = interaction.targetMember.roles as GuildMemberRoleManager;
        memberRoles.set(interaction.client.config.einstellungsRollen + interaction.targetMember.roles);

        let issuer = interaction.member as GuildMember;
        let loggingArea = interaction.guild?.channels.resolve(interaction.client.config.einstellungsLogChannel);
        if (!loggingArea?.isTextBased()) return;

        loggingArea.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: issuer.nickname!!,
                        iconURL: issuer.avatarURL()!!
                    })
                    .setTitle("Einstellung")
                    .setDescription(`${issuer.nickname} hat grade ${interaction.targetUser.tag} (${interaction.targetUser.id}) eingestellt.`)
                    .setColor("Aqua")
                    .setFooter({
                        text: "Athena-System | made with ❤️ by Spades", 
                        iconURL: interaction.client.user.avatarURL()!!
                    })
            ]
        })

        // Finish the interaction.
        interaction.editReply('✅');
    }
}

export default menu;