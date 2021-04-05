import { Type } from 'class-transformer';
import { Allow, IsDefined, IsEnum, IsUrl } from 'class-validator';
import { ActivityType, Constants } from 'discord.js';
import { URL } from 'url';

export interface GetShardsResponse {
    shards: ShardInfo[];
    stats: ShardStats;
}

export interface ShardStats {
    shardCount: number;
    uptimeSecs: number;
}

export interface ShardInfo {
    id: number;
    ready: boolean;
    error: boolean;
    uptimeSecs?: number;
}

export class SetShardPresencesRequest {
    @IsDefined()
    @Allow()
    @IsEnum(Constants.ActivityTypes)
    type: ActivityType;

    @IsDefined()
    @Allow()
    name: string;

    @IsDefined()
    @IsUrl()
    @Type(() => URL)
    url: URL;
}
