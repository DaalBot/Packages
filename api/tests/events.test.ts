import { DBAPI, modules } from "@/index";

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    // Create event
    const newEvent = await modules.createEvent(api, 'messageCreate', 'Temp - @daalbot/api test', 'Description');
    console.debug(`Created event: ${newEvent.id}`);

    const output = await modules.getEvents(api);
    console.debug(`Current events: ${output.map((e) => e.id).join(', ')}`);

    const newEventFound = output.find((e) => e.id === newEvent.id);
    if (!newEventFound) throw new Error(`New event not found in events list`);
    console.debug(`New event found in events list`);

    // Code
    const readCode = await modules.readEventCode(api, newEvent.id);
    console.debug(`Read event code: ${readCode}`);

    await modules.writeEventCode(api, newEvent.id, 'console.log("Hello world")');
    console.debug(`Wrote event code`);
    
    const newCode = await modules.readEventCode(api, newEvent.id);
    if (newCode !== 'console.log("Hello world")') throw new Error(`New code was ${newCode} instead of console.log("Hello world")`);
    console.debug(`New code was ${newCode} as expected`);
    
    // State
    await modules.setEventState(api, newEvent.id, false);
    console.debug(`Set event state to disabled`);
    
    const newState = await modules.getEvents(api);
    const newEventState = newState.find((e) => e.id === newEvent.id);
    if (!newEventState) throw new Error(`New event not found in events list`); // We already know it exists but just to type check
    if (newEventState.enabled) throw new Error(`New event "enabled" was ${newEventState.enabled} instead of false`);
    console.debug(`New event state was ${newEventState.enabled} as expected`);

    // Delete event
    await modules.delEvent(api, newEvent.id);
    console.debug(`Deleted event: ${newEvent.id}`);
    const output2 = await modules.getEvents(api);
    const newEventFound2 = output2.find((e) => e.id === newEvent.id);
    if (newEventFound2) throw new Error(`New event found in events list when it shouldn't have`);
    console.debug(`New event not found in events list as expected`);
    console.debug(`Current events: ${output2.map((e) => e.id).join(', ')}`);
}