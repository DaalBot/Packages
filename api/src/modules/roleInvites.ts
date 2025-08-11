import { DBAPI } from "@/classes.js";
import axios from "axios";

export interface RoleInviteData {
    enabled: boolean;
    links: Record<string, Array<string>>;
}

export async function createLink(api: DBAPI, inviteCode: string, roleId: string): Promise<void> {
    await axios.post(`${api.base}/dashboard/invites/roles?guild=${api.guildId}&role=${roleId}&invite=${inviteCode}`, {}, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });
}

export async function deleteLink(api: DBAPI, inviteCode: string, roleId?: string): Promise<void> {
    await axios.delete(`${api.base}/dashboard/invites/roles?guild=${api.guildId}&invite=${inviteCode}${roleId ? `&role=${roleId}` : ""}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });
}

export async function getLinks(api: DBAPI): Promise<RoleInviteData> {
    const { data } = await axios.get(`${api.base}/dashboard/invites/roles?guild=${api.guildId}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    });

    return data.data as RoleInviteData;
}