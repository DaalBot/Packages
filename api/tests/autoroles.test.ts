import { DBAPI } from '@/index';
import { getAutoroles, createAutorole, removeAutorole } from '@/modules';
const TEST_ROLE_ID = '1371459089720147978';

export default async function() {
    const api = new DBAPI({
        auth: {
            type: "User",
            token: process.env.TEST_TOKEN || ""
        },
        guildId: process.env.TEST_GUILD_ID || "1017715574639431680",
    });

    const initialAutoroles = await getAutoroles(api);
    console.debug(`Initial autoroles: ${initialAutoroles.length} items`);

    // Create a new autorole
    await createAutorole(api, TEST_ROLE_ID);
    console.debug(`Autorole created: ${TEST_ROLE_ID}`);

    // Get the autoroles again
    const updatedAutoroles = await getAutoroles(api);
    console.debug(`Updated autoroles: ${updatedAutoroles.length} items`);
    if (updatedAutoroles.length !== initialAutoroles.length + 1) {
        console.error(`Autoroles length mismatch: expected ${initialAutoroles.length + 1}, got ${updatedAutoroles.length}`);
    }

    if (!updatedAutoroles.includes(TEST_ROLE_ID)) {
        console.error(`Autoroles do not include the new role: ${TEST_ROLE_ID}`);
    }

    // Remove the autorole
    await removeAutorole(api, TEST_ROLE_ID);
    console.debug(`Autorole removed: ${TEST_ROLE_ID}`);

    // Get the autoroles again
    const finalAutoroles = await getAutoroles(api);
    console.debug(`Final autoroles: ${finalAutoroles.length} items`);
    if (finalAutoroles.length !== initialAutoroles.length) {
        console.error(`Autoroles length mismatch: expected ${initialAutoroles.length}, got ${finalAutoroles.length}`);
    }
    if (finalAutoroles.includes(TEST_ROLE_ID)) {
        console.error(`Autoroles still include the removed role: ${TEST_ROLE_ID}`);
    }
}