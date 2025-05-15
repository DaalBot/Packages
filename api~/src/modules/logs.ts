import { DBAPI } from "@/classes";
import { GatewayEvent } from "@/types";
import axios from "axios";

export async function getChannel(api: DBAPI): Promise<string> {
    const { data } = await axios.get(`${api.base}/dashboard/logs/channel?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function getState(api: DBAPI, event: GatewayEvent): Promise<boolean> {
    const { data } = await axios.get(`${api.base}/dashboard/logs/state?guild=${api.guildId}&event=${event}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

// TODO (API-SIDE): Add a way to set the options here