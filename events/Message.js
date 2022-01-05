require('dotenv').config()
const client = require("../index")
const Discord = require('discord.js')
const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
const cooldowns = new Map()
const db = require("../models/commands")

client.on("messageCreate", async (message) => {

    if (message.author.bot || !message.guild) return

    const prefixes = await quickmongo.fetch(`prefix-${message.guild.id}`)

    if (prefixes == null) {
        prefix = process.env.PREFIX
    } else {
        prefix = prefixes
    }

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase()

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd))

    if (command) {

        if (!cooldowns.has(command.name)) {

            cooldowns.set(command.name, new Discord.Collection())

        }

        const currentTime = Date.now()
        const timeStamps = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown) * 1000

        if (timeStamps.has(message.author.id)) {

            const expTime = timeStamps.get(message.author.id) + cooldownAmount

            if (currentTime < expTime) {

                const timeLeft = (expTime - currentTime) / 1000

                const tmotEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ - Please wait \`${timeLeft.toFixed(1)}\` more seconds before using \`${command.name}\`!`)

                return message.reply({ embeds: [tmotEmbed] })

            }

        }

        timeStamps.set(message.author.id, currentTime)

        setTimeout(() => {
            timeStamps.delete(message.author.id)
        }, cooldownAmount)

        const momsgEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription("❌ - I need atleast `SEND MESSAGES`, `EMBED LINKS` permissions to execute any command in this server!")

        const upEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`❌ - You need \`${command.UserPerms || []}\` permission(s) to execute this command!`)

        const bpEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`❌ - I need \`${command.BotPerms || []}\` permission(s) to execute this command!`)

        if (!message.guild.me.permissions.has(["SEND_MESSAGES", "EMBED_LINKS"])) return message.member.send({ embeds: [momsgEmbed] })

        if (!message.member.permissions.has(command.UserPerms || [])) return message.reply({ embeds: [upEmbed] })

        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.reply({ embeds: [bpEmbed] })

        const check = await db.findOne({ Guild: message.guild.id })

        if (check) {

            if (check.Cmds.includes(command.name)) return message.reply("This command is disabled!")
            command.execute(client, message, cmd, args, Discord)

        } else {

            command.execute(client, message, cmd, args, Discord)

        }

    }

})