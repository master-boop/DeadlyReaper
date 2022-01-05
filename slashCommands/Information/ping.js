const Discord = require("discord.js")

module.exports = {
    name: 'ping',
    description: "Sends the bot's current ping",

    run: async (client, interaction, options) => {

        try {

            await interaction.followUp("Calculating bot's ping...").then((msg) => {

                const ping = msg.createdTimestamp - interaction.createdTimestamp

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

        } catch (err) {

            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            interaction.followUp({ embeds: [errEmbed] })

            console.log(err)

        }

    }

}