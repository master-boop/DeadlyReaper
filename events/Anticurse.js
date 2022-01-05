const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
const Schema = require("../models/anticurse")
const Discord = require("discord.js")
const client = require("../index")

client.on("messageCreate", async(message) => {

    if (message.author.bot || !message.guild) return
    if((await quickmongo.fetch(`anticurse-${message.guild.id}`)) === true) {

        let wordData;

        try{

            wordData = await Schema.findOne({ guildId: message.guild.id })

            if (!wordData) {
                wordData = await Schema.create({ guildId: message.guild.id })
            }

        } catch (err) {
            console.log(err)
        }

        if (wordData.BLW.some(word => message.content.toLowerCase().includes(word))) {

            message.delete().catch(err => {

                if (err.code !== 10008) return console.log(err)

            })

            message.channel.send(`${message.author}, the word you used is blacklisted in this server!`)

        }

    }

})