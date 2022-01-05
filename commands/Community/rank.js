const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
const Levels = require("discord-xp")
Levels.setURL(mongoDBURL)
const canvacord = require("canvacord")

module.exports = {
    name: 'rank',
    description: "Sends member's rank card",
    usage: ".rank",
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {

            const target = message.author

            const user = await Levels.fetch(target.id, message.guild.id, true)

            if (!user) return message.reply("Seems like the user has not gained enough XP!")

            const neededXp = Levels.xpFor(parseInt(user.level) + 1)

            const rank = new canvacord.Rank()
                .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
                .setCurrentXP(user.xp)
                .setLevel(user.level)
                .setBackground("IMAGE", 'https://images-ext-1.discordapp.net/external/e4T8hd210iU3plXOhP1mATREfuJ0zqbhaRMxwhYcKno/https/i3.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg?width=832&height=468')
                .setRequiredXP(neededXp)
                .setStatus(message.member.presence.status)
                .setProgressBar("BLUE", "COLOR")
                .setUsername(target.username)
                .setOverlay("RED", 0.7, true)
                .setDiscriminator(target.discriminator)

            rank.build().then(data => {

                const attachment = new Discord.MessageAttachment(data, 'rankcard.png')
                message.reply({ files: [attachment] })

            })

        } else message.reply("Leveling System is disabled!")

    }
}