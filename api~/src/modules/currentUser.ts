import { DBAPI } from "@/classes";
import axios from "axios";

interface CurrentUserResponse {
    user: {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: number;
        flags: number;
        banner: string;
        accent_color: string;
        global_name: string;
        avatar_decoration_data: {
            asset: string;
            sku_id: string;
            expires_at: number | null;
        };
        collectables: unknown; // Genuinely what is api??? It's just somewhere in the response
        banner_color: string;
        clan: {
            identity_guild_id: string;
            identity_enabled: boolean;
            tag: string;
            badge: string;
        },
        primary_guild: { // NOT A SERVER, IDK WHY CLANS ARE CALLED GUILDS IN THE API SOMETIMES
            identity_guild_id: string;
            identity_enabled: boolean;
            tag: string;
            badge: string;
        },
        mfa_enabled: boolean;
        locale: string;
        premium_type: number;
    },
    guilds: {
        id: string;
        name: string;
        icon: string;
        banner: string;
        owner: boolean;
        permissions: string;
        features: string[];
    }[],
    accessToken: string;
    time: number;
}

export default async function(api: DBAPI) {
    const response = await axios.get(`${api.base}/users/current`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return response.data.data as CurrentUserResponse;
}

export async function getMutualGuilds(api: DBAPI): Promise<Array<string>> {
    const { data } = await axios.get(`${api.base}/guilds/mutual`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}