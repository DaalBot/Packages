import { DBAPI, modules } from "@/index";

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    await modules.sendMessage(api, { content: 'Hello World! - From API Wrapper' }, '1017715576073895958');
}