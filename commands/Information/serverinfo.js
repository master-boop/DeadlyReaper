const moment = require("moment")

const filterLevels = {
    DISABLED: "Off",
    MEMBER_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone"
}

const verificationLevels = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    VERY_HIGH: "Very High"
}

module.exports = {
    name: 'serverinfo',
    aliases: ['server'],
    description: "Sends the server's information",
    usage: ".serverinfo",
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        const roles = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1)

        let rolesdisplay;

        if (roles.length < 20) {

            rolesdisplay = roles.join(' ')

            if (roles.length < 1) rolesdisplay = "None"

        } else {

            rolesdisplay = `${roles.slice(20).join(" ")} \`and more...\``

        }

        const members = message.guild.members.cache
        const channels = message.guild.channels.cache
        const emojis = message.guild.emojis.cache

        const serverEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`Server Information for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General',
                `**❯ Name:** ${message.guild.name}
      **❯ ID:** ${message.guild.id}
      **❯ Owner:** <@!${message.guild.ownerId}> (${message.guild.ownerId})
      **❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}
      **❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}
      **❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}
      **❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}\n\n`
            )
            .addField('Statistics',
                `**❯ Role Count:** ${roles.length - 1}
      **❯ Emoji Count:** ${emojis.size}
      **❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}
      **❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}
      **❯ Member Count:** ${message.guild.memberCount}
      **❯ Humans:** ${members.filter(member => !member.user.bot).size}
      **❯ Bots:** ${members.filter(member => member.user.bot).size}
      **❯ Text Channels:** ${channels.filter(channel => channel.type === 'GUILD_TEXT').size}
      **❯ Voice Channels:** ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}
      **❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}\n\n`
            )
            .addField(`Roles [${roles.length - 1}]`, rolesdisplay)
            .setTimestamp()
            .setFooter("Server Stats by Zen")

        message.reply({ embeds: [serverEmbed] })

    }
}