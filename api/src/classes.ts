import type { DBAPIOptions } from "@/types";

export class DBAPI {
    constructor(options: DBAPIOptions) {
        this.base = 'https://api.daalbot.xyz';

        if (process.env.DAALBOT_API_WRAPPER_TEST_ENABLE=='1') this.base = 'http://localhost:3000'; // This is for developing the wrapper for features that are not yet in the API

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