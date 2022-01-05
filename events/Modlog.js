const Discord = require('discord.js')
const client = require('../index')
const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)

const color = 'RED'

// When a member gets a role
client.on("guildMemberRoleAdd", async (member, role) => {

    const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const raddEmbed = new Discord.MessageEmbed()
        .setTitle(`${logsEmoji} - MEMBER UPDATE`)
        .setColor(color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${member.user.tag}** has got the role: \`${role.name}\``)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return member.guild.channels.cache.get(logsChannel).send({ embeds: [raddEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a member looses a role
client.on("guildMemberRoleRemove", async (member, role) => {

    const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const rrmvEmbed = new Discord.MessageEmbed()
        .setTitle(`${logsEmoji} - MEMBER UPDATE`)
        .setColor(color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${member.user.tag}** has lost the role: \`${role.name}\``)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return member.guild.channels.cache.get(logsChannel).send({ embeds: [rrmvEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a member's nickname is updated
client.on("guildMemberNicknameUpdate", async (member, oldNickname, newNickname) => {

    const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const nickchEmbed = new Discord.MessageEmbed()
        .setTitle(`${logsEmoji} - NICKNAME UPDATE`)
        .setColor(color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${member.user.tag}**'s nickname has been changed from: \`${oldNickname}\` to: \`${newNickname}\``)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return member.guild.channels.cache.get(logsChannel).send({ embeds: [nickchEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a channel topic is changed
client.on("guildChannelTopicUpdate", async (channel, oldTopic, newTopic) => {

    const logsChannel = await quickmongo.fetch(`logs-${channel.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const tchEmbed = new Discord.MessageEmbed()
        .setTitle(`${logsEmoji} - TOPIC UPDATED`)
        .setColor(color)
        .setDescription(`${channel}'s topic changed from **${oldTopic}** to **${newTopic}**`)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return channel.guild.channels.cache.get(logsChannel).send({ embeds: [tchEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a member boosts a server
client.on("guildMemberBoost", async (member) => {

    const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const bstEmbed = new MessageEmbed()
        .setTitle(`${logsEmoji} - SERVER BOOSTED`)
        .setColor(color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${member.user.tag}** has started boosting: ${member.guild.name}`)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return role.guild.channels.cache.get(logsChannel).send({ embeds: [bstEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a member removes server boosting
client.on("guildMemberUnboost", async (member) => {

    const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const bstnEmbed = new MessageEmbed()
        .setTitle(`${logsEmoji} - SERVER BOOST STOPPED`)
        .setColor(color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${member.user.tag}** has stopped boosting: ${member.guild.name}`)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return role.guild.channels.cache.get(logsChannel).send({ embeds: [bstnEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a role is created
client.on('roleCreate', async (role) => {

    const logsChannel = await quickmongo.fetch(`logs-${role.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const rcreateEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - ROLE CREATED`)
        .setDescription(`A role has been created named: ${role}, \`${role.name}\``)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return role.guild.channels.cache.get(logsChannel).send({ embeds: [rcreateEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a role is deleted
client.on('roleDelete', async (role) => {

    const logsChannel = await quickmongo.fetch(`logs-${role.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const rdeleteEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - ROLE DELETED`)
        .setDescription(`A role has been deleted named: ${role}, \`${role.name}\``)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return role.guild.channels.cache.get(logsChannel).send({ embeds: [rdeleteEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a channel is created
client.on('channelCreate', async (channel) => {

    const logsChannel = await quickmongo.fetch(`logs-${channel.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const chncrtEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - CHANNEL CREATED`)
        .setDescription(`A channel has been created named: ${channel}, \`${channel.name}\``)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return channel.guild.channels.cache.get(logsChannel).send({ embeds: [chncrtEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a channel is deleted
client.on('channelDelete', async (channel) => {

    const logsChannel = await quickmongo.fetch(`logs-${channel.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const chndelEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - CHANNEL DELETED`)
        .setDescription(`A channel has been deleted named: **${channel.name}**`)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return channel.guild.channels.cache.get(logsChannel).send({ embeds: [chndelEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When an emoji is added
client.on('emojiCreate', async (emoji) => {

    const logsChannel = await quickmongo.fetch(`logs-${emoji.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const emjcrtEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - EMOJI CREATED`)
        .setDescription(`A emoji has been added to the server: ${emoji}, **${emoji.id}**`)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return emoji.guild.channels.cache.get(logsChannel).send({ embeds: [emjcrtEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When an emoji is removed
client.on('emojiDelete', async (emoji) => {

    const logsChannel = await quickmongo.fetch(`logs-${emoji.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const emjdelEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - EMOJI DELETED`)
        .setDescription(`A emoji has been removed from the server: ${emoji}, **${emoji.id}**`)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return emoji.guild.channels.cache.get(logsChannel).send({ embeds: [emjdelEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a user is banned
client.on('guildBanAdd', async (guild, user) => {

    const logsChannel = await quickmongo.fetch(`logs-${guild.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const banaddEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - USER BANNED`)
        .setDescription(`A member has been banned from the server`)
        .setFooter('Mod-logs by Zem')
        .setTimestamp()

    try {
        return guild.guild.channels.cache.get(logsChannel).send({ embeds: [banaddEmbed] })
    } catch (err) {
        console.log(err)
    }

})

// When a user is unbanned
client.on('guildBanRemove', async (guild, user) => {

    const logsChannel = await quickmongo.fetch(`logs-${guild.guild.id}`)
    if (!logsChannel) return

    const logsEmoji = "💡"

    const banrmvEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${logsEmoji} - USER BAN REMOVED`)
        .setDescription(`A member's ban has been removed from the server`)
        .setFooter('Mod-logs by Zen')
        .setTimestamp()

    try {
        return guild.guild.channels.cache.get(logsChannel).send({ embeds: [banrmvEmbed] })
    } catch (err) {
        console.log(err)
    }

})