import { DBAPI } from "@/classes.js";
import axios from "axios";

export interface InviteTrackingData {
    enabled: boolean;
    invites: Array<{
        code: string;
        uses: number;
        users: Array<string>;
    }>
}

export async function getInviteTrackingData(api: DBAPI): Promise<InviteTrackingData> {
    const response = await axios.get(`${api.base}/dashboard/invites/tracking?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });

    return response.data.data as InviteTrackingData;
}

export async function toggleInviteTracking(api: DBAPI, enable: boolean): Promise<void> {
    await axios.post(`${api.base}/dashboard/invites/tracking?guild=${api.guildId}&state=${enable}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });
}