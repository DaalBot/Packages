import { DBAPI } from "@/classes";
import axios from "axios";

export async function send(api: DBAPI, message: any, channel: string, extra?: {mode?: 'reply' | 'edit', id?: string, webhook?: {name: string, avatar: string}}) {
    const { data } = await axios.post(`${api.base}/dashboard/messages?guild=${api.guildId}&channel=${channel}${extra?.mode ? `&mode=${extra.mode}&id=${extra.id}` : ''}`, {
        data: message,
        webhook: extra?.webhook
    }, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })
}