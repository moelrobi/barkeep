import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, MessageContextMenuCommandInteraction, RoleSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { ContextMenu, Taskforce } from "src/types";

const menu: ContextMenu = {
    menu: new ContextMenuCommandBuilder()
        .setName("Taskforce: Bilden")
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        if (!interaction.isRepliable()) return;
        if (!interaction.inGuild()) return;

        interaction = interaction as MessageContextMenuCommandInteraction;

        const modal = new ModalBuilder()
            .setCustomId('taskforce_group_create')
            .setTitle('Taskforce: Gruppe bilden');

        const name = new TextInputBuilder()
            .setCustomId('taskforce_name')
            .setLabel("Name der Taskforce?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const dn = new TextInputBuilder()
            .setCustomId('taskforce_number')
            .setLabel("Wie viele Leute?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const first = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
        const second = new ActionRowBuilder<TextInputBuilder>().addComponents(dn);
        modal.addComponents(first, second);

        await interaction.showModal(modal);
        await interaction.awaitModalSubmit({ time: 60_000 }).then(
            async i => {
                await i.deferReply();

                let howMany = Number.parseInt(i.fields.getTextInputValue("taskforce_number"));
                if(Number.isNaN(howMany)) {
                    return i.reply({content: '❌ | Kann die Zahl nicht konvertieren.', ephemeral: true});
                }

                let memberList = await interaction.guild?.members.fetch();
                if(memberList == undefined) {
                    i.followUp({content: 'x', ephemeral: true});
                    return;
                }
                memberList = memberList.filter(member => member.roles.cache.has(i.client.config.discord.fibRole)).filter(member => !member.roles.cache.has('1000773663404064808'));

                let taskforce: Taskforce = {
                    name: i.fields.getTextInputValue('taskforce_name'),
                    members: []
                };

                for (let i = 0; i < howMany; i++) {
                    let coolerDude = memberList?.randomKey();
                    taskforce.members[i] = `<@${coolerDude}>`;
                    memberList?.delete(coolerDude as string);
                }

                const embed = new EmbedBuilder()
                    .setTitle("Taskforce")
                    .setDescription("Hier ist deine Ausgewählte Liste in deiner Taskforce")
                    .setFooter({
                        text: "Athena-System | made with ❤️ by Spades",
                        iconURL: interaction.client.user?.avatarURL()!!
                    })
                    .setFields([
                        {
                            name: "Name der Taskforce",
                            value: i.fields.getTextInputValue("taskforce_name") 
                        },
                        {
                            name: "Leader",
                            value: taskforce.members[0] as string
                        },
                        {
                            name: "Mitglieder",
                            value: taskforce.members.join("\n")
                        }
                    ]);

                await i.followUp({ embeds: [embed] });
            },
            err => {
                
            },
        );
    }
}

export default menu;