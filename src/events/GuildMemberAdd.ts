import { BotEvent, ContextMenu } from "src/types";
import { GuildMember, Interaction } from "discord.js";
import { color } from "../util/Color";

const event: BotEvent = {
    name: "guildMemberAdd",
    execute: (member: GuildMember) => {
        console.log(color('info', `🛫 | ${member.user.username} just joined! Applying autoRoles!`));

        if(!member.client.config.discord.autoRoles) {
            console.log(color('error', 'autoRoles are not set!'))
        };

        let roles = member.client.config.discord.autoRoles;

        member.roles.add(roles);
        member.client.logger.logToDiscord({
            guild: member.guild,
            issuer: member,
            title: 'Autoroles applied',
            description: 'Diesem Nutzer wurden automatisch die richtigen Rollen zugewiesen',
            color: 'Green'
        });
    }
}

export default event 