const format = require("string-format")

module.exports = {
    name: 'test',
    aliases: 'hi',
    description: "Just a test command",

    execute(client, message, cmd, args, Discord) {

        format.extend(String.prototype, {})

        const query = args[0]

        if (!query) return message.reply("Provide!")

        const answer = format('Hello **{}**! Nice to meet you!', message.author)

        message.reply(answer)

    }
}