import { DBAPI } from "@/classes.js";
import type { GatewayEvent } from "@/types.js";
import axios from "axios";

export type Event = {id: string; guild: string; on: GatewayEvent; name: string; description: string; enabled: boolean};

export async function delVariable(api: DBAPI, scope: 'global' | string, variableName: string) {
    await axios.delete(`${api.base}/dashboard/events/variables?guild=${api.guildId}&name=${encodeURIComponent(variableName)}&scope=${scope}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}

export async function getVariable(api: DBAPI, scope: 'global' | string, variableName?: string): Promise<Array<{name: string, value: string}>> {
    const { data } = await axios.get(`${api.base}/dashboard/events/variable?guild=${api.guildId}${variableName ? `&name=${encodeURIComponent(variableName)}` : ''}&scope=${scope}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function setVariable(api: DBAPI, scope: 'global' | string, variableName: string, value: string) {
    await axios.post(`${api.base}/dashboard/events/variables?guild=${api.guildId}&scope=${scope}&name=${encodeURIComponent(variableName)}`, {
        data: value
    }, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}

export async function read(api: DBAPI, id: string): Promise<string> {
    const { data } = await axios.get(`${api.base}/dashboard/events/code?guild=${api.guildId}&id=${id}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function write(api: DBAPI, id: string, code: string) {
    const { data } = await axios.post(`${api.base}/dashboard/events/code?guild=${api.guildId}&id=${id}`, {
        data: code
    }, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function setState(api: DBAPI, id: string, state: boolean) {
    const { data } = await axios.post(`${api.base}/dashboard/events/state?guild=${api.guildId}&event=${id}&state=${state}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function delEvent(api: DBAPI, id: string) {
    const { data } = await axios.delete(`${api.base}/dashboard/events?guild=${api.guildId}&id=${id}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function getEvents(api: DBAPI): Promise<Array<Event>> {
    const { data } = await axios.get(`${api.base}/dashboard/events?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function createEvent(api: DBAPI, on: GatewayEvent, name: string, description: string): Promise<Event> {
    const { data } = await axios.post(`${api.base}/dashboard/events?guild=${api.guildId}&on=${on}&name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}