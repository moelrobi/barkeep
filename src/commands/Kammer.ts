import { EmbedBuilder, Interaction, SlashCommandBuilder, time } from "discord.js";

const command = {
    command: new SlashCommandBuilder()
        .setName('kammer')
        .setDescription('Eintrag in die Asservatenkammer')
        .addStringOption(option => option.setName('name').setDescription('Name des Gegenstandes').setRequired(true))
        .addStringOption(option => option.setName('von').setDescription('Von wem ist der Gegenstand?').setRequired(true))
        .addBooleanOption(option => option.setName('ausgabe').setDescription('Wurde ein Gegenstand ausgegeben?').setRequired(false)),
    async execute(interaction: Interaction) {
        if (!interaction.isCommand())
            return;
        if (!interaction.inGuild())
            return;
        if(!interaction.inCachedGuild())
            return;
        
        // Defer the reply to the interaction.
        // Give the Bot time to execute the command.
        await interaction.deferReply({ ephemeral: true });

        // Get the values from the options.
        const name = interaction.options.get('name')?.value;
        const von = interaction.options.get('von')?.value;
        const ausgabe = interaction.options.get('ausgabe')?.value;
        
        if(ausgabe) {
            interaction.channel?.send({ embeds: [new EmbedBuilder()
                .setColor('Red')
                .setTitle('**<:FIB:962112073360367726> | Asservatenkammer**')
                .setDescription(`**Ausgabe:** ${name}\n**An:** ${von}`)
                .setAuthor({name: interaction.member.nickname!!, iconURL: interaction.user.displayAvatarURL()})
                .setTimestamp(new Date())
                .setFooter({text: 'Athena-System | made with ❤️ by Spades', iconURL: interaction.client.user?.displayAvatarURL()!!})
            ]});

            return await interaction.editReply({ content: `✅` });
        }

        interaction.channel?.send({ embeds: [new EmbedBuilder()
            .setColor('Green')
            .setTitle('**<:FIB:962112073360367726> | Asservatenkammer**')
            .setDescription(`> **Eingabe:** ${name}\n> **Von:** ${von}\n> **Datum: **${time(new Date())}`)
            .setAuthor({name: interaction.member.nickname!!, iconURL: interaction.user.displayAvatarURL()})
            .setTimestamp(new Date())
            .setFooter({text: 'Athena-System | made with ❤️ by Spades', iconURL: interaction.client.user?.displayAvatarURL()!!})
        ]});
        
        await interaction.editReply({ content: `✅` });
    }
};

export default command;