import {
    ButtonInteraction,
    Message,
    MessageReaction,
    Modal,
    ModalSubmitInteraction,
    SelectMenuInteraction,
    TextBasedChannel,
    User,
} from 'discord.js';
import {
    ButtonRetriever,
    CollectorUtils as DjsCollectorUtils,
    ExpireFunction,
    MessageRetriever,
    ModalRetriever,
    ReactionRetriever,
    SelectMenuRetriever,
} from 'discord.js-collector-utils';
import { createRequire } from 'node:module';

import { Lang } from '../services/index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class CollectorUtils {
    public static collectByButton<T>(
        msg: Message,
        user: User,
        buttonRetriever: ButtonRetriever<T>,
        expireFunction?: ExpireFunction
    ): Promise<{
        intr: ButtonInteraction;
        value: T;
    }> {
        return DjsCollectorUtils.collectByButton(
            msg,
            (intr: ButtonInteraction) => intr.user.id === user.id,
            (nextMsg: Message): boolean => {
                // Check if another command was ran, if so cancel the current running setup
                let nextMsgArgs = nextMsg.content.split(' ');
                if ([Lang.getCom('keywords.stop')].includes(nextMsgArgs[0]?.toLowerCase())) {
                    return true;
                }

                return false;
            },
            buttonRetriever,
            expireFunction,
            { time: Config.experience.promptExpireTime * 1000, reset: true }
        );
    }

    public static collectBySelectMenu<T>(
        msg: Message,
        user: User,
        selectMenuRetriever: SelectMenuRetriever<T>,
        expireFunction?: ExpireFunction
    ): Promise<{
        intr: SelectMenuInteraction;
        value: T;
    }> {
        return DjsCollectorUtils.collectBySelectMenu(
            msg,
            (intr: SelectMenuInteraction) => intr.user.id === user.id,
            (nextMsg: Message): boolean => {
                // Check if another command was ran, if so cancel the current running setup
                let nextMsgArgs = nextMsg.content.split(' ');
                if ([Lang.getCom('keywords.stop')].includes(nextMsgArgs[0]?.toLowerCase())) {
                    return true;
                }

                return false;
            },
            selectMenuRetriever,
            expireFunction,
            { time: Config.experience.promptExpireTime * 1000, reset: true }
        );
    }

    public static collectByModal<T>(
        msg: Message,
        modal: Modal,
        user: User,
        modalRetriever: ModalRetriever<T>,
        expireFunction?: ExpireFunction
    ): Promise<{
        intr: ModalSubmitInteraction;
        value: T;
    }> {
        return DjsCollectorUtils.collectByModal(
            msg,
            modal,
            (intr: ButtonInteraction) => intr.user.id === user.id,
            (nextMsg: Message): boolean => {
                // Check if another command was ran, if so cancel the current running setup
                let nextMsgArgs = nextMsg.content.split(' ');
                if ([Lang.getCom('keywords.stop')].includes(nextMsgArgs[0]?.toLowerCase())) {
                    return true;
                }

                return false;
            },
            modalRetriever,
            expireFunction,
            { time: Config.experience.promptExpireTime * 1000, reset: true }
        );
    }

    public static collectByReaction<T>(
        msg: Message,
        user: User,
        reactionRetriever: ReactionRetriever<T>,
        expireFunction?: ExpireFunction
    ): Promise<T> {
        return DjsCollectorUtils.collectByReaction(
            msg,
            (_msgReaction: MessageReaction, reactor: User): boolean => reactor.id === user.id,
            (nextMsg: Message): boolean => {
                // Check if another command was ran, if so cancel the current running setup
                let nextMsgArgs = nextMsg.content.split(' ');
                if ([Lang.getCom('keywords.stop')].includes(nextMsgArgs[0]?.toLowerCase())) {
                    return true;
                }

                return false;
            },
            reactionRetriever,
            expireFunction,
            { time: Config.experience.promptExpireTime * 1000, reset: true }
        );
    }

    public static collectByMessage<T>(
        channel: TextBasedChannel,
        user: User,
        messageRetriever: MessageRetriever<T>,
        expireFunction?: ExpireFunction
    ): Promise<T> {
        return DjsCollectorUtils.collectByMessage(
            channel,
            (nextMsg: Message): boolean => nextMsg.author.id === user.id,
            (nextMsg: Message): boolean => {
                // Check if another command was ran, if so cancel the current running setup
                let nextMsgArgs = nextMsg.content.split(' ');
                if ([Lang.getCom('keywords.stop')].includes(nextMsgArgs[0]?.toLowerCase())) {
                    return true;
                }

                return false;
            },
            messageRetriever,
            expireFunction,
            { time: Config.experience.promptExpireTime * 1000, reset: true }
        );
    }
}
