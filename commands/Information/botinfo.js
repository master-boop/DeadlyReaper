const os = require("os")
const ms = require("ms")
const moment = require("moment")
const cpuStat = require("cpu-stat")

module.exports = {
    name: 'botinfo',
    aliases: ['bot'],
    description: "Sends the bot's information",
    usage: ".botinfo",
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        cpuStat.usagePercent(function (error, percent) {

            if (error) return message.reply(error)

            const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const CPU = percent.toFixed(2)
            const CPUModel = os.cpus()[0].model
            const cores = os.cpus().length

            const embed = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setFooter("Bot Info by Zen")
                .setTimestamp()
                .setColor("RED")
                .addFields([

                    { name: "Name", value: `${client.user.tag}`, inline: true },
                    { name: "ID", value: `${client.user.id}`, inline: true },
                    { name: "Created At", value: `${moment.utc(client.user.createdAt).format('LLLL')}`, inline: true },
                    { name: "Added to Server", value: `${moment.utc(client.joinedAt).format('LLLL')}`, inline: true },
                    { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
                    { name: "Members in All Servers", value: `${client.users.cache.size}`, inline: true },
                    { name: "Channels in All Servers", value: `${client.channels.cache.size.toLocaleString()}`, inline: true },
                    { name: "Uptime", value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`, inline: true },
                    { name: "Node Version", value: `${node}`, inline: true },
                    { name: "Memory Usage", value: `${memoryUsage}`, inline: true },
                    { name: "CPU Usage", value: `${CPU}`, inline: true },
                    { name: "CPU Model", value: `${CPUModel}`, inline: true },
                    { name: "Cores", value: `${cores}`, inline: true },

                ])

            message.reply({ embeds: [embed] })

        })

        function formatBytes(a, b) {

            let c = 1024
            d = b || 2
            e = ['B', 'KB', 'MB', 'GB', 'TB']
            f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]

        }

    }
}