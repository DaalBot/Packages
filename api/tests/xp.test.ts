import { DBAPI, modules } from "@/index";

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const startingXP = await modules.getUserXP(api, '900126154881646634');
    console.debug(`User XP: ${startingXP}`);

    const rewards = await modules.getXPRewards(api);
    console.debug(`XP Rewards: ${rewards.length} rewards found`);

    await modules.setUserXP(api, '900126154881646634', 100);
    console.debug(`Set user XP to 100`);
    const newXP = await modules.getUserXP(api, '900126154881646634');
    console.debug(`User XP: ${newXP}`);
    if (newXP != '100') throw new Error(`User XP was ${newXP} instead of 100`);
    console.debug(`User XP was ${newXP} as expected`);

    await modules.setUserXP(api, '900126154881646634', parseInt(startingXP)); // I would quite like to keep my XP, thanks

    // TODO (FIXME): Still broken, but I don't know why i got it working on the dashboard
    // await modules.addXPReward(api, 10, '1371459089720147978');

    // const newRewards = await modules.getXPRewards(api);
    // console.debug(`XP Rewards: ${newRewards.length} rewards found`);
    // if (newRewards.length != rewards.length + 1) throw new Error(`XP Rewards length was ${newRewards.length} instead of ${rewards.length + 1}`);
    // console.debug(`XP Rewards length was ${newRewards.length} as expected`);
    // const newReward = newRewards.find(r => r.reward == '1371459089720147978');
    // if (!newReward) throw new Error(`XP Reward was not found`);
    // console.debug(`XP Reward was found`);
    // if (newReward.level != 10) throw new Error(`XP Reward XP was ${newReward.level} instead of 10`);

    const users = await modules.getUsersWithXP(api);
    console.debug(`Users with XP: ${users.length} users found`);
}