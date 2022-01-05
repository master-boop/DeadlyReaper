const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)

module.exports = {
    name: "suggest",
    description: "Creates a suggestion",
    usage: '.suggest <Your Suggestion>',
    cooldown: 1,

    async execute(client, message, cmd, args, Discord) {

        const chxs = await quickmongo.fetch(`suggestion-${message.guild.id}`)

        if (!chxs) return message.reply("Suggestion Channels is not set yet!")

        const query = args.join(" ")

        if (!query) return message.reply("State your suggestion please!")

        const image = message.attachments.first() ? message.attachments.first().proxyURL : null

        const sugEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("NEW SUGGESTION")
            .setDescription(`${query}\n\n\`Suggested by ${message.author.tag}\``)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setImage(image)
            .setFooter("Suggestion by Zen")
            .setTimestamp()

        const channel = message.guild.channels.cache.get(chxs)

        const row = new Discord.MessageActionRow().addComponents(

            new Discord.MessageButton()
                .setCustomId("sug-acc")
                .setStyle("SUCCESS")
                .setLabel("ACCEPT"),

            new Discord.MessageButton()
                .setCustomId("sug-dec")
                .setStyle("DANGER")
                .setLabel("DECLINE"),

        )

        message.reply("Your suggestion has been submitted")

        const sugPage = await channel.send({ embeds: [sugEmbed], components: [row] })

        const col = await sugPage.createMessageComponentCollector({
            componentType: "BUTTON"
        })

        col.on("collect", async i => {

            const interactor = i.guild.members.cache.get(i.user.id)

            if (!interactor.permissions.has("MANAGE_GUILD")) return

            if (i.customId === "sug-acc") {

                const accEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("SUGGESTION ACCEPTED")
                    .setDescription(`Your suggestion on **${query}** has been accepted`)
                    .addFields([
                        { name: "Accepted by:", value: `${i.user.tag}`, inline: true },
                        { name: "Accepted in:", value: `${i.guild.name}`, inline: true },
                    ])
                    .setFooter("Suggestion by Zen")
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))

                message.author.send({ embeds: [accEmbed] }).catch(err => {

                    if (err.code !== 50007) return console.log(err)

                })

                col.stop("accepted")

            } else if (i.customId === "sug-dec") {

                const decEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("SUGGESTION DECLINED")
                    .setDescription(`Your suggestion on **${query}** has been declined. Better luck next time`)
                    .addFields([
                        { name: "Declined by:", value: `${i.user.tag}`, inline: true },
                        { name: "Declined in:", value: `${i.guild.name}`, inline: true },
                    ])
                    .setFooter("Suggestion by Zen")
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))

                message.author.send({ embeds: [decEmbed] }).catch(err => {

                    if (err.code !== 50007) return console.log(err)

                })

                col.stop("declined")

            }

        })

        col.on("end", async (collected, reason) => {

            if (reason === "accepted") {

                const accEmbed1 = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("SUGGESTION ACCEPTED")
                    .setDescription(`${query}\n\n\`Suggested by ${message.author.tag}\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setFooter("Suggestion by Zen")
                    .setTimestamp()

                sugPage.edit({ embeds: [accEmbed1], components: [] })

            } else if (reason === "declined") {

                const decEmbed1 = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("SUGGESTION DECLINED")
                    .setDescription(`${query}\n\n\`Suggested by ${message.author.tag}\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setFooter("Suggestion by Zen")
                    .setTimestamp()

                sugPage.edit({ embeds: [decEmbed1], components: [] })

            } 

        })

    }
}