import { Channel, ForumChannel, ThreadAutoArchiveDuration, ThreadChannel, User } from 'discord.js';
import { BotEvent } from 'src/types';
import { categoryId, ticketToolUserId, forumChannel } from '../util/Constants';
import { color } from '../util/Color';

const event: BotEvent = {
    name: 'channelCreate',
    execute: async (channel: Channel) => {
        if(channel.isDMBased()) return;
        if(!channel.isTextBased()) return;
        if(channel.parentId != categoryId) return;
        console.log(color('info', `ℹ️ | Grade wurde der Channel ${channel.name} erstellt!`));

        channel.client.once('messageCreate', (message) => {
            if(message.author.id != ticketToolUserId) return;
            let user: User | undefined = message.mentions.users.at(0);

            const lmao = message.content.split('|');
            let name = lmao[1];
            let docs = lmao[2];

            // TODO: Add Google Docs validation.

            channel.guild.channels.fetch(forumChannel).then(chan => {
                if(chan == undefined) return;
                let forumChan = chan as ForumChannel;
                
                // TODO: Add the In-Progress Tag to the Channel.
                forumChan.threads.create({
                    name: `Bewerbung von ${name}`,
                    message: {
                        content: `@MoR ${docs}`
                    },
                    autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek
                })
            })
            
            // TODO: Send the greeting message to the user.
            channel.send(`
            Schönen guten Abend ${user},\n
            ich danke für ihre Bewerbung. Ich habe diese an das Manegement of Recruitment weitergeleitet.
            `);
        })
    }
}

export default event;