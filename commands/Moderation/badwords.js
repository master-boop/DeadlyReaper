const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
const Schema = require("../../models/anticurse")

module.exports = {
    name: "badwords",
    description: "Adds or removes badwords in server's list",
    aliases: ["bdw", "blw"],
    usage: ".blw add/remove <word>",
    UserPerms: ["MANAGE_GUILD"],
    BotPerms: ["MANAGE_MESSAGES"],
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        if ((await quickmongo.fetch(`anticurse-${message.guild.id}`)) === true) {

            let data;

            try {

                data = await Schema.findOne({ guildId: message.guild.id })

                if (!data) {

                    data = await Schema.create({ guildId: message.guild.id })

                }

            } catch (err) {

                return console.log(err)

            }

            let blwords = data.BLW
            if (!blwords) blwords = "`Empty`"

            const listEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Blacklisted Words")
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`The blacklisted words in the server are: **${blwords}**\n\nUse **blw add** or **blw remove** to add or remove blacklisted words`)
                .setFooter("Anti-Curse by Zen")
                .setTimestamp()

            if (!args[0]) return message.reply({ embeds: [listEmbed] })

            if (args[0] === "add") {

                const word = args.slice(1).join(" ")

                if (!word) return message.reply("Please provide a word to add in blacklist")

                const wordtoAdd = word.toLowerCase()

                if (data.BLW.includes(wordtoAdd)) return message.reply("The word you provided is already blacklisted")

                data.BLW.push(wordtoAdd)

                await data.save()

                message.reply(`Successfully added \`${word}\` into the blacklisted words`)

            }

            if (args[0] === "remove") {

                const word = args.slice(1).join(" ")

                if (!word) return message.reply("Please provide a word to add in blacklist")

                const wordtoRmv = word.toLowerCase()

                if (!data.BLW.includes(wordtoRmv)) return message.reply("The word you provided is not blacklisted")

                let array = data.BLW
                array = array.filter(x => x !== wordtoRmv)

                data.BLW = array

                await data.save()

                message.reply(`Successfully removed \`${word}\` from the blacklisted words`)

            }

        } else {

            return message.reply("Enable `Anticurse System` from **setup** command")

        }

    }
}