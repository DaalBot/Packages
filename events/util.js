// All the imports
const { 
    ModalBuilder, 
    TextInputBuilder, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    StringSelectMenuOptionBuilder, 
    StringSelectMenuBuilder, 
    TextInputStyle, 
    ChannelType, 
    ButtonStyle, 
    MessageFlags,
    SeparatorSpacingSize,
    TextDisplayBuilder,
    SeparatorBuilder,
    SectionBuilder,
    ThumbnailBuilder,
    MediaGalleryBuilder,
    ChannelSelectMenuBuilder,
    AttachmentBuilder,
    ContainerBuilder
} = require('discord.js');
const csvman = require('@npiny/csvman');
const crypto = require('crypto');

// Just export the util object
module.exports = {
    variables: {
        /**
         * Get a variable from the database
         * @param {string} variableName
         * @param {boolean} global
         * @returns {Promise<string | null>}
        */
        get: async(variableName, global) => {},

        /**
         * Store or update a variable in the database
         * @param {string} variableName
         * @param {any} value
         * @param {boolean} global
        */
        set: async(variableName, value, global = false) => {}
    },

    libraries: {
        crypto, csvman,
        discord: {
            builder: {
                ModalBuilder,
                TextInputBuilder,
                EmbedBuilder,
                ActionRowBuilder,
                ButtonBuilder,
                StringSelectMenuOptionBuilder,
                StringSelectMenuBuilder,
                TextDisplayBuilder,
                SeparatorBuilder,
                SectionBuilder,
                ThumbnailBuilder,
                MediaGalleryBuilder,
                ChannelSelectMenuBuilder,
                AttachmentBuilder,
                ContainerBuilder
            },
            enum: {
                TextInputStyle,
                ChannelType,
                ButtonStyle,
                MessageFlags,
                SeparatorSpacingSize
            },
            embed: EmbedBuilder,
            components: {
                row: ActionRowBuilder,
                button: ButtonBuilder,
                selectMenu: {
                    string: {
                        option: StringSelectMenuOptionBuilder,
                        builder: StringSelectMenuBuilder
                    }
                }
            }
        },
        daalbot: {
            tb: {
                /**
                 * Create a paste using termbin.com
                 * @param {string} string
                 * @returns {Promise<string>}
                */
                createPaste: async(string) => {},
            }
        },

        /**
         * Loads a module using require
         * (!! THIS REQUIRES APPROVAL @ go.daalbot.xyz/HQ !!)
         * @param {string} module
        */
        load: (module) => {}
    }
}