module.exports = {
    name: "clear",
    description: "Clears the mentioned number of messages (Max. 100)",
    usage: ".clear <number>",
    UserPerms: ["MANAGE_MESSAGES"],
    BotPerms: ["MANAGE_MESSAGES"],
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        if (!args[0]) return message.reply("Enter the number of messages that you want to clear")

        if (isNaN(args[0])) return message.reply("The message deletion number should be an integer")

        if (args[0] > 100) return message.reply("You can't delete more than 100 messages")

        if (args[0] < 1) return message.reply("You can't delete less than 1 message")

        const messages = args[0]

        await message.channel.bulkDelete(messages, true).catch(err => {

            if (err.code !== 10008) return console.log(err)

        })

        // Discord doesn't allow a bot to delete messages older than 14 days, so by writing `true`, it's gonna bypass messages older than 14 days

    }

}