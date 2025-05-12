import { DBAPI, modules } from "@/index";

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const output = await modules.getCurrentGuild(api);
    console.debug(`Current guild id: ${output.id}`);
    console.debug(`Current guild name: ${output.userData.name}`);
    console.debug(`Current guild member count: ${output.members.length}`);

    console.info('Testing filter: members');
    const outputMembers = await modules.getCurrentGuild(api, ['members']);
    
    if (!outputMembers.members) throw new Error(`Didn't filter members correctly`);
    if (outputMembers.channels) throw new Error(`Filtered channels when it shouldn't have`);
    if (outputMembers.roles) throw new Error(`Filtered roles when it shouldn't have`);
    if (outputMembers.userData) throw new Error(`Filtered userData when it shouldn't have`);
}