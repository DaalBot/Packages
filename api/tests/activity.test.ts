import { DBAPI } from "@/index";
import { getActivity } from '@/modules';

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const output = await api.execute(getActivity);
    console.debug(`Activity contains ${output.length} items`);
}