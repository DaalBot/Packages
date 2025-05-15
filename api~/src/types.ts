export interface DBAPIOptions {
    auth: {
        type: string;
        token: string;
    };
    guildId: string;
}

export type GatewayEvent = 'messageCreate' | 'messageUpdate' | 'messageDelete' | 'channelCreate' | 'channelUpdate' | 'channelDelete' | 'guildUpdate' | 'guildBanAdd' | 'guildBanRemove' | 'guildMemberAdd' | 'guildMemberRemove' | 'guildMemberUpdate' | 'guildRoleCreate' | 'guildRoleUpdate' | 'guildRoleRemove' | 'messageReactionAdd' | 'messageReactionAdd' | 'interactionCreate';