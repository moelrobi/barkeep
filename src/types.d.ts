import {ContextMenuCommandBuilder, Interaction, SlashCommandBuilder } from "discord.js";
import Logger from "./util/Logger";
import TrelloClient from "./util/Trello";
import CommandApplicationLoader from "./handlers/CommandApplicationLoader";

export interface ContextMenu {
    menu: ContextMenuCommandBuilder | any,
    execute: (interaction: Interaction) => void
}

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction: Internaction) => void
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        cooldowns: Collection<string, number>
        contextMenus: Collection<string, ContextMenu>
        config: any,
        trello: TrelloClient
        logger: Logger
    }
}

export interface Taskforce {
    name: string,
    leader?: string,
    members: string[]
}