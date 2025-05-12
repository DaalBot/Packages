import { DBAPI } from "@/classes";
import axios from "axios";

export async function del(api: DBAPI, path: string) {
    await axios.delete(`${api.base}/dashboard/database?guild=${api.guildId}&path=${path}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}

export async function get(api: DBAPI, path: string): Promise<any> {
    const { data } = await axios.get(`${api.base}/dashboard/database?guild=${api.guildId}&path=${path}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function set(api: DBAPI, path: string, value: string) {
    const { data } = await axios.post(`${api.base}/dashboard/database?guild=${api.guildId}`, {
        path,
        data: value
    }, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}