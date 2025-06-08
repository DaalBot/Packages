import { DBAPI, modules } from "@/index";
import { timeout } from "./util";

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

    const state = await Promise.race([
        modules.getLogsState(api, 'messageDelete'),
        timeout(5000)
    ])
    console.debug(`Logs state (messageDelete): ${state}`);

    await modules.setLogsChannel(api, "1381238068958203995");
    console.debug(`[${Date.now().toString()}] Logs channel set to 1381238068958203995`);
    await modules.setLogsState(api, 'messageDelete', !state);
    console.debug(`Logs state (messageDelete) set to ${!state}`);
    const newState = await modules.getLogsState(api, 'messageDelete');
    console.debug(`New logs state (messageDelete): ${newState}`);
    if (newState !== !state) {
        throw new Error(`Logs state was not set correctly, expected ${!state} but got ${newState}`);
    }
    console.debug("Logs state set correctly.");

    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for the logs channel to update

    const newChannel = await modules.getLogsChannel(api);
    console.debug(`New logs channel id: ${newChannel}`);
    if (newChannel !== "1381238068958203995") {
        throw new Error(`[${Date.now().toString()}] Logs channel was not set correctly, expected 1381238068958203995 but got ${newChannel}`);
    }
    console.debug("Logs channel set correctly.");

    // Revert changes
    await modules.setLogsChannel(api, output);
    console.debug(`Logs channel reverted to ${output}`);
    await modules.setLogsState(api, 'messageDelete', state as boolean);
    console.debug(`Logs state (messageDelete) reverted to ${state}`);
}