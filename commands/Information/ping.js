module.exports = {
    name: 'ping',
    aliases: ['latency', 'lat'],
    description: "Sends the bot's current ping",
    usage: ".ping",
    cooldown: 5,

    execute(client, message, cmd, args, Discord) {

        message.reply("Calculating bot's ping...").then((msg) => {
            
            const ping = msg.createdTimestamp - message.createdTimestamp

            const pingEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("⌚ Pong!")
                .addFields([
                    { name: "Bot Latency 🤖:", value: `${ping}` },
                    { name: "API Latency 🦾:", value: `${client.ws.ping}` }
                ])
                .setTimestamp()

            msg.edit({ content: "✅ - Well, this is the current ping!", embeds: [pingEmbed] })

        })

    }
}