module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: "Shows the bot's uptime",
    usage: ".uptime",
    cooldown: 5,

    execute(client, message, cmd, args, Discord) {

        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let upEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`✅ - My uptime is \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`)

        message.reply({ embeds: [upEmbed] })

    }
}