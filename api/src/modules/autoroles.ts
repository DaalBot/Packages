import { DBAPI } from "@/classes";
import axios from "axios";

export async function del(api: DBAPI, roleId: string) {
    await axios.delete(`${api.base}/dashboard/autorole?guild=${api.guildId}&role=${roleId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}

export async function get(api: DBAPI): Promise<Array<string>> {
    const { data } = await axios.get(`${api.base}/dashboard/autorole?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}

export async function create(api: DBAPI, roleId: string) {
    await axios.post(`${api.base}/dashboard/autorole?guild=${api.guildId}&role=${roleId}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}