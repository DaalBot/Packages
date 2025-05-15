import { DBAPI } from "@/classes";
import axios from "axios";

export default async function(api: DBAPI): Promise<Array<{method: string; route: string; ts: number; executor: string; comment: string}>> {
    const { data } = await axios.get(`${api.base}/dashboard/activity?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}