import type { DBAPI } from "@/classes.js";
import axios from "axios";

export async function get(api: DBAPI, user: string): Promise<string> {
    const { data } = await axios.get(`${api.base}/dashboard/xp/user?guild=${api.guildId}&user=${user}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data as string;
}

export async function set(api: DBAPI, user: string, xp: number) {
    const { data } = await axios.post(`${api.base}/dashboard/xp?guild=${api.guildId}&user=${user}&xp=${xp}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function delReward(api: DBAPI, level: number) {
    await axios.delete(`${api.base}/dashboard/xp/reward?guild=${api.guildId}&level=${level}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}

export async function getRewards(api: DBAPI): Promise<Array<{level: number; reward: string}>> {
    const { data } = await axios.get(`${api.base}/dashboard/xp/rewards?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function addReward(api: DBAPI, level: number, role: string) {
    const { data } = await axios.post(`${api.base}/dashboard/xp/rewards?guild=${api.guildId}`, {
        level: `${level}`,
        value: role
    }, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function getUsersWithXP(api: DBAPI): Promise<Array<{ user: string; xp: number }>> {
    const { data } = await axios.get(`${api.base}/dashboard/xp/user?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}