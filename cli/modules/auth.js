const auth = require('../tools/auth');

async function run() {
    await auth.setAuthHeader();

    console.log('Authentication finished. You can now use the Daalbot API.');
}

module.exports = {
    description: 'Authenticate with the Daalbot API',
    run,
}