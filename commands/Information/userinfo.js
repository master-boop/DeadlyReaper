const moment = require("moment")
moment.locale('ENG')

module.exports = {
    name: 'userinfo',
    aliases: ['whois'],
    description: "Sends a user's information",
    usage: ".userinfo",
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        let member

        if (!args[0]) {

            member = message.member

        } else {

            member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(n => n.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

            if (!member) return message.reply("The member is not present in this guild!")

        }

        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1)

        if (roles.length <= 20) {

            displayRoles = roles.join(' ')

            if (roles.length < 1) displayRoles = "None"

        } else {

            displayRoles = roles.slice(20).join(' ')

        }

        const userEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`Information of ${member.user.username}:`, member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setFooter("User Info by Zen")
            .setTimestamp()
            .addFields([
                { name: "Name", value: `${member.user.tag}`, inline: true },
                { name: "ID", value: `${member.user.id}`, inline: true },
                { name: "Account Created", value: `${moment.utc(member.user.createdAt).format('LLLL')}`, inline: true },
                { name: "Joined Server", value: `${moment.utc(member.joinedAt).format('LLLL')}`, inline: true },
                { name: "VC", value: member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : `Not in a VC`, inline: true },
                { name: `Roles ${roles.length}`, value: `${displayRoles}`, inline: true },
            ])

        message.reply({ embeds: [userEmbed] })

    }
}