const fs = require('fs');
const { input, select, confirm } = require('@inquirer/prompts');
const auth = require('../tools/auth');
const { default: axios } = require('axios');
const { DBAPI, modules } = require('@daalbot/api');

async function run() {
    const authHeader = auth.getAuthHeader();

    let guildId = '';

    if (authHeader.startsWith('Guild ')) {
        guildId = Buffer.from(authHeader.split(' ')[1].split('.')[0], 'base64').toString('utf-8');
    } else {
        console.log('Fetching mutual guilds...')
        const res = await axios.get(`https://api.daalbot.xyz/guilds/mutual`, {
            headers: {
                Authorization: authHeader,
            },
        });

        if (res.status === 200) {
            const guilds = res.data.data;
            guildId = await select({
                message: 'Select a guild:',
                choices: guilds.map((guild) => ({
                    name: guild,
                    value: guild,
                })),
            });
        } else {
            console.error('Error fetching mutual guilds:', res.data);
            return;
        }
    }

    const api = new DBAPI({
        auth: {
            type: authHeader.split(' ')[0],
            token: authHeader.split(' ')[1],
        },
        guildId
    });

    const events = await modules.getEvents(api);

    if (events.length === 0) 
        return console.log('No events found for this guild.');

    const selectedAction = await select({
        message: 'Select an action:',
        choices: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new event',
            },
            {
                name: 'Download',
                value: 'download',
                description: 'Download the selected event to event.js',
            },
            {
                name: 'Download (raw)',
                value: 'raw-download',
                description: 'Download the event without the watcher code',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete the selected event',
            }
        ],
    });

    if (selectedAction == 'create') {
        const eventName = await input({
            message: 'Enter the name of the event:',
        });

        const eventDescription = await input({
            message: 'Enter a description for the event:',
        });

        const validEventTriggers = (await axios.get('https://cdn.jsdelivr.net/gh/DaalBot/API/config/events.json')).data.event_types;

        const eventTrigger = await select({
            message: 'Select the event trigger:',
            choices: validEventTriggers
        });

        const event = await modules.createEvent(api, eventTrigger, eventName, eventDescription);

        return console.log(`Event created with ID: ${event.id}`);
    }

    const selectedEvent = await select({
        message: 'Select an event to view details:',
        choices: events.map((event) => ({
            name: event.name,
            description: `${event.description} (${event.on} - ${event.id})`,
            value: event.id,
        })),
    });

    if (selectedAction == 'delete') {
        const confirmDelete = await confirm({
            message: 'Are you sure you want to delete this event?',
            default: false,
        });

        if (!confirmDelete) return;

        await modules.delEvent(api, selectedEvent);

        console.log('Event deleted:', selectedEvent);
    }

    if (selectedAction.endsWith('download')) {
        const eventCode = await modules.readEventCode(api, selectedEvent);

        const data = selectedAction == 'raw-download' ? eventCode : `//--IMPORTS-- (Not uploaded)\nconst { util } = require('@daalbot/events');/** @type {import('discord.js').Message} */let message = null;/** @type {import('discord.js').Interaction} */let interaction = null;\n//--EVENT--\n${eventCode}`;

        fs.writeFileSync('./event.js', data, {
            flag: 'w'
        });
        console.log(`Event downloaded to event.js`);
    }
}

module.exports = {
    description: 'Perform actions with the events in a guild',
    run,
}