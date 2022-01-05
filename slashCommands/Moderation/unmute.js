const { Client, Interaction, MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const ms = require('ms')
const Schema = require('../../models/mute')
const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)

module.exports = {
    name: "unmute",
    description: "Unmutes a member",
    UserPerms: ['MANAGE_MESSAGES'],
    BotPerms: ['MANAGE_ROLES'],
    cooldown: 5,
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "User To Unmute",
            type: 6,
            required: true,
        },
    ],

    run: async (client, interaction, options) => {

        try {

            const member = interaction.options.getMember("user")

            const role = interaction.guild.roles.cache.find(r => r.name === 'Muted')

            const row = new Discord.MessageActionRow().addComponents(

                new Discord.MessageButton()
                    .setStyle('DANGER')
                    .setCustomId('unmuteyes')
                    .setLabel('Yes'),

                new Discord.MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('unmuteno')
                    .setLabel('No')
            )

            let unmuteAskEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription('**⚠️ - Do you really want to unmute this member?**')

            let unmuteEndEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription("‼️ - You didn't provide a response in time!")

            const unmuteEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - **${member.user.tag}** is now unmuted`)

            const unmuteEmbed2 = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - Cancelled unmute request`)

            const logsChannel = await quickmongo.fetch(`logs-${interaction.guild.id}`)

            const logsEmoji = interaction.client.emojis.cache.get("879086263532130394")

            const umtlogEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setTitle(`${logsEmoji} - MEMBER UNMUTED`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Name:', value: `${member.user.tag}`, inline: true },
                    { name: 'Unmuted by:', value: `${interaction.user.tag}`, inline: true },
                )
                .setFooter('Mod-logs by Zen')
                .setTimestamp()

            const unmutePage = await interaction.followUp({ embeds: [unmuteAskEmbed], components: [row] })

            const col = await unmutePage.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: ms('10s'),
            })

            col.on('collect', async (i) => {

                if (i.user.id !== interaction.user.id) return

                if (i.customId == 'unmuteyes') {

                    const noroleerrEmbed = new Discord.MessageEmbed()
                        .setColor('#3d35cc')
                        .setDescription(`‼️ - Error unmuting the member, please make sure whether there is a role called, 'muted'!`)

                    const marEmbed = new Discord.MessageEmbed()
                        .setColor('#3d35cc')
                        .setDescription(`‼️ - **${member.user.tag}** is not muted!`)

                    if (!role) return unmutePage.edit({ embeds: [noroleerrEmbed], components: [] })

                    if (!member.roles.cache.has(role.id)) return unmutePage.edit({ embeds: [marEmbed], components: [] })

                    const nomutemnEmbed = new Discord.MessageEmbed()
                        .setColor('#3d35cc')
                        .setDescription('‼️ - Member was not muted!')

                    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {

                        if (!data) return unmutePage.edit({ embeds: [nomutemnEmbed], components: [] })

                        const user = data.Users.findIndex((prop) => prop === member.id)

                        if (user < 0) return unmutePage.edit({ embeds: [nomutemnEmbed], components: [] })
                        data.Users.splice(user, 1)
                        data.save()

                        await member.roles.remove(role)

                        unmutePage.edit({ embeds: [unmuteEmbed], components: [] })

                        console.log(`${interaction.user.tag} (${interaction.user.id}) has unmuted ${member.user.tag} (${member.user.id}) in ${interaction.guild.name} (${interaction.guild.id})`)

                        if (logsChannel) {
                            interaction.guild.channels.cache.get(logsChannel).send({ embeds: [umtlogEmbed] })
                        }

                    })

                } else if (i.customId == 'unmuteno') {

                    unmutePage.edit({ embeds: [unmuteEmbed2], components: [] })

                }

            })

            col.on('end', (collected) => {

                if (collected.size === 0) {

                    return unmutePage.edit({ embeds: [unmuteEndEmbed], components: [] })

                }

            })

        } catch (err) {

            const errEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription("‼️ - An error occured while executing the command, please try again later!")

            interaction.followUp({ embeds: [errEmbed] })

            return console.log(err)

        }

    }
};

