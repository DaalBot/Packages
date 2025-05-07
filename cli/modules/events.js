const fs = require('fs');
const { input, select, confirm } = require('@inquirer/prompts');
const auth = require('../tools/auth');
const { default: axios } = require('axios');

async function run() {
    const authHeader = auth.getAuthHeader();

    const guildId = await input({
        message: 'Enter your guild ID:',
    });

    const res = await axios.get(`https://api.daalbot.xyz/dashboard/events/entires?guild=${guildId}`, {
        headers: {
            Authorization: authHeader,
        },
    })

    if (res.status !== 200) {
        console.error('Error fetching events:', res.data);
        return;
    }

    const events = res.data;

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

        const eventOn = await input({
            message: 'Enter the gateway event to listen to (e.g. messageCreate):',
        });

        const res = await axios.post(`https://api.daalbot.xyz/dashboard/events/create?guild=${guildId}&name=${encodeURIComponent(eventName)}&description=${encodeURIComponent(eventDescription)}&on=${encodeURIComponent(eventOn)}`, {}, {
            headers: {
                Authorization: authHeader
            }
        })

        if (res.status !== 200) {
            console.error('Error creating event:', res.data);
            return;
        }

        const eventId = res.data.id;

        return console.log(`Event created with ID: ${eventId}`);
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

        const res = await axios.delete(`https://api.daalbot.xyz/dashboard/events/remove?guild=${guildId}&id=${selectedEvent}`, {
            headers: {
                Authorization: authHeader
            }
        });

        console.log('Event deleted:', res.data);
    }

    if (selectedAction.endsWith('download')) {
        const res = await axios.get(`https://api.daalbot.xyz/dashboard/events/read?guild=${guildId}&id=${selectedEvent}`, {
            headers: {
                Authorization: authHeader
            }
        });

        if (res.status !== 200) {
            console.error('Error downloading event:', res.data);
            return;
        }

        const data = selectedAction == 'raw-download' ? res.data : `//--IMPORTS-- (Not uploaded)\nconst { util } = require('@daalbot/events');/** @type {import('discord.js').Message} */let message = null;/** @type {import('discord.js').Interaction} */let interaction = null;\n//--EVENT--\n${res.data}`;

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