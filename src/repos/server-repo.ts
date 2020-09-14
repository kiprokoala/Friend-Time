import { ServerData } from '../models/database-models';
import { DataAccess } from '../services/database/data-access';
import { Procedure } from '../services/database/procedure';
import { SqlUtils } from '../utils';

export class ServerRepo {
    constructor(private dataAccess: DataAccess) {}

    public async getServerData(discordId: string): Promise<ServerData> {
        let results = await this.dataAccess
            .executeProcedure(Procedure.Server_GetRow, [discordId])
            .catch(error => {
                throw error;
            });

        let serverData = SqlUtils.getFirstResultFirstRow(results);
        if (!serverData) {
            return;
        }

        return serverData;
    }

    public async setMode(discordId: string, mode: string): Promise<void> {
        await this.dataAccess
            .executeProcedure(Procedure.Server_SetMode, [discordId, mode])
            .catch(error => {
                throw error;
            });
    }

    public async setTimeFormat(discordId: string, timeFormat: string): Promise<void> {
        await this.dataAccess
            .executeProcedure(Procedure.Server_SetTimeFormat, [discordId, timeFormat])
            .catch(error => {
                throw error;
            });
    }

    public async setNotify(discordId: string, notify: boolean): Promise<void> {
        await this.dataAccess
            .executeProcedure(Procedure.Server_SetNotify, [discordId, notify])
            .catch(error => {
                throw error;
            });
    }
}
