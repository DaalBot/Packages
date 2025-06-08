import { DBAPI } from "@/classes.js";
import { GatewayEvent } from "@/types.js";
import axios from "axios";

export async function getChannel(api: DBAPI): Promise<string> {
    const { data } = await axios.get(`${api.base}/dashboard/logs/channel?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return `${data.data.toString()}`;
}

export async function getState(api: DBAPI, event?: GatewayEvent): Promise<boolean | Array<{ name: string, value: boolean }>> {
    const url = event 
        ? `${api.base}/dashboard/logs/state?guild=${api.guildId}&event=${event}`
        : `${api.base}/dashboard/logs/state?guild=${api.guildId}`;
    
    const { data } = await axios.get(url, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });

    return data.data == 'true' ? true : data.data == 'false' ? false : data.data as Array<{ name: string, value: boolean }>;
}

export async function setChannel(api: DBAPI, channel: string): Promise<void> {
    await axios.post(`${api.base}/dashboard/logs/channel?guild=${api.guildId}&channel=${channel}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });
}

export async function setState(api: DBAPI, event: GatewayEvent, state: boolean): Promise<void> {
    await axios.post(`${api.base}/dashboard/logs/state?guild=${api.guildId}&event=${event}&state=${state}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });
}