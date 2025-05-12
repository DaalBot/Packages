import { DBAPI } from "@/classes";
import axios from "axios";

interface CurrentGuildResponse {
    channels: {
        id: string;
        type: number;
        last_message_id: string | null;
        flags: number;
        guild_id: string;
        name: string;
        parent_id: string | null;
        rate_limit_per_user: number | null;
        topic: string | null;
        position: number;
        permission_overwrites: {
            id: string;
            type: number;
            allow: string;
            deny: string;
        }[];
        nsfw: boolean;
        icon_emoji: {
            id: string | null;
            name: string | null;
        } | null;
        theme_color: string | null;
    }[]
    members: {
        guildId: string;
        joinedTimestamp: number;
        premiumSinceTimestamp: number | null;
        nickname: string | null;
        pending: boolean;
        communicationDisabledUntilTimestamp: number | null;
        userId: string;
        avatar: string | null;
        banner: string | null;
        flags: number;
        displayName: string;
        roles: string[];
        avatarURL: string | null;
        bannerURL: string | null;
        displayAvatarURL: string | null;
    }[]
    roles: {
        guild: string;
        icon: string | null;
        unicodeEmoji: string | null;
        id: string;
        name: string;
        color: number;
        hoist: boolean;
        rawPosition: number;
        permissions: string;
        managed: boolean;
        mentionable: boolean;
        flags: number;
        tags: unknown;
        createdTimestamp: number;
    }[]
    time: number; // ?Unsure on use
    id: string;
    userData: {
        id: string;
        name: string;
        icon: string;
        banner: string;
        owner: boolean;
        permissions: string;
        features: string[];
    }
}

type Filter = FilterToResponseMap[keyof FilterToResponseMap];
type FilterToResponseMap = {
    'members': 'members';
    'channels': 'channels';
    'roles': 'roles';
    'basic': 'userData';
}

type FilteredResponse = {
    [key in Exclude<Filter, 'basic'>]?: key extends keyof CurrentGuildResponse ? CurrentGuildResponse[key] : never;
} & {
    time: number;
    id: string;
}

export default async function(api: DBAPI): Promise<CurrentGuildResponse>
export default async function(api: DBAPI, filter: Array<'members' | 'channels' | 'roles' | 'basic'>): Promise<FilteredResponse>
export default async function(api: DBAPI, filter?: Array<'members' | 'channels' | 'roles' | 'basic'>): Promise<CurrentGuildResponse | FilteredResponse> {
    const { data } = await axios.get(`${api.base}/dashboard/guild?guild=${api.guildId}${filter ? `&filter=${encodeURIComponent(JSON.stringify(filter))}` : ''}`, {
        headers: {
            Authorization: `${api.auth.type} ${api.auth.token}`,
        }
    })

    return data.data;
}