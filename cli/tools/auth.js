const fs = require('fs');
const { select, input } = require('@inquirer/prompts');
const http = require('http');

function getAuthHeader() {
    if (!fs.existsSync(__dirname + '/../auth.txt')) {
        throw new Error('auth.txt file not found, please run auth module first');
    }
    
    return fs.readFileSync(__dirname + '/../auth.txt', 'utf8');
}

async function setAuthHeader() {
    const method = await select({
        message: 'Select authentication method:',
        choices: [
            {
                name: 'Guild',
                value: 'guild',
                description: 'Authenticate using a guild token'
            },
            {
                name: 'User',
                value: 'user',
                description: 'Authenticate using a user token (expires, oauth based)'
            }
        ]
    })

    if (method == 'guild') {
        const token = await input({
            message: 'Enter your guild token:'
        });

        fs.writeFileSync(__dirname + '/../auth.txt', `Guild ${token}`);
    }

    else if (method == 'user') {
        // Start a local server on port 8331
        const server = http.createServer((req, res) => {
            if (req.url.startsWith('/callback')) {
                const url = new URL(req.url, `http://${req.headers.host}`);
                const code = url.searchParams.get('accesscode');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<script>setTimeout(() => {window.close();window.location.href="https://daalbot.xyz"}, 5000)</script><h1>Authentication successful! You can close this window.</h1>');
                server.close((err) => {
                    if (err) {
                        console.error('Error closing server:', err);
                    } else {
                        console.log('Server closed.');
                    }
                });
                fs.writeFileSync(__dirname + '/../auth.txt', `${code}`);
            }
        });

        server.on('connection', (socket) => {
            socket.setTimeout(5000);
            socket.on('timeout', () => {
                socket.destroy(); // Close the socket after 5 seconds of inactivity so it doesn't hang
                console.log('Socket timed out and was closed.');
            });
        });

        server.listen(8331, () => {
            console.log('Server listening on port 8331');
        });

        // Open the authentication URL in the default browser
        const authUrl = `https://daalbot.xyz/Dashboard/User/get-token?name=DaalBot%20CLI&return=http%3A%2F%2Flocalhost%3A8331%2Fcallback`;
        console.log(`Opening authentication URL in your default browser.`);
        
        switch (process.platform) {
            case 'darwin': // macOS
                require('child_process').exec(`open "${authUrl}"`);
                break;
            case 'win32': // Windows
                require('child_process').exec(`start "" "${authUrl}"`);
                break;
            default: // Linux and other platforms
                require('child_process').exec(`xdg-open "${authUrl}"`);
                break;
        }
    }
}

module.exports = {
    getAuthHeader,
    setAuthHeader,
    deleteAuthHeader: () => {
        fs.unlinkSync(__dirname + '/../auth.txt');
    }
}