const { execSync } = require('child_process');
const fs = require('fs');

async function run() {
    fs.writeFileSync('watcher.js', `let id = process.env.ID; // Event ID (Overrides the eventInput id)
let key = process.env.KEY; // Guild based API key (Overrides the guildInput key)
const guildInput = process.env.GUILD; // Guild Alias (process.env.GUILD_KEY_{input})
const eventInput = process.env.EVENT; // Event id (process.env.EVENT_ID_{input})

require('dotenv').config();

if (guildInput && !key) key = process.env[\`GUILD_KEY_\${guildInput}\`];
if (eventInput && !id) id = process.env[\`EVENT_ID_\${eventInput}\`];

const axios = require('axios');
const fs = require('fs');

const baseEventJS = \`//--IMPORTS-- (Not uploaded)\\nconst { util } = require('@daalbot/events');/** @type {import('discord.js').Message} */let message = null;/** @type {import('discord.js').Interaction} */let interaction = null;\\n//--EVENT--\\nconsole.log('Event fired!');\`

if (!fs.existsSync('./event.js')) {fs.writeFileSync('./event.js', baseEventJS, {
    flag: 'w'
});console.log('No event.js file found. Created a new one. Please fill in the details.');}

if (!fs.existsSync('.env')) {fs.writeFileSync('.env', \`# DaalBot Events API Key\\n# GUILD_KEY_* = Guild based API key (Select * = env.GUILD)\\n# EVENT_ID_* = Event ID (Select * = env.EVENT)\`, {
    flag: 'w'
});console.log('No .env file found. Created a new one. Please fill in the details.')}

if (process.env.INIT_ONLY == 1) process.exit(0);
if (!key) throw new Error('No key provided. Please provide a key in the .env file or as an environment variable.');
if (!id) throw new Error('No ID provided. Please provide an ID in the .env file or as an environment variable.');

const guildID = Buffer.from(key.split('.')[0], 'base64').toString();

const postURL = \`https://api.daalbot.xyz/dashboard/events/write?guild=\${guildID}&id=\${id}\`;

console.log(\`Watching for changes to event.js...\`);
fs.watchFile('./event.js', { interval: 1000 }, async () => {
    const contents = fs.readFileSync('./event.js', 'utf8');
    const code = contents.split('//--EVENT--\\n')[1]; // Get the event code
    if (!code) return; // If there is no event code, return early

    console.log('Event code changed, sending to API...');

    await axios.post(postURL, {
        data: code
    }, {
        headers: {
            Authorization: \`Guild \${key}\`
        }
    })

    console.log('Upload Complete!');
});
`)

    console.log('Watcher file created. Installing dependencies and running watcher to generate event.js and .env file if they do not exist.');
    try {
        execSync('npm install dotenv axios @daalbot/events', {
            stdio: 'inherit'
        });

        execSync('INIT_ONLY=1 node watcher.js', {
            stdio: 'inherit'
        });
    } catch (e) {} // Ignore errors

    console.log('Done! You can now edit the event.js file below the --EVENT-- line and it will automatically upload to the DaalBot API. Simply run node watcher.js to start');
}

module.exports = {
    description: 'Create a watcher file to allow for instant uploading of event code to daalbot',
    run
}