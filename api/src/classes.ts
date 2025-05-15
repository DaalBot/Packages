import type { DBAPIOptions } from "./types.js";

export class DBAPI {
    constructor(options: DBAPIOptions) {
        this.base = 'http://localhost:3000'; // TODO: SWITCH TO api.daalbot.xyz BEFORE 1.0.0
        this.auth = options.auth;
        this.guildId = options.guildId;

        if (typeof window != 'undefined') return; // We are about to use a ton of node code, so obviously we don't want to run this in the browser
        if (process && process.env.DAALBOT_API_WRAPPER_TEST_ENABLE=='1') this.base = 'http://localhost:3000'; // This is for developing the wrapper for features that are not yet in the API
    }

    auth: DBAPIOptions['auth'];
    base: string;
    guildId: string;

    execute = async (action: Function, ...params: any[]) => {
        return await action(this, ...params);
    }
}