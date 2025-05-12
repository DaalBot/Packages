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

    console.debug(`Writing to database...`);
    await modules.writeDatabase(api, 'test', 'value');
    
    console.debug(`Reading from database...`);
    const output = await modules.readDatabase(api, 'test');
    if (output !== 'value') throw new Error(`Output was ${output} instead of value`);
    console.debug(`Output was ${output} as expected`);

    console.debug(`Deleting database file...`);
    await modules.deleteDatabase(api, 'test');

    console.debug(`Testing reading deleted file...`)
    let output2;
    try {
        const output2 = await modules.readDatabase(api, 'test');

        throw new Error(`Output was ${output2} instead of erroring`);
    } catch (e) {
        if (!(e instanceof AxiosError)) throw e;
        if (e.response?.status !== 404) throw new Error(`Was AxiosError; however, output2 was ${output2} instead of 404`);
        console.debug(`Output was ${e.response.status} as expected`);
    }
}