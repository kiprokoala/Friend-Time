import { DMChannel, Message, TextChannel } from 'discord.js';
import { ServerData, UserData } from '../models/database-models';
import { MessageSender } from '../services';
import { CommandName, MessageName } from '../services/language';
import { Command } from './command';

export class InfoCommand implements Command {
    public name = CommandName.info;

    constructor(private msgSender: MessageSender) {}

    public async execute(
        msg: Message,
        args: string[],
        channel: TextChannel | DMChannel,
        authorData: UserData,
        serverData?: ServerData
    ): Promise<void> {
        await this.msgSender.sendWithTitle(
            channel,
            authorData.LangCode,
            MessageName.infoMessage,
            MessageName.infoTitle
        );
    }
}
