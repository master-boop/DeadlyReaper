const Discord = require("discord.js")
const client = require("../index")
const Schema = require("../models/reaction-roles")

client.on("messageReactionAdd", async (reaction, user) => {

    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return

    Schema.findOne({ Message: reaction.message.id }, async (err, data) => {

        if (!data) return
        if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return

        const [roleid] = data.Roles[reaction.emoji.name]

        reaction.message.guild.members.cache.get(user.id).roles.add(roleid).catch(err => console.log(err))

        const dmRole = reaction.message.guild.roles.cache.get(roleid).name

        user.send(`**${reaction.message.guild.name}:** You've obtained **${dmRole}** role!`).catch(err => {

            if (err.code !== 50007) return console.log(err)

        })

    })

})

client.on("messageReactionRemove", async (reaction, user) => {

    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return

    Schema.findOne({ Message: reaction.message.id }, async (err, data) => {

        if (!data) return
        if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return

        const [roleid] = data.Roles[reaction.emoji.name]

        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid).catch(err => console.log(err))

        const dmRole = reaction.message.guild.roles.cache.get(roleid).name

        user.send(`**${reaction.message.guild.name}:** You've lost **${dmRole}** role!`).catch(err => {

            if (err.code !== 50007) return console.log(err)

        })

    })

})