import { DBAPI, modules } from "@/index";
import { AxiosError } from "axios";

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

    /**
     * VARIABLES
    */
    const variables: Array<{ name: string, value: string }> = await modules.getEventVariable(api, 'global') as Array<{ name: string, value: string }>;
    console.debug(`Current variables: ${variables.map((e) => e.name).join(', ')}`);

    await modules.setEventVariable(api, 'global', 'test', 'test');
    console.debug(`Set variable: test = test`);

    const newVariables = await modules.getEventVariable(api, 'global') as Array<{ name: string, value: string }>;
    const newVariableFound = newVariables.find((e) => e.name === 'test');
    if (!newVariableFound) throw new Error(`New variable not found in variables list`); // Failed??
    console.debug(`New variable found in variables list`);

    const newVariableValue = await modules.getEventVariable(api, 'global', 'test');
    if (newVariableValue[0].value !== 'test') throw new Error(`New variable value was ${newVariableValue} (${JSON.stringify(newVariableValue, null, 2)}) instead of 'test'`);
    console.debug(`New variable value was ${newVariableValue} as expected`);

    await modules.deleteEventVariable(api, 'global', 'test');
    console.debug(`Deleted variable: 'test'`);

    const newVariableFound2 = variables.find((e) => e.name === 'test');
    if (newVariableFound2) throw new Error(`New variable found in variables list when it shouldn't have`);
    console.debug(`New variable not found in variables list as expected`);

    console.debug(`Current variables: ${variables.map((e) => e.name).join(', ')}`);

    try {
        const newVariableValue2 = await modules.getEventVariable(api, 'global', 'test');
        if (newVariableValue2) throw new Error(`New variable value was ${newVariableValue2} instead of undefined`);
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.response?.status !== 404) throw new Error(`Variable request failed with status ${e.response?.status} instead of 404`);
            else console.debug(`Variable request failed with status 404 as expected`);
        } else {
            throw new Error(`Variable request failed with error ${e}`);
        }
    }

    console.debug(`Current variables: ${variables.map((e) => e.name).join(', ')}`);
}