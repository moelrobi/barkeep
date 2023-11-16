import { APIEmbedField, Client, ColorResolvable, EmbedBuilder, GuildMember, Interaction } from "discord.js";

class Logger {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public logToDiscord({ interaction, issuer, title, description, color = "Aqua", fields = [] }: { interaction: Interaction; issuer: GuildMember; title: string; description: string; color?: ColorResolvable; fields?: APIEmbedField[]; }) {
        let loggingArea = interaction.guild?.channels.resolve(this.client.config.discord.logChannel);
        if (!loggingArea?.isTextBased()) return;

        loggingArea.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: issuer.nickname!!,
                        iconURL: issuer.avatarURL()!!
                    })
                    .setTitle(title)
                    .setDescription(description)
                    .setColor(color)
                    .setFooter({
                        text: "Athena-System | made with ❤️ by Spades",
                        iconURL: this.client.user?.avatarURL()!!
                    })
                    .setFields(fields ?? [])
            ]
        });
    }
}

export default Logger