import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder, MessageContextMenuCommandInteraction } from "discord.js";
import { ContextMenu, Taskforce } from "src/types";

const menu: ContextMenu = {
    menu: new ContextMenuCommandBuilder()
        .setName("Taskforce: Liste")
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        if (!interaction.isRepliable()) return;
        if (!interaction.inGuild()) return;

        interaction = interaction as MessageContextMenuCommandInteraction;
        await interaction.deferReply();

        let channels = await interaction.guild?.channels.fetch();
        if(channels == undefined) {
            interaction.followUp('stop');
            return;
        }

        channels = channels.filter(channel => channel?.parentId == '1045438214493712444').filter(channel => channel?.id != '1045438394903318678' && channel?.id != '1045439834866602024');
        let taskforceInformation: Taskforce[] = [];
        channels.forEach(channel => {
            if(channel == undefined) return;
            let taskforce: Taskforce = {name: channel.name, members: []}
            let permissionOverwrites = channel.permissionOverwrites.cache.filter(over => over.type === 1);
            permissionOverwrites.forEach((value, key, map) => taskforce.members.push(`<@${key}>`))
            taskforceInformation.push(taskforce);
        })

        const embed = new EmbedBuilder()
            .setTitle("Aktuelle Taskforce-Infos")
            .setDescription("Dies sind die Taskforces und die zugewiesenen Nutzer!");


        taskforceInformation.forEach(element => {
            console.log(element.members);
            embed.addFields([{name: element.name, value: element.members.join("\n")}])
        });

        interaction.followUp({embeds: [embed]});
    }
}

export default menu;