const { Database } = require("quickmongo")
const mongoDBURL = process.env.MONGODBURL
const quickmongo = new Database(mongoDBURL)
const Levels = require("discord-xp")
Levels.setURL(mongoDBURL)

module.exports = {
    name: 'leaderboard',
    aliases: ["lb"],
    description: "Sends ranking leaderboard",
    usage: ".lb",
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {

            const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10)

            if (rawLeaderboard.length < 1) return message.reply("Nobody's in the leaderboard yet!")

            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)

            const lb = leaderboard.map(e => `\`${e.position}\` | ${e.username}#${e.discriminator} | **${e.level}** Level | **${e.xp.toLocaleString()}** XP`).join("\n")

            const lbEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`Ranking Leaderboard of ${message.guild.name}`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`${lb}`)
                .setTimestamp()
                .setFooter("Ranking Leaderboard by Zen")

            message.reply({ embeds: [lbEmbed] })

        } else message.reply("Leveling System is disabled!")

    }
}