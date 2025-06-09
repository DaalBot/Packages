import type { DBAPIOptions } from "./types.js";

export class DBAPI {
    constructor(options: DBAPIOptions) {
        this.base = 'https://api.daalbot.xyz';
        this.auth = options.auth;
        this.guildId = options.guildId;
    }

    auth: DBAPIOptions['auth'];
    base: string;
    guildId: string;

    execute = async (action: Function, ...params: any[]) => {
        return await action(this, ...params);
    }
}