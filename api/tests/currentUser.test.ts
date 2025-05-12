import { DBAPI, modules } from '@/index';

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const output = await modules.getCurrentUser(api);
    console.debug(`Current user id: ${output.user.id}`);
    console.debug(`Current user username: ${output.user.username}`);
    console.debug(`Current user guild count: ${output.guilds.length}`);
}