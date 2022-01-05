const fetch = require('node-fetch') // npm i node-fetch@2.6.1
const client = require('../index')
const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
require("dotenv").config()

client.on('messageCreate', async (message) => {

    if (message.author.bot || !message.guild) return

    const channell = await quickmongo.fetch(`chatbot-${message.guild.id}`)

    if (message.channel.id === channell) {

        fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=QGSnh8fJiOZyDhY81Ed1KHze5`)
            .then(response => response.json())
            .then(data => {
                message.reply(data.response)
            })
            .catch(() => {
                message.reply("Couldn't fetch response!");
            })

    } else return

})