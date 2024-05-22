import { APIEmbedField, Client, ColorResolvable, EmbedBuilder, Guild, GuildMember, Interaction } from "discord.js";

class Logger {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public logToDiscord({ guild, issuer, title, description, color = "Aqua", fields = [] }: { guild: Guild; issuer: GuildMember; title: string; description: string; color?: ColorResolvable; fields?: APIEmbedField[]; }) {
        let loggingArea = guild.channels.resolve(this.client.config.discord.logChannel);
        if (!loggingArea?.isTextBased()) return;

        loggingArea.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: issuer.user.username,
                        iconURL: issuer.avatarURL() ?? undefined
                    })
                    .setTitle(title)
                    .setDescription(description)
                    .setColor(color)
                    .setFooter({
                        text: "Barkeep-System | made with ❤️ by Spades",
                        iconURL: this.client.user?.avatarURL()!!
                    })
                    .setFields(fields ?? [])
            ]
        });
    }
}

export default Logger