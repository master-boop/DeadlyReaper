const client = require('../index')
const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
require("dotenv").config()

client.on("messageCreate", async (message) => {

    if (message.author.bot || !message.guild) return

    if ((await quickmongo.fetch(`antilink-${message.channel.id}`)) === true) {

        if (message.content.toLowerCase().includes("https://") || message.content.toLowerCase().includes("http://") || message.content.toLowerCase().includes("www.") || message.content.toLowerCase().includes(".com") || message.content.toLowerCase().includes(".gg") || message.content.toLowerCase().includes(".xyz") || message.content.toLowerCase().includes(".in") || message.content.toLowerCase().includes("discord.gg/") || message.content.toLowerCase().includes("discord.com/invite/") || message.content.toLowerCase().includes(".ly") || message.content.toLowerCase().includes("dsc.gg/")) {

            await message.delete().catch(err => {

                if (!err.code !== 10008) return console.log(err)

            })

            message.channel.send(`${message.author}, this channel is link protected. You can't send any links!`)

        } else return

    } else return

})