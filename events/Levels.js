const Discord = require("discord.js")
const client = require("../index")
const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
const Levels = require("discord-xp")
Levels.setURL(mongoDBURL)

client.on("messageCreate", async (message) => {

    if (message.author.bot || !message.guild) return

    if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {

        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)

        if (hasLeveledUp) {

            const user = await Levels.fetch(message.author.id, message.guild.id)

            const levelsUpCheck = await quickmongo.fetch(`levelsup-${message.guild.id}`)

            if (levelsUpCheck) {

                const getLevelsUpChannel = await quickmongo.fetch(`levelsup-${message.guild.id}`)
                const levelsUpChannel = message.guild.channels.cache.get(getLevelsUpChannel)

                levelsUpChannel.send({ content: `Congrats ${message.author}, you've now reached **Level ${user.level}**!` })

            }

        }

    }

})