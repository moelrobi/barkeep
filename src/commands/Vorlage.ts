import { EmbedBuilder, Interaction, SlashCommandBuilder, time } from "discord.js";

const command = {
    command: new SlashCommandBuilder()
        .setName('vorlage')
        .setDescription('Sendet eine Vorlage in den Kanal')
        .addStringOption(option => 
            option
                .setName('id')
                .setDescription('Welche Vorlage soll gesendet werden?')
                .setRequired(true)
                .addChoices(
                    {
                        name: "SAHP - Bwerbung",
                        value: "sahp_application"
                    }, 
                    {
                        name: "SWAT - Bewerbung",
                        value: "swat_application"
                    }
                )
            ),
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
        const id = interaction.options.get('id')?.value;

        switch(id) {
            case "sahp_application":
                var embed = new EmbedBuilder()
                    .setAuthor({
                        name: "Vorlage - SAHP | Bewerbung",
                        iconURL: interaction.client.user.avatarURL()!! 
                    })
                    .setTitle('Vorlage - SAHP | Bewerbung')
                    .setDescription('Bitte füge die einzelnen Puntke in deinen Bewerbungstext ein.')
                    .setColor("Blue")
                    .addFields([
                        {
                            name: "**Name und Dienstnummer**",
                            value: "Trage hier deine Dienstnummer und deinen Namen ein",
                            inline: true
                        },
                        {
                            name: "**Aktueller Rang**",
                            value: "Trage hier deinen aktuellen Rang ein",
                            inline: true
                        },
                        {
                            name: "**Aktuelles Department**",
                            value: "Nenne hier das Department in dem du aktuell eingesetzt bist"
                        },
                        {
                            name: "**Wie bist du auf unsere Direktion aufmerksam geworden?**",
                            value: "Erkläre hier in ein paar Sätzen wie du auf uns Aufmerksam geworden bist."
                        },
                        {
                            name: "**Wie würdest du deine Aktivität beurteilen?**",
                            value: "Erkläre hier wie du deine Aktivität beurteilen würdest."
                        },
                        {
                            name: "**Wieso möchte ich in die San Andreas Highway Patrol?**",
                            value: "Schildere hier wieso du in die San Andreas Highway Patrol eintreten willst."
                        },
                        {
                            name: "**Welche Erfahrungen bringst du mit?**",
                            value: "Nenne hier welche Erfahrungen du mitbringst."
                        },
                        {
                            name: "**Warum sollten wir dich in die Direktion aufnehmen?**",
                            value: "Erkläre hier wieso wir dich in die Direktion aufnehmen sollten."
                        },
                        {
                            name: "**Welche Sanktionen hast du bis jetzt im PD erhalten?**",
                            value: "Nenne hier jegliche Sanktionen die du bereits erhalten hast."
                        },
                        {
                            name: "**Schlusswort**",
                            value: "Solltest du noch etwas zum Abschluss zu sagen haben, kannst du dies hier tun."
                        }
                    ])
                await interaction.channel?.send({embeds: [embed]})
                break;
            default:
                await interaction.editReply({content: '❌ | Die Vorlage wurde nicht gefunden. Melde dich bei 420. :)'});
                return;
        }

        await interaction.editReply({ content: `✅` });
    }
};

export default command;