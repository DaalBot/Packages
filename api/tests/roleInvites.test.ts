import { DBAPI, modules } from "@/index";

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const initalRoleInvitesData = await modules.getRoleLinks(api);
    console.debug(`Initial Role Invites Data: ${JSON.stringify(initalRoleInvitesData)}`);

    await modules.createRoleLink(api, 'vtnQdTRT5v', '1404508673203765419');
    console.debug("Role invite created successfully.");

    await modules.toggleRoleLinks(api, !initalRoleInvitesData.enabled);

    const updatedRoleInvitesData = await modules.getRoleLinks(api);
    console.debug(`Updated Role Invites Data: ${JSON.stringify(updatedRoleInvitesData)}`);

    if (updatedRoleInvitesData.links['vtnQdTRT5v'].includes('1404508673203765419')) {
        console.debug("Role invite contains the expected role.");
    } else {
        throw new Error("Role invite does not contain the expected role.");
    }

    if (updatedRoleInvitesData.enabled !== !initalRoleInvitesData.enabled) {
        throw new Error("Role invites state did not toggle as expected.");
    } else {
        console.debug("Role invites state toggled successfully.");
    }

    await modules.deleteRoleLink(api, 'vtnQdTRT5v', '1404508673203765419');
    console.debug("Role invite deleted successfully.");

    await modules.toggleRoleLinks(api, initalRoleInvitesData.enabled);

    const finalRoleInvitesData = await modules.getRoleLinks(api);
    console.debug(`Final Role Invites Data: ${JSON.stringify(finalRoleInvitesData)}`);

    if (Object.keys(finalRoleInvitesData.links).some(inviteCode => finalRoleInvitesData.links[inviteCode].includes('vtnQdTRT5v'))) {
        throw new Error("Role invite was not deleted as expected.");
    }

    if (finalRoleInvitesData.enabled !== initalRoleInvitesData.enabled) {
        throw new Error("Role invites state did not revert to initial state as expected.");
    } else {
        console.debug("Role invites state reverted successfully.");
    }

    console.log("Role invites test completed successfully.");
}