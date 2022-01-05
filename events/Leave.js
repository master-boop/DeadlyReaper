const client = require("../index")
const Discord = require("discord.js")
const canvacord = require("canvacord")
const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)

client.on("guildMemberRemove", async (member) => {

    const leaveChannelCheck = await quickmongo.fetch(`leave-${member.guild.id}`)

    const leaver = new canvacord.Leaver()
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setBackground("https://cdn.discordapp.com/banners/536238813119381524/1ff11c559c04e5127dd897b02d67a86e.png?size=2048")
        .setColor("title", "#2f35e0")
        .setColor("title-border", "#ffffff")
        .setColor("avatar", "#2f35e0")
        .setColor("username", "#000000")
        .setColor("username-box", "#c6e2ff")
        .setColor("hashtag", "#faebd7")
        .setColor("discriminator", "#000000")
        .setColor("discriminator-box", "#2f35e0")
        .setColor("message", "#faebd7")
        .setColor("message-box", "#2f35e0")
        .setColor("member-count", "#fefede")
        .setColor("background", "#2f35e0")
        .setColor("border", "#faebd7")

    if (leaveChannelCheck) {

        const getLeaveChannel = await quickmongo.get(`leave-${member.guild.id}`)
        const leaveChannel = member.guild.channels.cache.get(getLeaveChannel)

        leaver.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, 'leave.png')

            leaveChannel.send({ content: `${member.user} just left the server!`, files: [attachment] })
        })

        member.send(`Have a good day!`).catch(err => console.log(err))

    } else return

})