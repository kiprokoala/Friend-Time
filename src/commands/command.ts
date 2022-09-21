import {
    AutocompleteFocusedOption,
    AutocompleteInteraction,
    BaseCommandInteraction,
    PermissionString,
} from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { EventData } from '../models/internal-models.js';

export interface Command {
    names: string[];
    cooldown?: RateLimiter;
    deferType: CommandDeferType;
    requireClientPerms: PermissionString[];
    requireUserPerms: PermissionString[];
    autocomplete?(intr: AutocompleteInteraction, option: AutocompleteFocusedOption): Promise<void>;
    execute(intr: BaseCommandInteraction, data: EventData): Promise<void>;
}

export enum CommandDeferType {
    PUBLIC = 'PUBLIC',
    HIDDEN = 'HIDDEN',
    NONE = 'NONE',
}
