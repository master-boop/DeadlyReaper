const client = require("../index")
const Discord = require("discord.js")
const canvacord = require("canvacord")
const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
const format = require('string-format')
format.extend(String.prototype, {})

client.on("guildMemberAdd", async (member) => {

    const autoRoleCheck = await quickmongo.fetch(`autorole-${member.guild.id}`)
    const getMemberRole = await quickmongo.fetch(`memberrole-${member.guild.id}`)
    const memberRole = member.guild.roles.cache.get(getMemberRole)

    const welcomeChannelCheck = await quickmongo.fetch(`welcome-${member.guild.id}`)
    const welcomeImageCheck = await quickmongo.fetch(`welimg-${member.guild.id}`)
    const welcomeMessageCheck = await quickmongo.fetch(`welmsg-${member.guild.id}`)

    if (autoRoleCheck) {
        member.roles.add(memberRole).catch(err => console.log(err))
    }

    let background;

    if (welcomeImageCheck) {
        background = await quickmongo.get(`welimg-${member.guild.id}`)
    } else {
        background = "https://cdn.discordapp.com/attachments/850306937051414561/877186344965783614/WallpaperDog-16344.jpg"
    }

    let welmsg;

    if (welcomeMessageCheck) {

        const msg = await quickmongo.get(`welmsg-${member.guild.id}`)

        welmsg = format(msg, member)

    } else {

        welmsg = `Hey ${member.user}, welcome to **${member.guild.name}**. Thanks for joining our server! 😄`

    }

    const welcomer = new canvacord.Welcomer()
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setBackground(background)
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

    if (welcomeChannelCheck) {

        const getWelcomeChannel = await quickmongo.get(`welcome-${member.guild.id}`)
        const welcomeChannel = member.guild.channels.cache.get(getWelcomeChannel)

        welcomer.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, 'welcomer.png')

            welcomeChannel.send({ content: `${welmsg}`, files: [attachment] })
        })

        member.send(`Hey, welcome to **${member.guild.name}**! Thanks for joining!`).catch(err => console.log(err))

    } else return

})