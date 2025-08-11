import { DBAPI, modules } from "@/index";

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const currentInviteTrackingData = await modules.getInviteTrackingData(api);
    console.debug(`Current Invite Tracking Status: ${currentInviteTrackingData.enabled}`);
    const newInviteTrackingStatus = !currentInviteTrackingData.enabled;

    await modules.toggleInviteTracking(api, newInviteTrackingStatus);

    const updatedInviteTrackingData = await modules.getInviteTrackingData(api);
    console.debug(`Updated Invite Tracking Status: ${updatedInviteTrackingData.enabled}`);

    if (updatedInviteTrackingData.enabled !== newInviteTrackingStatus) {
        throw new Error("Invite tracking status did not update as expected.");
    }

    await modules.toggleInviteTracking(api, currentInviteTrackingData.enabled);
    console.debug("Invite tracking status reverted to original state.");

    if (currentInviteTrackingData.enabled !== (await modules.getInviteTrackingData(api)).enabled) {
        throw new Error("Failed to revert invite tracking status to original state.");
    }

    console.log("Invite tracking test completed successfully.");
}