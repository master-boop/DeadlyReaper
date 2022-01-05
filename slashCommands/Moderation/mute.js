const { Client, Interaction, MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const ms = require('ms')
const Schema = require('../../models/mute')
const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)

module.exports = {
    name: "mute",
    description: "Mutes a member",
    UserPerms: ['MANAGE_MESSAGES'],
    BotPerms: ['MANAGE_ROLES'],
    cooldown: 5,
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "Select a user",
            type: 6,
            required: true,
        },
        {
            name: "reason",
            description: "State a reason to mute",
            type: 3,
            required: false,
        },
    ],

    run: async (client, interaction, options) => {

        try {

            const member = interaction.options.getMember("user")
            const reason = interaction.options.getString("reason") || "‼️ No reason provided"

            const role = interaction.guild.roles.cache.find(role => role.name === 'Muted')

            const row = new Discord.MessageActionRow().addComponents(

                new Discord.MessageButton()
                    .setStyle('DANGER')
                    .setCustomId('muteyes')
                    .setLabel('Yes'),

                new Discord.MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('muteno')
                    .setLabel('No')

            )

            let muteAskEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription('**⚠️ - Do you really want to mute this member?**')

            let muteEndEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription("‼️ - You didn't provide a response in time!")

            const muteEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - **${member.user.tag}** is now muted for the reason: **${reason}**`)

            const muteEmbed2 = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`✅ - Cancelled mute request`)

            const dmmuteEmbed = new Discord.MessageEmbed()
                .setTitle('You have been Muted!')
                .setColor('#3d35cc')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Name:', value: `${member.user.tag}`, inline: true },
                    { name: 'Muted by:', value: `${interaction.user.tag}`, inline: true },
                    { name: 'Muted in:', value: `${interaction.guild.name}`, inline: true },
                )
                .addField('Reason:', `${reason}`)
                .setTimestamp()
                .setFooter('Muted by Zen')

            const logsChannel = await quickmongo.fetch(`logs-${interaction.guild.id}`)

            const logsEmoji = interaction.client.emojis.cache.get("879086263532130394")

            const mtlogEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setTitle(`${logsEmoji} - MEMBER MUTED`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Name:', value: `${member.user.tag}`, inline: true },
                    { name: 'Muted by:', value: `${interaction.user.tag}`, inline: true },
                )
                .addField('Reason:', `${reason}`)
                .setFooter('Mod-logs by Zen')
                .setTimestamp()

            const mutePage = await interaction.followUp({ embeds: [muteAskEmbed], components: [row] })

            const col = await mutePage.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: ms('10s'),
            })

            col.on('collect', async (i) => {

                if (i.user.id !== interaction.user.id) return

                if (i.customId === 'muteyes') {

                    const memrerrEmbed = new Discord.MessageEmbed()
                        .setColor('#3d35cc')
                        .setDescription("‼️ - You cannot mute a member of your same level or higher!")

                    const botrerrEmbed = new Discord.MessageEmbed()
                        .setColor('#3d35cc')
                        .setDescription("‼️ - I can't execute this command, please move me higher than the other members in `ROLES`!")

                    if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.followUp({ embeds: [botrerrEmbed] });

                    if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.followUp({ embeds: [memrerrEmbed] })

                    if (!role) {

                        const noroleerrEmbed = new Discord.MessageEmbed()
                            .setColor('#3d35cc')
                            .setDescription('‼️ - Muted role is not found; attempting to create a muted role!')

                        mutePage.edit({ embeds: [noroleerrEmbed], components: [] })

                        let role = await interaction.guild.roles.create({ name: "Muted" }).catch(err => console.log(err))

                        interaction.guild.channels.cache.map((x) => {
                            if (!x.isThread()) {
                                x.permissionOverwrites.edit(
                                    role,
                                    {
                                        MANAGE_WEBHOOKS: false,
                                        SEND_MESSAGES: false,
                                        USE_PUBLIC_THREADS: false,
                                        USE_PRIVATE_THREADS: false,
                                        ADD_REACTIONS: false,
                                        ATTACH_FILES: false,
                                        SEND_TTS_MESSAGES: false,
                                        MANAGE_THREADS: false,
                                        MANAGE_MESSAGES: false,
                                        MENTION_EVERYONE: false,
                                        CONNECT: false,
                                        SPEAK: false,
                                    },
                                    reason,
                                ).catch(err => console.log(err))
                            }
                        })

                        const rcrsucEmbed = new Discord.MessageEmbed()
                            .setColor('#3d35cc')
                            .setDescription('✅ - Muted role has successfully been created')

                        mutePage.edit({ embeds: [rcrsucEmbed], components: [] })

                    }

                    let role2 = interaction.guild.roles.cache.find(r => r.name === 'Muted')

                    const marEmbed = new Discord.MessageEmbed()
                        .setColor('#3d35cc')
                        .setDescription(`‼️ - **${member.user.tag}** is already muted!`)

                    if (member.roles.cache.has(role2)) return mutePage.edit({ embeds: [marEmbed], components: [] })

                    await member.roles.add(role2)

                    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                        if (!data) {
                            new Schema({
                                Guild: interaction.guild.id,
                                Users: member.id
                            }).save()
                        } else {
                            data.Users.push(member.id)
                            data.save()
                        }
                    })

                    mutePage.edit({ embeds: [muteEmbed], components: [] })

                    if (logsChannel) {
                        interaction.guild.channels.cache.get(logsChannel).send({ embeds: [mtlogEmbed] })
                    }

                    console.log(`${interaction.user.tag} (${interaction.user.id}) has muted ${member.user.tag} (${member.user.id}) in ${interaction.guild.name} (${interaction.guild.id})`)

                    member.send({ embeds: [dmmuteEmbed] }).catch((err) => {

                        if (err.code !== 50007) return console.log(err)

                    })

                } else if (i.customId === 'muteno') {

                    mutePage.edit({ embeds: [muteEmbed2], components: [] })

                }

            })

            col.on('end', (collected) => {

                if (collected.size === 0) {

                    return mutePage.edit({ embeds: [muteEndEmbed], components: [] })

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
}


