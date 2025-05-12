import { DBAPI, modules } from "@/index";

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const output = await modules.getLogsChannel(api);
    console.debug(`Logs channel id: ${output}`);

    const state = await modules.getLogsState(api, 'messageDelete');
    console.debug(`Logs state (messageDelete): ${state}`);
}